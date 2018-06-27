<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RenameOrderItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('order_items', function (Blueprint $table) {
            $table->renameColumn('item_id', 'item_id');
            $table->renameColumn('count', 'items_count');
        });
        Schema::rename('order_items', 'item_order');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::rename('item_order', 'order_items');

        Schema::table('order_items', function (Blueprint $table) {
            $table->renameColumn('item_id', 'item_id');
            $table->renameColumn('items_count', 'count');
        });
    }
}
