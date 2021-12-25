<?php

namespace App\Jobs;

use App\Contracts\Parser;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\Job as JobContract;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SerialJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public string $link;

    public function __construct(string $link)
    {
         $this->link = $link;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(Parser $parser)
    {
        $parser->setUrl($this->link)->start();
    }
}
