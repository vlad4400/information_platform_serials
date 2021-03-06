<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('genres')->insert($this->getData());

    }

    private function getData()
    {
        $data = [
            [
                'title' => 'Комедия',
                'tmdb_id' => '1',
            ],
            [
                'title' => 'Трагедия',
                'tmdb_id' => '1',
            ],
            [
                'title' => 'Детектив',
                'tmdb_id' => '1',
            ],
        ];

        return $data;
    }
}
