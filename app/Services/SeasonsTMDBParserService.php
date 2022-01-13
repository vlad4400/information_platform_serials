<?php declare(strict_types=1);

namespace App\Services;

use App\Contracts\Parser;
use App\Models\Genre;
use App\Models\Serial;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;


class SeasonsTMDBParserService implements Parser
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
        //
    }
}
