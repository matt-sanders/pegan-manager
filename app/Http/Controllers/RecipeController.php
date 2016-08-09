<?php

namespace App\Http\Controllers;

use App\Recipe;
use Illuminate\Http\Request;
use App\Http\Requests;

class RecipeController extends Controller
{
    /**
     * Create a recipe
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        
        $recipe = new Recipe;
        foreach ( $recipe->getFillable() as $field ){
            $recipe->{$field} = $request->{$field};
        }

        //encode the image to save in our DB
        if ( $request->hasFile('image') ){
            $recipe->raw_image = $request->file('image');
        }
        $recipe->save();
        return response()->json(['recipe' => $recipe]);
    }

    /**
     * Update a recipe
     *
     * @param string $id 
     * @param Request $request
     * @return Response
     */
    public function update($id, Request $request)
    {
        $recipe = Recipe::find($id);
        foreach ( $recipe->getFillable() as $field ){
            if ( isset( $request->{$field} ) ) $recipe->{$field} = $request->{$field};
        }

        $recipe->save();
        return response()->json(['recipe' => $recipe]);
    }

    /**
     * Delete a recipe
     *
     * @param string $id
     */
    public function remove($id)
    {
        Recipe::destroy($id);
    }
}
