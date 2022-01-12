<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\GenreResource;
use App\Http\Resources\SerialResource;
use App\Models\Genre;

class GenreController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */

    public function index()
    {
        return GenreResource::collection(Genre::all());
    }


    public function show($id)
    {
        $genre = Genre::find($id);
        $serials = $genre->serials->all();
        return new SerialResource($serials);
    }

}
