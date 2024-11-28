<?php

namespace Database\Seeders;

use App\Models\Avion;
use Illuminate\Database\Seeder;

class AvionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Avion::create(['matricula' => 'ABC123', 'modelo' => 'Boeing 747', 'anio' => 1998]);
        Avion::create(['matricula' => 'DEF456', 'modelo' => 'Airbus A320', 'anio' => 2005]);
    }
}
