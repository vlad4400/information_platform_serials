<?php

use App\Http\Controllers\Api\SortController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\GenreController;
use App\Http\Controllers\Api\SerialController;
use App\Http\Controllers\Api\Admin\GenreController as AdminGenreController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\Admin\SerialController as AdminSerialController;
use App\Http\Controllers\Api\Admin\UserController as AdminUserController;
use App\Http\Controllers\Api\Admin\ParserController;
use App\Http\Controllers\Api\Account\ProfileController;
use App\Http\Controllers\Api\Account\FavoriteController;
use App\Http\Controllers\Api\AuthController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', [AuthController::class, 'register']);

Route::apiResources(['serials' => SerialController::class]);
Route::apiResources(['genres' => GenreController::class]);
Route::post('serials/{serial}/favorite' , [SerialController::class, 'favorite']);
Route::get('search', [SearchController::class, 'search']);
Route::get('sortBy/year{order?}', [SortController::class, 'Year']);
Route::get('sortBy/rate{order?}', [SortController::class, 'Rate']);

Route::group(['prefix' => 'profile'], function()
{
    Route::get('/{user}', ProfileController::class);
    Route::apiResource('/{user}/favorites', FavoriteController::class);
});


Route::group(['prefix' => 'admin', 'as' => 'admin.'], function()
{
    Route::apiResource('/users', AdminUserController::class);
    Route::apiResources(['/serials' => AdminSerialController::class]);
    Route::apiResources(['/genres' => AdminGenreController::class]);
    Route::get('/parser', ParserController::class);
});

