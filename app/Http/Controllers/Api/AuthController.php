<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(UserRegisterRequest $request)
    {
        
        $validated = $request->validated();

        $user = User::create($validated);
        $token = $user->createToken($request->email.'_Token')->plainTextToken;

        return response()->json([
            'status' => 200,
            'username' => $user->name,
            'token' => $token,
            'message' => 'Registered successfully'
        ]);
    }

    public function login(UserLoginRequest $request)
    {
        
        $validated = $request->validated();

        $user = User::where('name', $request->name)->first();

        if(!$user)
        {
            return response()->json([
                'status' => 401,
                'message' => 'Invalid name'
            ]);
        }
        elseif(! Hash::check($request->password, $user->password))
        {
            return response()->json([
                'status' => 401,
                'message' => 'Invalid password'
            ]);
        }
        else
        {
            $token = $user->createToken($request->email.'_Token')->plainTextToken;

            return response()->json([
                'status' => 200,
                'username' => $user->name,
                'token' => $token,
                'message' => 'Logged in successfully'
            ]);
        }
   }

   public function logout()
   {
       auth()->user()->tokens()->delete();
       return response()->json([
           'status' => 200,
           'message' => 'Logged out successfully'
       ]);
   }


}
