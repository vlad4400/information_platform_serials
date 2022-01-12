<?php

namespace App\Http\Controllers\Api\Admin;


use App\Http\Controllers\Controller;
use App\Jobs\SerialJob;
use App\Services\ThemoviedbParserService;



class ParserController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param ThemoviedbParserService $parser
     * @return string
     */
    public function __invoke(ThemoviedbParserService $parser)
    {
        //set_time_limit(0);
        $link_genres = "https://api.themoviedb.org/3/genre/tv/list?api_key=" . env('API_KEY') . "&language=ru";
        $parser->setUrl($link_genres)->start_get_genres();

        for($i=1; $i<6; $i++) {
            $link = "https://api.themoviedb.org/3/tv/popular?api_key=" . env('API_KEY') . "&language=ru&page=" . $i;
            //$parser->setUrl($link)->start();
            dispatch(new SerialJob($link));
        }
        return response()->json(null,200);
    }
}


//если парсим по id сериалов за раз по ссылке /tv/id
//$link = "https://api.themoviedb.org/3/tv/". $i ."?api_key=" . env('API_KEY') . "&language=ru";
