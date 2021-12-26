<?php

namespace App\Http\Controllers\Admin;

use App\Contracts\Parser;
use App\Http\Controllers\Controller;
use App\Jobs\SerialJob;
use App\Models\Serial;
use App\Services\ParserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Config;


class ParserController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string
     */
    public function __invoke(Request $request, Parser $parser)
    {
        for($i=1; $i<21; $i++) {
            $link = "https://api.themoviedb.org/3/tv/" . $i . "?api_key=" . env('API_KEY') . "&language=ru";
            $parser->setUrl($link)->start();
        }
        //return redirect()->back();
    }
}


//если парсим по 20 сериалов за раз по ссылке /tv/popular
//$links[] = "https://api.themoviedb.org/3/tv/popular?api_key=" . env('API_KEY') . "&language=ru&page=" . $i;
