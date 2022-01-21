<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSeasonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('seasons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('serial_id')
                ->constrained('serials')
                ->cascadeOnDelete();
            $table->integer('season_number')->nullable();
            $table->string('season_name', 255)->nullable();
            $table->date('air_date')->nullable();
            $table->integer('episode_count')->nullable();
            $table->string('poster', 100)
                ->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('seasons');
    }
}
