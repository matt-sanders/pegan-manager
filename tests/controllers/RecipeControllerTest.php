<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\User;

class RecipeControllerTest extends TestCase
{

    public $recipeData = [
        'title' => 'This is a brand new recipe',
        'desc' => '## Step 2
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
    }
    
    /**
     * Attempt to create a recipe without auth
     */
    public function testCreateRecipeNoAuth()
    {

    }
}
