<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\User;

class IngredientControllerTest extends TestCase
{

    use DatabaseMigrations;
    
    public $ingredientData = [
        'title' => 'Thyme',
        'desc' => 'This is a really great ingredient'
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
     * Attempts to create an ingredient
     */
    public function createIngredient($ingredient = array())
    {
        if ( count($ingredient) == 0 ) $ingredient = $this->ingredientData;
        $response = $this->post('/api/ingredient', $ingredient, $this->server);
        return $response;
    }
    
    /**
     * Creating an ingredient should be protected
     */
    public function testCreateIngredientNoAuth()
    {
        $this->createIngredient();
        $this->assertResponseStatus(401);
    }

    /**
     * Create an ingredient after being logged in
     */
    public function testCreateIngredientWithAuth()
    {
        $this->logIn();
        $this->createIngredient();
        $this->assertResponseStatus(200);

        $this->seeJson([
            'title' => $this->ingredientData['title'],
            'desc' => $this->ingredientData['desc'],
            'type' => 'ingredient'
        ]);
    }

    /**
     * See if we can retrieve a list of ingredients. No auth is needed and it should retrieve all ingredients
     */
    public function testAllIngredients()
    {
        $this->get('/api/ingredients', $this->server);
        $this->assertResponseStatus(200);

        $this->logIn();
        $this->createIngredient();
        $this->createIngredient([
            'title' => 'This is a title',
            'type' => 'title'
        ]);

        $this->get('/api/ingredients', $this->server);
        $this->seeJson([
            'title' => $this->ingredientData['title'],
            'desc' => $this->ingredientData['desc'],
            'type' => 'ingredient'                
        ]);

        $this->seeJson([
            'title' => 'This is a title',
            'type' => 'title'
        ]);
    }
    
}
