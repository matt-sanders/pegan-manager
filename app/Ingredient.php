<?php

namespace App;

use Moloquent;

class Ingredient extends Moloquent
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'desc', 'type', 'recipeId'
    ];
}
