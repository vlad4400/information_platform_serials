<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SerialResource;
use App\Models\Serial;
use Illuminate\Http\Request;

class SortController extends Controller
{
    public function year($start = 2021, $number = 50, $order = false)
    {
        if ($order == true)
            return SerialResource::collection(Serial::all()->sortByYear($start, $number));
           //return Serial::sortByYear($start, $number);
        else
            return SerialResource::collection(Serial::all()->sortByYearDesc($start, $number));
            //return Serial::sortByYearDesc($start, $number);
    }

    public function rate($start = 10, $number = 50, $order = false)
    {
        if ($order == true)
            return SerialResource::collection(Serial::all()->sortByRate($start, $number));
            //return Serial::sortByRate($start, $number);
        else
            return SerialResource::collection(Serial::all()->sortByRateDesc($start, $number));
            //return Serial::sortByRateDesc($start, $number);
    }
}
