<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avion extends Model
{
    /** @use HasFactory<\Database\Factories\AvionFactory> */
    use HasFactory;

    protected $fillable = ['matricula', 'modelo', 'anio'];


}
