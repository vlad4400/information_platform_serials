<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Http\Resources\SerialResource;
use App\Jobs\SerialJob;
use App\Models\Serial;
//use Illuminate\Http\Request;


use Carbon\Carbon;
use Illuminate\Support\Facades\Http;

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

    public function recent()
    {
        $recent = Http::acceptJson()->get('https://api.themoviedb.org/3/discover/movie?api_key=' . env('API_KEY') . '&language=ru-RU&region=RU&sort_by=release_date.desc');
        return mb_substr($recent,21, -42);
    }

}
