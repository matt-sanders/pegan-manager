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
            $image = $request->file('image');
            $recipe->image = base64_encode(file_get_contents($image->getRealPath()));
        }
        $recipe->save();
        return response()->json(['recipe' => $recipe]);
    }
}
