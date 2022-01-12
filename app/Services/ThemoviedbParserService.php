<?php declare(strict_types=1);

namespace App\Services;

use App\Contracts\Parser;
use App\Models\Category;
use App\Models\Serial;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;


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
            $release_date = $e ? $e[0] : 0;

            if ($serial['poster_path'] ) {
                $url = 'https://image.tmdb.org/t/p/w342' . $serial['poster_path'];
                $result = Cloudinary::upload($url, [
                    'folder' => 'posters/',
                    'use_filename' => true,
                    'unique_filename' => false
                ]);
                $poster = $result->getSecurePath();
            }

            $new_serial = Serial::updateOrCreate([
                'title' => $serial['name'],
                'description' => $serial['overview'],
                'year' => $release_date,
                'poster' => $poster,
                'rate' => $serial['vote_average'],
                'tmdb_id' => $serial['id'],
            ]);

            foreach ($serial['genre_ids'] as $genre => $id) {
                $category = Category::where('tmdb_id', $id)->get('id');
                $new_serial->categories()->syncWithoutDetaching($category, ['serial_id' => $new_serial['id']]);
            }
        }
    }

    public function start_get_genres()
    {
        $genres = Http::get($this->getUrl())->json();
        foreach ($genres['genres'] as $genre) {
                Category::updateOrCreate([
                    'title' => $genre['name'],
                    'tmdb_id' => $genre['id'],
            ]);
        }
    }
}
