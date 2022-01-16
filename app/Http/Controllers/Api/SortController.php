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
            return Serial::sortByYear();
        else
            return Serial::sortByYearDesc();
    }

    public function Rate($order = false)
    {
        if ($order == false)
            return Serial::sortByRate();
        else
            return Serial::sortByRateDesc();
    }
}