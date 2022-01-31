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

    public function genre()
    {
        return $this->belongsToMany(Genre::class);
    }

    public function user()
    {
        return $this->belongsToMany(User::class, 'favorites', 'serial_id', 'user_id');
    }

    public function season()
    {
        return $this->hasMany(Season::class);
    }

    public static function sortByYear($start, $number)
    {
        return Serial::all()
            ->sortBy('year')
            ->where('year', '>=', $start)
            ->take($number);
    }

    public static function sortByYearDesc($start, $number)
    {
        return Serial::all()
            ->sortByDesc('year')
            ->where('year', '<=', $start)
            ->take($number);
    }

    public static function sortByRate($start, $number)
    {
        return Serial::all()
            ->sortBy('rate')
            ->where('rate', '>=', $start)
            ->take($number);
    }

    public static function sortByRateDesc($start, $number)
    {
        return Serial::all()
            ->sortByDesc('rate')
            ->where('rate', '<=', $start)
            ->take($number);
    }

}
