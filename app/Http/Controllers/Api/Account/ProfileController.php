<?php

namespace App\Http\Controllers\Api\Account;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProfileResource;
use App\Models\User;

class ProfileController extends Controller
{
    public function __invoke(User $user)
    {
        return new ProfileResource($user);
    }
}
