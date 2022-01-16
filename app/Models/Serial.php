<?php

namespace App\Models;

use App\Http\Resources\SerialResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Serial extends Model
{
    use HasFactory;

    protected $fillable = [
        'tmdb_id', 'title', 'description', 'year', 'poster', 'rate'
    ];

    public function genres()
    {
        return $this->belongsToMany(Genre::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'favorites', 'serial_id', 'user_id');
    }

    public static function sortByYear()
    {
        return SerialResource::collection(Serial::all()->sortBy('year', SORT_ASC));
    }

    public static function sortByYearDesc()
    {
        return SerialResource::collection(Serial::all()->sortByDesc('year', SORT_ASC));
    }

    public static function sortByRate()
    {
        return SerialResource::collection(Serial::all()->sortBy('rate', SORT_ASC));
    }

    public static function sortByRateDesc()
    {
        return SerialResource::collection(Serial::all()->sortByDesc('rate', SORT_ASC));
    }

}
