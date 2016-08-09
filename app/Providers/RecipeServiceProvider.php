<?php

namespace App\Providers;

use App\Recipe;
use Illuminate\Support\ServiceProvider;

class RecipeServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //register the conversion hook when saving a recipe
        Recipe::saving(function($recipe){
            $recipe->convertMarkdown();
            $recipe->encodeImage();
        });
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
