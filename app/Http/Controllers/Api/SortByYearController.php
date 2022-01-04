<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Http\Resources\SerialResource;
use App\Models\Serial;
use Illuminate\Http\Request;

class SortByYearController extends Controller
{
    public function index($direction)
    {
        if ($direction == true)
        return SerialResource::collection(Serial::all()->sortBy('year', SORT_ASC));
        else
        return SerialResource::collection(Serial::all()->sortByDesc('year', SORT_ASC));
    }
}
