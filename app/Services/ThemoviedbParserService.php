<?php declare(strict_types=1);

namespace App\Services;

use App\Contracts\Parser;
use App\Models\Category;
use App\Models\Category_serial;
use App\Models\Serial;

class ThemoviedbParserService implements Parser
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
        $serial = json_decode($parse, true);
        foreach ($serial['results'] as $serial) {
            $e = explode("-", $serial['first_air_date']);
            $release_date = $e[0];
            if($release_date === '') {
                $release_date = 0;
            }
            $new_serial = Serial::create([
                'title' => $serial['name'],
                'description' => $serial['overview'],
                'year' => $release_date,
                'poster' => $serial['poster_path'],
                'rate' => $serial['vote_average'],
                'serial_id' => $serial['id']
            ]);
            foreach ($serial['genre_ids'] as $genre) {
                Serial::create([
                    'category_id' => $genre['id']
                ]);
                //$category = Category::where('tmdb_id', $genre)->get();
                //dd($category);
            }
        }
    }

    public function start_get_genres()
    {
        $parse = file_get_contents($this->getUrl());
        $genres = json_decode($parse,true);
        Category::getQuery()->delete();
        foreach ($genres['genres'] as $genre) {
            $new_category = Category::create([
                'title' => $genre['name'],
                'tmdb_id' => $genre['id'],
            ]);
        }
    }
}

//если парсим по id сериалов за раз по ссылке /tv/id
/*
    $serial = json_decode($parse);
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
 */
