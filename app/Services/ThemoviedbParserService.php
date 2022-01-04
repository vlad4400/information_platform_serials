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
        $serial = Http::get($this->getUrl())->json();

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
                'tmdb_id' => $serial['id'],
            ]);
            
            foreach ($serial['genre_ids'] as $genre => $id) {
                $new_serial->categories()->attach($id, ['serial_id' => $new_serial['id']]);
            }
        }
    }

    public function start_get_genres()
    {
        $genres = Http::get($this->getUrl())->json();
        foreach ($genres['genres'] as $genre) {
            $new_category = Category::updateOrCreate([
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
