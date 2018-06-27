<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RenameTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::rename('menu_items', 'items');
        Schema::rename('menu_item_templates', 'templates');
        Schema::rename('menu_categories', 'categories');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::rename('items', 'menu_items');
        Schema::rename('templates', 'menu_item_templates');
        Schema::rename('categories', 'menu_categories');
    }
}
