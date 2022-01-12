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

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'favorites', 'serial_id', 'user_id');
    }

}
