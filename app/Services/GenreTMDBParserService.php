<?php declare(strict_types=1);

namespace App\Services;

use App\Contracts\Parser;
use App\Models\Genre;
use Illuminate\Support\Facades\Http;



class GenreTMDBParserService implements Parser
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

    public function start(): void
    {
        $genres = Http::get($this->getUrl())->json();
        foreach ($genres['genres'] as $genre) {
                Genre::updateOrCreate([
                    'title' => $genre['name'],
                    'tmdb_id' => $genre['id'],
            ]);
        }
    }
}
