<?php

namespace App\Http\Controllers;

use App\Ingredient;
use Illuminate\Http\Request;
use App\Http\Requests;

class IngredientController extends Controller
{
    /**
     * Create a single ingredient
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        $ingredient = new Ingredient;
        $ingredient->title = $request->title;
        $ingredient->desc = $request->desc;
        $ingredient->type = $request->type ?? 'ingredient';
        $ingredient->parent = $request->parent;
        $ingredient->save();

        return response()->json(['ingredient' => $ingredient]);
    }

    /**
     * Get all ingredients
     *
     * @return Response
     */
    public function retrieveAll(Request $request)
    {
        $ingredients = Ingredient::all();
        return response()->json(['ingredients' => $ingredients]);
    }
}
