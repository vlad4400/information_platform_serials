<?php

namespace App\Models;

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
        return Serial::query()
            ->orderBy('year')
            ->take(50)
            ->get();
    }

    public static function sortByYearDesc()
    {
        return Serial::query()
            ->orderByDesc('year')
            ->take(50)
            ->get();
    }

    public static function sortByRate()
    {
        return Serial::query()
            ->orderBy('rate')
            ->take(50)
            ->get();
    }

    public static function sortByRateDesc()
    {
        return Serial::query()
            ->orderByDesc('rate')
            ->take(50)
            ->get();
    }

}
