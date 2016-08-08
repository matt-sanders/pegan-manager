<?php

namespace App;

use Moloquent;
use Parsedown;

class Recipe extends Moloquent
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'directions', 'ingredients', 'prep', 'cook', 'link', 'linkTitle', 'image', 'yield'
    ];

    /**
     * Called before saving, this should convert the markdown directions into html directions
     *
     * @return string
     */
    public function convertMarkdown()
    {
        $Parsedown = new Parsedown();
        $this->pretty_directions = $Parsedown->text($this->directions);
        return $this->pretty_directions;
    }
}
