<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SerialResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'year' => $this->year,
            'poster' => $this->poster,
            'rate' => $this->rate,
            'genres' => $this->genres->pluck('title'),
            'seasons' => SeasonResource::collection($this->seasons),
            'count_season' => $this->seasons()->count(),
            'users' => $this->users->pluck('id'),
        ];
    }
}
