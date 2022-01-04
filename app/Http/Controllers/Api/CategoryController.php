<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Models\Serial;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function index()
    {
        return Category::all();
    }


    public function show($id)
    {
        return Category::query()->where('id', $id)->first();
    }
/*
    public function sortByYear()
    {
        dd(1);
        return Serial::all();
    }

*/

}
