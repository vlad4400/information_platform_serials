<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\ParserController;
use App\Http\Controllers\HomeController;



Route::get('/parser', ParserController::class);

Route::get('/{any}', HomeController::class)
    ->where('any', '.*');
