<?php

namespace App\Http\Controllers;

use App\Ingredient;
use Illuminate\Http\Request;
use App\Http\Requests;

class IngredientController extends Controller
{
    public function store(Request $request)
    {
        $ingredient = new Ingredient;
        $ingredient->title = $request->title;
        $ingredient->desc = $request->desc;
        $ingredient->type = $request->type ?? 'ingredient';
        $ingredient->save();

        return response()->json(['ingredient' => $ingredient]);
    }
}
