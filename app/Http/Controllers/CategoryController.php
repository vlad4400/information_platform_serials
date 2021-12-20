<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return Categories::all();
    }

    public function show($id)
    {
       return Categories::query()->where('id', $id)->first();
    }
}
