<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SerialResource;
use App\Models\Serial;

class SerialController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return SerialResource::collection(Serial::all()->sortByDesc('rate'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return SerialResource
     */
    public function show(Serial $serial)
    {
        return new SerialResource($serial);
    }
}
