<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SeasonResource extends JsonResource
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
            'season_number' => $this->season_number,
            'season_name' => $this->season_name,
            'air_date' => $this->air_date,
            'episode_count' => $this->episode_count
        ];
    }
}
