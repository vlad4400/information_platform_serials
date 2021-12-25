<?php declare(strict_types=1);

namespace App\Services;

use App\Contracts\Parser;
use App\Models\Serial;

class ParserService implements Parser
{
    protected string $url;

    /**
     * @param string $url
     */
    public function setUrl(string $url): self
    {
        $this->url = $url;
        return $this;
    }

    /**
     * @return string
     */
    public function getUrl(): string
    {
        return $this->url;
    }

    public function start()
    {
        $parse = file_get_contents($this->getUrl());
        $serial = json_decode($parse);
        //dd($serial);
        if($serial->first_air_date) {
            $e = explode("-", $serial->first_air_date);
            $release_date = $e[0];
        } else {
            $release_date = 0;
        }
            $new_serial = Serial::create([
                'title' => $serial->name,
                'description' => $serial->overview,
                'year' => $release_date
            ]);
    }
}

//если парсим по 20 сериалов за раз по ссылке /tv/popular
//$serial = json_decode($parse, true);
//        foreach ($serial['results'] as $serial) {
//            //var_dump($serial);
//            $e = explode("-", $serial['first_air_date']);
//            $release_date = $e[0];
//            if($release_date === '') {
//                $release_date = 0;
//            }
//            $new_serial = Serial::create([
//                'title' => $serial['name'],
//                'description' => $serial['overview'],
//                'year' => $release_date
//            ]);
//        }
