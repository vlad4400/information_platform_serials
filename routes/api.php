<?php



use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Api\SerialController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\ParserController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResources(['categories' => CategoryController::class]);
Route::apiResources(['serial' => SerialController::class]);
//Route::get('parser', ParserController::class);

Route::group(['prefix' => 'admin', 'as' => 'admin.'], function()
{
    Route::apiResource('/users', AdminUserController::class);
});
