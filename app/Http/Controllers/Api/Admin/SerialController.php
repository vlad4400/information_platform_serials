<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SerialStoreRequest;
use App\Models\Serial;
use Illuminate\Http\Response;

class SerialController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json([
            'data' => Serial::get()
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param SerialStoreRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(SerialStoreRequest $request)
    {
        $created_serial = Serial::create($request->all());

        return response()->json([
            'data' => $created_serial
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Serial $serial)
    {
        return response()->json([
            'data' => $serial
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param SerialStoreRequest $request
     * @param Serial $serial
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(SerialStoreRequest $request, Serial $serial)
    {
        $serial->update($request->validated());
        return response()->json([
            'data' => $serial
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Serial $serial)
    {
        $serial->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
