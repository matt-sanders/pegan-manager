<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\User;

class AuthenticateController extends Controller
{

    public function __construct()
    {

    }
    
    /**
     * Attempts to authenticate the user and if so creates a token for them
     * @param Request $request
     * @return Response
     */
    public function authenticate(Request $request)
    {
        //get only the credentials we need from the request
        $credentials = $request->only('email', 'password');

        try {

            //attempt to make a token, return 401 if not authorised
            if ( !$token = JWTAuth::attempt($credentials)){
                return response()->json(['error' => 'invalid_credentials'], 401);
            }                
            
        } catch ( JWTException $e ){
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        //if successful, return a token
        return response()->json(compact('token'));
    }
    
}
