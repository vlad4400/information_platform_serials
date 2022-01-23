<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SerialResource;
use App\Models\Serial;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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

    public function favorite(Request $request, Serial $serial)
    {
        //TODO внести корректировки, когда будет готова авторизация
        $user = $request->user();
        if($user)
        {
            $serial->user()->toggle($user->id);
        }
        return response()->json([
            'message' => 'Изменения внесены'
        ]);
    }
}
