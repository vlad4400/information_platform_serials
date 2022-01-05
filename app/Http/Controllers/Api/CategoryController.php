<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Http\Resources\SerialResource;
use App\Models\Category;

class CategoryController extends Controller
{

    public function index()
    {
        return Category::all();
    }


    public function show($id)
    {
        $category = Category::find($id);
        $serials = $category->serials->all();
        return new SerialResource($serials);
    }

}
