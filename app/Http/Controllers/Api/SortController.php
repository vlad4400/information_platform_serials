<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Http\Resources\SerialResource;
use App\Models\Serial;
use Illuminate\Http\Request;

class SortController extends Controller
{
    public function Year($order = false)
    {
        if ($order == true)
        return SerialResource::collection(Serial::all()->sortBy('year', SORT_ASC));
        else
        return SerialResource::collection(Serial::all()->sortByDesc('year', SORT_ASC));
    }

    public function Rate($order = false)
    {
        if ($order == false)
            return SerialResource::collection(Serial::all()->sortBy('rate', SORT_ASC));
        else
            return SerialResource::collection(Serial::all()->sortByDesc('rate', SORT_ASC));
    }
}
