<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['user_tel', 'user_id', 'user_address', 'user_name', 'user_comment', 'status'];

    protected $hidden = ['user_id', 'updated_at'];

    public function items () {

        return $this->belongsToMany('App\Item')->withPivot('items_count');

    }

    //возвращает коллекцию заказов с элементами
    public static function allWithItemsArray(){

        $orders = Order::withItemsDesc()->get();

        //форматируем массив
        foreach ($orders as $order){
            foreach ($order->items as $item){
                $item->name=$item->template->name;
                $item->count=$item->pivot->items_count;
                unset($item->template);
                unset($item->pivot);
            }
        }

        return $orders->toArray();
    }

    public function scopeWithItemsDesc($query){

        $query->with('items.template')->latest();

    }

    public function scopeDaysAgo($query, $days) {

        $query->whereDay('created_at', '=' ,Carbon::now()->subDays($days)->day);

    }
}
