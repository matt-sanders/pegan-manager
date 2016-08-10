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
    public function createRecipe($recipe = [])
    {
        if ( count( $recipe ) == 0) $recipe = $this->recipeData;
        $response = $this->post('/api/recipe', $recipe, $this->server);
        return $response;
    }

    /**
     * Attempts to update a recipe
     */
    public function updateRecipe($id, $recipe = [])
    {
        $response = $this->put('/api/recipe/'.$id, $recipe, $this->server);
    }
    
    /**
     * Attempt to create a recipe without auth
     */
    public function testCreateRecipeNoAuth()
    {
        $this->createRecipe();
        $this->assertResponseStatus(401);
    }

    /**
     * Create a recipe logged in
     */
    public function testCreateRecipeAuth()
    {
        $this->logIn();
        $this->createRecipe();
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
        $this->logIn();
        $response = $this->createRecipe();

        //get the response
        $recipe = json_decode($response->response->getContent());

        //convert markdown to html
        $testRecipe = new Recipe();
        $testRecipe->directions = $this->recipeData['directions'];
        $output = $testRecipe->convertMarkdown();

        $this->assertEquals($output, $recipe->recipe->pretty_directions);
    }

    /**
     * Should convert an image to base64
     */
    public function testConvertImage()
    {
        $path = __DIR__.'/test.jpg';
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime = finfo_file($finfo, $path);
        $name = 'test.jpg';
        $upload = new \Illuminate\Http\UploadedFile($path, $name, filesize($path), 'image/jpeg', null, true);

        //log in and create our recipe
        $this->logIn();
        $recipe = [
            'image' => $upload
        ];

        $response = $this->call('POST', '/api/recipe', $recipe, [], ['image' => $upload], $this->server);

        

        //get the newly create recipe data
        $newRecipe = json_decode($response->getContent());

        //base64 encode our image
        $image_data = file_get_contents( $path );
        $image_64 = base64_encode($image_data);

        //check it matches
        $this->assertEquals($image_64, $newRecipe->recipe->image);
        
    }

    /**
     * Shouldn't be able to update the recipe without auth
     */
    public function testUpdateRecipeNoAuth()
    {
        $this->updateRecipe('1234');
        $this->assertResponseStatus(401);
    }

    /**
     * Should update a recipe
     */
    public function testUpdateRecipe()
    {
        $this->logIn();
        $response = $this->createRecipe();
        $recipe = json_decode($response->response->getContent())->recipe;

        //update the recipe
        $this->put('/api/recipe/'.$recipe->_id, ['title' => 'New Title']);
        $this->seeJson(['title' => 'New Title', 'prep' => $this->recipeData['prep'] ]);
    }

    /**
     * Get all recipes
     */
    public function testGetRecipes()
    {
        $this->get('/api/recipes', [], $this->server);
        $this->assertResponseStatus(200);
    }
}
