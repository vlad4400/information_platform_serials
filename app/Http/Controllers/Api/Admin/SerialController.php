<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SerialStoreRequest;
use App\Http\Resources\SerialResource;
use App\Models\Serial;
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
        return SerialResource::collection(Serial::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param SerialStoreRequest $request
     * @return SerialResource
     */
    public function store(SerialStoreRequest $request)
    {
        $created_serial = Serial::create($request->all());

        return new SerialResource($created_serial);
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

    /**
     * Update the specified resource in storage.
     *
     * @param SerialStoreRequest $request
     * @param Serial $serial
     * @return SerialResource
     */
    public function update(SerialStoreRequest $request, Serial $serial)
    {
        $serial->update($request->validated());
        return new SerialResource($serial);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|Response
     */
    public function destroy(Serial $serial)
    {
        $serial->delete();
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
