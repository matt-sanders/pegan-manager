<?php

namespace App\Http\Controllers;

use App\Unit;
use Illuminate\Http\Request;
use App\Http\Requests;

class UnitController extends Controller
{
    /**
     * Retrieve all units
     * 
     * @return Response;
     */
    public function retrieveAll()
    {
        $units = Unit::all();
        return response()->json(['units' => $units]);
    }
}