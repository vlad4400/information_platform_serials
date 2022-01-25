<?php

namespace App\Http\Controllers\Api\Account;

use App\Http\Controllers\Controller;
use App\Http\Resources\FavoriteResource;
use Illuminate\Http\Request;


class FavoriteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $user = $request->user();
        return FavoriteResource::collection($user->favorite);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = $request->user();
        $user->favorite()->toggle($id);
        return response()->json([
            'message' => 'Изменения внесены'
        ]);
    }

    public function addEval(Request $request, $id, $eval)
    {
        $user = $request->user();
            $user->favorite()->updateExistingPivot($id, ['eval' => $eval]);
            
            return response()->json([
                'message' => 'Ваша оценка добавлена',
            ]);
    }
    
    public function addStatus(Request $request, $id, $status)
    {
        $user = $request->user();
        $user->favorite()->updateExistingPivot($id, ['status' => $status]);

        return response()->json([
            'message' => 'Статус добавлен',
        ]);
    }

}
