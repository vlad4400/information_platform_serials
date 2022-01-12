<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGenreSerialTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('genre_serial', function (Blueprint $table) {
            $table->id();
            $table->foreignId('genre_id')
                ->references('id')
                ->on('genres')
                ->onDelete('cascade');
            $table->foreignId('serial_id')
                ->references('id')
                ->on('serials')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('genre_serial');
    }
}
