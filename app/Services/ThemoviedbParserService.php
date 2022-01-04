<?php declare(strict_types=1);

namespace App\Services;

use App\Contracts\Parser;
use App\Models\Category;
use App\Models\Category_serial;
use App\Models\Serial;
use Illuminate\Support\Facades\Http;

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
        $parse = Http::get($this->getUrl());
        $serial = $parse->json();
        foreach ($serial['results'] as $serial) {
            $e = explode("-", $serial['first_air_date']);
            $release_date = $e[0];
            if($release_date === '') {
                $release_date = 0;
            }
            $new_serial = Serial::updateOrCreate([
                'title' => $serial['name'],
                'description' => $serial['overview'],
                'year' => $release_date,
                'poster' => $serial['poster_path'],
                'rate' => $serial['vote_average'],
            ]);
            foreach ($serial['genre_ids'] as $genre) {
                $category = Category::where('tmdb_id', $genre)->get();
                //dd($category);
                Category_serial::updateOrCreate([
                    'category_id' => $category[0]['id'],
                    'serial_id' => $new_serial['id']
                ]);
            }
        }
    }

    public function start_get_genres()
    {
        $parse = Http::get($this->getUrl());
        $genres = $parse->json();
        foreach ($genres['genres'] as $genre) {
                Category::updateOrCreate([
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
