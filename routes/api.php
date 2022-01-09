<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\SerialController;
use App\Http\Controllers\Api\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Api\Admin\SerialController as AdminSerialController;
use App\Http\Controllers\Api\Admin\UserController as AdminUserController;
use App\Http\Controllers\Api\Account\ProfileController;
use App\Http\Controllers\Api\Account\FavoriteController;
use App\Http\Controllers\Admin\ParserController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::apiResources(['serials' => SerialController::class]);
Route::apiResources(['categories' => CategoryController::class]);


Route::apiResource('profile', ProfileController::class);
Route::apiResources(['profile/{id}/favorites' => FavoriteController::class]);


Route::group(['prefix' => 'admin', 'as' => 'admin.'], function()
{
    Route::apiResource('/users', AdminUserController::class);
    Route::apiResources(['/serials' => AdminSerialController::class]);
    Route::apiResources(['/categories' => AdminCategoryController::class]);
    Route::get('/parser', ParserController::class);
});

