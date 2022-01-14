<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Season extends Model
{
    use HasFactory;

    protected $fillable = [
        'serial_id', 'season_number', 'season_name', 'air_date', 'episode_count', 'poster'
    ];

    public function serial()
    {
        return $this->belongsTo(Serial::class);
    }
}
