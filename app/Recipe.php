<?php

namespace App;

use Moloquent;

class Recipe extends Moloquent
{
    /**
     * Get all the ingredients
     */
    public function ingredients()
    {
        return $this->hasMany(Ingredient::class);
    }
}
