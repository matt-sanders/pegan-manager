<?php

namespace App;

use Moloquent;

class Unit extends Moloquent
{
    protected $fillable = [
        'single', 'plural', 'single_imp', 'plural_imp', 'conversion'
    ];
}