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
            return Serial::sortByYear($start, $number);
        else
            return Serial::sortByYearDesc($start, $number);
    }

    public function rate($start = 10, $number = 50, $order = false)
    {
        if ($order == true)
            return Serial::sortByRate($start, $number);
        else
            return Serial::sortByRateDesc($start, $number);
    }

}
