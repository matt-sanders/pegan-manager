<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::controllers([
    'auth' => 'Auth\AuthController',
    'password' => 'Auth\PasswordController'
]);

Route::group(['middleware' => ['auth']], function(){
    
    Route::get('/', function () {
        return view('welcome');
    });
    
    Route::get('/home', 'HomeController@index');

});

Route::group(['prefix' => 'api'], function(){

    Route::get('/ingredients', 'IngredientController@retrieveAll');
    Route::get('/recipes', 'RecipeController@retrieveAll');
    
    Route::group(['middleware' => ['auth']], function(){
        Route::post('/ingredient', 'IngredientController@store');
        Route::post('/recipe', 'RecipeController@store');
        Route::put('/recipe/{id}', 'RecipeController@update');
        //Route::delete('/recipe/{id}', 'RecipeController@remove');
    });
});

Route::auth();

