<?php

namespace Database\Seeders;

use Faker\Factory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SerialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('serials')->insert($this->getData());
    }

    private function getData()
    {
        $faker = Factory::create();
        $data = [];
        for($i=0; $i<50; $i++) {
            $data[] = [
                'title' => $faker->text(mt_rand(5,15)),
                'description' => $faker->text(mt_rand(5,40)),
                'year' => $faker->numberBetween(1930,2021),
                'poster' => '/d9s5Ma2BC7y3A8sMpxqbxWj9VQA.jpg',
                'rate' => 8
            ];
        }
        return $data;
    }

}
