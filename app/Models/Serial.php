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

    public function seasons()
    {
        return $this->hasMany(Season::class);
    }

    public static function sortByYear($start, $number)
    {
        return Serial::query()
            ->orderBy('year')
            ->where('year', '>=', $start)
            ->take($number)
            ->get();
    }

    public static function sortByYearDesc($start, $number)
    {
        return Serial::query()
            ->orderByDesc('year')
            ->where('year', '<=', $start)
            ->take($number)
            ->get();
    }

    public static function sortByRate($start, $number)
    {
        return Serial::query()
            ->orderBy('rate')
            ->where('rate', '>=', $start)
            ->take($number)
            ->get();
    }

    public static function sortByRateDesc($start, $number)
    {
        return Serial::query()
            ->orderByDesc('rate')
            ->where('rate', '<=', $start)
            ->take($number)
            ->get();
    }

}
