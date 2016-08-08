<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\User;

class IngredientControllerTest extends TestCase
{
    public $ingredientData = [
        'title' => 'Thyme',
        'desc' => 'This is a really great ingredient'
    ];

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
        $response = $this->post('/api/ingredient', $ingredient, ['HTTP_X-Requested-With' => 'XMLHttpRequest']);
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
    
}
