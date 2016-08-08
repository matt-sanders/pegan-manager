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
        $fields = ['title', 'directions', 'ingredients', 'prep', 'cook', 'link', 'linkTitle', 'image', 'yield'];
        foreach ( $recipe->getFillable() as $field ){
            $recipe->{$field} = $request->{$field};
        }
        $recipe->save();
        return response()->json(['recipe' => $recipe]);
    }
}