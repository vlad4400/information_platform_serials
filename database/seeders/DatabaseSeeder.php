<?php

namespace Database\Seeders;

use App\Models\Serial;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UserSeeder::class,
          //  GenreSeeder::class,
          //  SerialSeeder::class
          //FavoriteSeeder::class
        ]);
    }
}
