<?php

namespace App\Http\Controllers\Api\Account;

use App\Http\Controllers\Controller;
use App\Http\Resources\FavoriteResource;
use App\Models\User;
use Illuminate\Http\Client\Request as ClientRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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

    public function addEval(Request $request, $id, $eval = null)
    {
        $user = $request->user();
        $attributes = [
            'eval' => $eval,
        ];
        $user->favorite()->updateExistingPivot($id, $attributes);
        
        return response()->json([
            'message' => 'Ваша оценка добавлена',
        ]);
    }
    
    public function addStatus(Request $request, $id, $status = 'Хочу посмотреть')
    {
        $user = $request->user();
        $attributes = [
            'status' => $status,
        ];
        $user->favorite()->updateExistingPivot($id, $attributes);

        return response()->json([
            'message' => 'Статус добавлен',
        ]);
    }

}
