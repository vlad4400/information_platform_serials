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

    public function show($slug)
    {
       return Categories::query()->where('slug', $slug)->first();
    }
}
