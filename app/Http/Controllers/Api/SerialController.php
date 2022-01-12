<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SerialResource;
use App\Models\Serial;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

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

    public function favorite(Serial $serial)
    {
        //TODO внести корректировки, когда будет готова авторизация
        if(Auth::user())
        {
            $serial->users()->toggle(Auth::user()->id);
        }
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
