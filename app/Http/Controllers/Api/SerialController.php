<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Serial;
use Illuminate\Http\Request;

class SerialController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json(Serial::get(), 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $serial = Serial::find($id);
        if(is_null($serial)) {
            return response()->json([
                'error' => true,
                'message' => 'Serial not found'
            ], 404);
        }
        return response()->json(Serial::find($id), 200);
    }
}
