<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Serial extends Model
{
    use HasFactory;

    protected $fillable = [
            'title', 'description', 'year', 'poster', 'rate'
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

}
