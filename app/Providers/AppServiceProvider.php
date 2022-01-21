<?php

namespace App\Providers;

use App\Contracts\Parser;
use App\Http\Resources\SerialResource;
use App\Services\GenreTMDBParserService;
use App\Services\SeasonsTMDBParserService;
use App\Services\SerialTMDBParserService;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(Parser::class, SerialTMDBParserService::class);
        $this->app->bind(Parser::class, GenreTMDBParserService::class);
        $this->app->bind(Parser::class, SeasonsTMDBParserService::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        If (env('APP_ENV') !== 'local') {
            $this->app['request']->server->set('HTTPS', true);
        }

        Schema::defaultStringLength(191);

        SerialResource::withoutWrapping();
    }
}
