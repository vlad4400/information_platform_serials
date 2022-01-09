<?php

namespace App\Http\Controllers\Api\Account;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProfileResource;
use App\Models\User;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('index');
    }

    /**
     * Display the specified resource.
     *
     * @param $id
     * @return ProfileResource
     */
    public function show($id)
    {
        return new ProfileResource(User::findOrFail($id));
    }
}
