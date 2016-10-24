<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Recipe;

class RecipeControllerTest extends TestCase
{

    use DatabaseMigrations;
    
    public $recipeData = [
        'title' => 'This is a brand new recipe',
        'prep' => '20',
        'directions' => '## Step 2
This is the second step',
        'ingredients' => [
            [
                'id' => '12345',
                'qty' => '1',
                'unit' => 'tsp'
            ],
            [
                'id' => '12346',
                'qty' => '1.5',
                'unit' => 'cup'
            ]
        ]
    ];

    /**
     * Attempts to create a recipe
     */
    public function createRecipe($recipe = [], $createUser = false)
    {
        if ( count( $recipe ) == 0) $recipe = $this->recipeData;
        $response = $this->post('/api/recipe', $recipe, $this->headers($createUser));
        return $response;
    }

    /**
     * Attempts to update a recipe
     */
    public function updateRecipe($id, $recipe = [])
    {
        $response = $this->put('/api/recipe/'.$id, $recipe, $this->headers());
    }
    
    /**
     * Attempt to create a recipe without auth
     */
    public function testCreateRecipeNoAuth()
    {
        $this->createRecipe();
        $this->assertResponseStatus(400);
    }

    /**
     * Create a recipe logged in
     */
    public function testCreateRecipeAuth()
    {
        $this->createRecipe([], true);
        $this->assertResponseStatus(200);

        $this->seeJson([
            'title' => $this->recipeData['title']
        ]);
    }

    /**
     * Should convert markdown on create
     */
    public function testConvertMarkdown()
    {
        $response = $this->createRecipe([], true);

        //get the response
        $recipe = $this->decodeResponse($response);

        //convert markdown to html
        $testRecipe = new Recipe();
        $testRecipe->directions = $this->recipeData['directions'];
        $output = $testRecipe->convertMarkdown();

        $this->assertEquals($output, $recipe->recipe->pretty_directions);
    }

    /**
     * Should convert an image to base64
     * --------------DEPRECATED-------------
     * we are now doing this on the client side
     */
    public function testConvertImage()
    {
        /*
        $path = __DIR__.'/test.jpg';
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime = finfo_file($finfo, $path);
        $name = 'test.jpg';
        $upload = new \Illuminate\Http\UploadedFile($path, $name, filesize($path), 'image/jpeg', null, true);

        //log in and create our recipe
        $recipe = [
            'image' => $upload
        ];

        $response = $this->call('POST', '/api/recipe', $recipe, [], ['image' => $upload], $this->headers(true));

        

        //get the newly create recipe data
        $newRecipe = json_decode($response->getContent());

        //base64 encode our image
        $image_data = file_get_contents( $path );
        $image_64 = base64_encode($image_data);

        //check it matches
        $this->assertEquals($image_64, $newRecipe->recipe->image);
        */
        
    }

    /**
     * Shouldn't be able to update the recipe without auth
     */
    public function testUpdateRecipeNoAuth()
    {
        $this->updateRecipe('1234');
        $this->assertResponseStatus(400);
    }

    /**
     * Should update a recipe
     */
    public function testUpdateRecipe()
    {
        $response = $this->createRecipe([], true);
        $recipe = $this->decodeResponse($response)->recipe;

        //update the recipe
        $this->put('/api/recipe/'.$recipe->_id, ['title' => 'New Title'], $this->headers(true));
        $this->seeJson(['title' => 'New Title', 'prep' => $this->recipeData['prep'] ]);
    }

    /**
     * Get all recipes
     */
    public function testGetRecipes()
    {
        $this->createRecipe([], true);
        
        $this->get('/api/recipes', [], $this->headers());
        $response = $this->assertResponseStatus(200);
        $recipes = $this->decodeResponse($response)->recipes;

        //check we've actually got something
        $this->assertEquals(1, count($recipes));

        //check that it matches
        $this->assertEquals($this->recipeData['title'], $recipes[0]->title);
    }

    /**
     * Get single recipe
     */
    public function testGetRecipe()
    {
        $response = $this->createRecipe([], true);
        
        //get the recipe
        $recipe = $this->decodeResponse($response)->recipe;

        //try and get the recipe
        $response = $this->get('/api/recipe/'.$recipe->_id, [], $this->headers(true));        
        $this->assertResponseStatus(200);
        $newRecipe = $this->decodeResponse($response)->recipe;

        $this->assertEquals($newRecipe->_id, $recipe->_id);
    }

    /**
     * Should not be able to delete a recipe without being logged in
     */
    public function testDeleteNoAuth()
    {
        $this->delete('/api/recipe/1234', [], $this->headers());
        $this->assertResponseStatus(400);
    }

    /**
     * Should actually delete a recipe
     */
    public function testDeleteRecipe()
    {
        $response = $this->createRecipe([], true);
        $recipe = $this->decodeResponse($response)->recipe;

        $this->delete('/api/recipe/'.$recipe->_id, [], $this->headers(true));
        $this->assertResponseStatus(200);

        $this->get('/api/recipe'.$recipe->_id, [], $this->headers());
        $this->assertResponseStatus(404);
    }

    /**
     * Should get the last updated date of a recipe
     */
    public function testLastUpdatedRecipe(){
        $this->createRecipe([], true);
        $this->createRecipe([], true);
        
        $this->get('/api/recipes', [], $this->headers());
        $response = $this->assertResponseStatus(200);
        $recipes = $this->decodeResponse($response)->recipes;

        $this->get('/api/last-updated', [], $this->headers());
        $response = $this->decodeResponse($response);

        //last timestamp
        $ts = strtotime($recipes[1]->updated_at);
        $this->assertEquals($ts, $response->lastUpdated);
    }
}
