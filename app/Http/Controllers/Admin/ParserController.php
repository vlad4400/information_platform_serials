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
        for($i=1; $i<6; $i++) {
            $link = "https://api.themoviedb.org/3/tv/popular?api_key=" . env('API_KEY') . "&language=ru&page=" . $i;
            $parser->setUrl($link)->start();
        }
        $link_genres = "https://api.themoviedb.org/3/genre/tv/list?api_key=" . env('API_KEY') . "&language=ru";
        $parser->setUrl($link_genres)->start_get_genres();
    }
}


//если парсим по id сериалов за раз по ссылке /tv/id
//$link = "https://api.themoviedb.org/3/tv/". $i ."?api_key=" . env('API_KEY') . "&language=ru";
