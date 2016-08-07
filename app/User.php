<?php

namespace App;

use Moloquent;
use Illuminate\Auth\Authenticatable as Authenticatable;
//use Illuminate\Auth\Authenticatable as Authenticatable;

class User extends Moloquent implements \Illuminate\Contracts\Auth\Authenticatable
{
    use Authenticatable;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
}
