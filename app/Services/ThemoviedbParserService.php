<?php declare(strict_types=1);

namespace App\Services;

use App\Contracts\Parser;
use App\Models\Category;
use App\Models\Serial;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

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

        $dir = "public/posters/";
        !is_dir($dir) ? mkdir($dir, 0777, true) : chmod($dir, 0777);

        foreach ($serial['results'] as $serial) {
            $e = explode("-", $serial['first_air_date']);
            $release_date = $e ? $e[0] : 0;

            $poster_name = $serial['poster_path'] ? substr($serial['poster_path'], 1) : 0;
            if ($poster_name) {
                $poster = file_get_contents('https://image.tmdb.org/t/p/w342/' . $poster_name);
                $save = file_put_contents($dir . $poster_name, $poster);
                //сохранение на S3
                //Storage::disk('s3')->put($poster_name, $poster);
            }

            $new_serial = Serial::updateOrCreate([
                'title' => $serial['name'],
                'description' => $serial['overview'],
                'year' => $release_date,
                'poster' => $poster_name,
                'rate' => $serial['vote_average'],
                'tmdb_id' => $serial['id'],
            ]);

            foreach ($serial['genre_ids'] as $genre => $id) {
                $category = Category::where('tmdb_id', $id)->get('id');
                $new_serial->categories()->attach($category, ['serial_id' => $new_serial['id']]);
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
