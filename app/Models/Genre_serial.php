<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Genre_serial extends Model
{
    use HasFactory;

    protected $table = 'genre_serial';

    protected $fillable = ['genre_id', 'serial_id'];

    public $timestamps = false;
}
