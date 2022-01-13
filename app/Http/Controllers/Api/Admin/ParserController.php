<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Jobs\SerialJob;
use App\Services\GenreTMDBParserService;
use App\Services\SeasonsTMDBParserService;


class ParserController extends Controller
{

    public function genreParser(GenreTMDBParserService $parser)
    {
        $link = "https://api.themoviedb.org/3/genre/tv/list?api_key=" . env('API_KEY') . "&language=ru";
        $parser->setUrl($link)->start();
        return response()->json(null,200);
    }


    public function serialParser()
    {
       for($i=1; $i<6; $i++) {
            $link = "https://api.themoviedb.org/3/tv/popular?api_key=" . env('API_KEY') . "&language=ru&page=" . $i;
            dispatch(new SerialJob($link));
       }
        return response()->json(null,200);
    }


    public function seasonsParser(SeasonsTMDBParserService $parser)
    {
        //$link = "https://api.themoviedb.org/3/tv/". $i ."?api_key=" . env('API_KEY') . "&language=ru";
    }
}

