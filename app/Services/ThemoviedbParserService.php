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

            $poster_name = substr($serial['poster_path'], 1);
            $poster = 'https://image.tmdb.org/t/p/w500/' . $poster_name;
            $ch = curl_init($poster);
            $fp = fopen("storage/app/public/posters/" . $poster_name, 'wb');
            curl_setopt($ch, CURLOPT_FILE, $fp);
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_setopt($ch,CURLOPT_TIMEOUT,200);
            curl_exec($ch);
            curl_close($ch);
            fclose($fp);

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
                //dd($category);
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
