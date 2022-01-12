<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category_serial extends Model
{
    use HasFactory;

    protected $table = 'category_serial';

    protected $fillable = ['category_id', 'serial_id'];

    public $timestamps = false;
}
