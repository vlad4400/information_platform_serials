<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddStatusAndEvalFieldsInFavoritesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('favorites', function (Blueprint $table) {
            $table->enum('status', ['Хочу посмотреть', 'Смотрю', 'Просмотрено'])
            ->default('Хочу посмотреть');
            $table->enum('eval', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
            ->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('favorites', function (Blueprint $table) {
            $table->dropColumn(['status', 'eval']);
        });
    }
}
