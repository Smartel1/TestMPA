<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMenuItemTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menu_item_templates', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 25);
            $table->integer('category', false, true);
            $table->foreign('category')
                ->references('id')
                ->on('menu_categories')
                ->onDelete('cascade');
            $table->string('image', 20);
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
        Schema::dropIfExists('menu_item_templates');
    }
}
