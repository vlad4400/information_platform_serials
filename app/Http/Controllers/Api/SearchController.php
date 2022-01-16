<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SearchRequest;
use App\Http\Resources\SerialResource;
use App\Models\Serial;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(SearchRequest $request, Serial $serial)
    {
        $input = $request->validated()['query'];
        $data = Serial::where('title', 'LIKE', "%{$input}%")->get()->sortByDesc('rate');
        return SerialResource::collection($data);
    }
}