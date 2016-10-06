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
        'title', 'directions', 'ingredients', 'prep', 'cook', 'link', 'linkTitle', 'image', 'yield', 'desc', 'tags'
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

    /**
     * Encode any images before saving
     * @return string
     */
    public function encodeImage()
    {
        if ( $this->raw_image )
        {
            $this->image = base64_encode(file_get_contents($this->raw_image->getRealPath()));
            unset($this->raw_image);
        }

        return $this->image;
    }
}
