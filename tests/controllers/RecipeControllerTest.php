<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\User;
use App\Recipe;

class RecipeControllerTest extends TestCase
{

    use DatabaseMigrations;
    
    public $recipeData = [
        'title' => 'This is a brand new recipe',
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

    public $server = ['HTTP_X-Requested-With' => 'XMLHttpRequest'];
    
    /**
     * log in as a user
     */
    public function logIn(){
        $user = new User(['name' => 'Admin']);
        $this->actingAs($user);
        return $user;
    }

    /**
     * Attempts to create a recipe
     */
    public function createRecipe($recipe = array())
    {
        if ( count( $recipe ) == 0) $recipe = $this->recipeData;
        $response = $this->post('/api/recipe', $recipe, $this->server);
        return $response;
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
     * Should convert markdown on create and update
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
}
