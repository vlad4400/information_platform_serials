<?php

namespace Database\Seeders;

use Faker\Factory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FavoriteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('favorites')->insert($this->getData());
    }

    public function getData()
    {
        $faker = Factory::create();

        for ($i=0; $i<50; $i++) {
            $data[] = [
                'user_id' => $faker->numberBetween(1,47),
                'serial_id' => $faker->numberBetween(1,50)
            ];
        }
        return $data;
    }
}
