<?php declare(strict_types=1);

namespace App\Services;

use App\Contracts\Parser;
use App\Models\Genre;
use App\Models\Season;
use App\Models\Serial;
use Illuminate\Support\Facades\Http;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;


class SerialTMDBParserService implements Parser
{
    protected string $url;

    public function setUrl(string $url): self
    {
        $this->url = $url;
        return $this;
    }

    public function getUrl(): string
    {
        return $this->url;
    }

    public function start(): void
    {
        $serial = Http::get($this->getUrl())->json();

        foreach ($serial['results'] as $serial) {
            $poster = $this->postersParser($serial);
            $new_serial = $this->serialCreate($serial, $poster);
            $this->relationsCreate($serial, $new_serial);
            $this->seasonsParser($new_serial);
        }
    }

    public function postersParser($serial)
    {
        //$poster=1234
        if ($serial['poster_path'] ) {
            $url = 'https://image.tmdb.org/t/p/w342' . $serial['poster_path'];
            $result = Cloudinary::upload($url, [
                'folder' => 'posters/',
                'use_filename' => true,
                'unique_filename' => false
            ]);
            $poster = $result->getSecurePath();
        }
        return $poster;
    }


    public function serialCreate($serial, $poster)
    {
        $e = explode("-", $serial['first_air_date']);
        $release_date = $e ? $e[0] : 0;

        $new_serial = Serial::updateOrCreate([
            'title' => $serial['name'],
            'description' => $serial['overview'],
            'year' => $release_date,
            'poster' => $poster,
            'rate' => $serial['vote_average'],
            'tmdb_id' => $serial['id'],
        ]);
        return $new_serial;
    }

    public function seasonsParser($new_serial)
    {
        $data = $new_serial['tmdb_id'];
        $link = "https://api.themoviedb.org/3/tv/". $data ."?api_key=" . env('API_KEY') . "&language=ru";
        $seasons = Http::get($link)->json();
        foreach ($seasons['seasons'] as $season) {
            $new_season = Season::updateOrCreate([
                'serial_id' => $new_serial['id'],
                'season_number' => $season['season_number'],
                'season_name' => $season['name'],
                'air_date' => $season['air_date'],
                'episode_count' => $season['episode_count'],
                'poster' => $season['poster_path'],
            ]);
        }
    }

    public function relationsCreate($serial, $new_serial)
    {
            foreach ($serial['genre_ids'] as $genre => $id) {
                $genre = Genre::where('tmdb_id', $id)->get('id');
                $new_serial->genres()->syncWithoutDetaching($genre, ['serial_id' => $new_serial['id']]);
            }
    }
}
