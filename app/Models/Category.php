<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'tmdb_id'];

    public function serials() {
        return $this->belongsToMany(Serial::class);
    }
}
