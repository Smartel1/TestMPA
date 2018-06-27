<?php

namespace App\Http\Controllers;

use App\Events\OrderStatusChanged;
use Illuminate\Routing\Controller as BaseController;
use \App\Category;
use \App\Order;

class ApiController extends BaseController
{
    /**Return menu as similar JSON-object
     *
     * @return mixed
     */
    public function menu(){

        $menu = Category::with('templates.items')->get();

        return $menu;

    }

    public function orders(){

        //TODO защитить посредником
         return Order::allWithItemsArray();

    }

    public function setOrderStatus($id, $status){

        Order::findOrFail($id)->update(['status'=>$status]);
        event(new OrderStatusChanged( $id, $status ));
        return 'success';

    }

}
