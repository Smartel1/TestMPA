<?php

namespace App\Http\Controllers;

use App\Events\OrderShipped;
use App\Events\OrderAccepted;
use App\Http\Requests\StoreOrder;
use App\Order;

class WebController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    public function order(StoreOrder $request){

        $this->saveOrderToDB($request);

        return view('order');

    }

    public function orders(){

        return view('orders');

    }

    public function index(){

        return view('index');

    }

    public function menu(){

        //передаём в форму данные о пользователе, если аутентифицирован
        $data=['name'=>'', 'tel'=>'', 'address'=>''];
        if (\Auth::check()){
            $data['name']=\Auth::user()->name;
            $data['tel']=\Auth::user()->tel;
            $data['address']=\Auth::user()->address;
        }

        return view('menu', $data);

    }


    //сохраняет заказ в базу
    protected function saveOrderToDB($request)
    {
        //создаем заказ на основе данных из формы
        $order = \App\Order::create([
            'user_tel' => $request->input('tel'),
            'user_name' => $request->input('name'),
            'user_id' => $request->user() ? $request->user()->id : 0,
            'user_address' => $request->input('address'),
            'user_comment' => $request->input('comment')
        ]);

        //если пользователь аутентифицирован, сохраняем его имя, телефон и адрес
        if ($request->user()){
            $request->user()->fill(['name'       =>  $request->input('name'),
                                    'tel'       =>  $request->input('tel'),
                                    'address'   =>  $request->input('address')])
                            ->save();
        }

        //присоединяем товары к заказу
        $items = json_decode($request->input('items'), true);

        foreach ($items as $item) {
            $order->items()->attach($item['id'], ['items_count'=>$item['count']] );
        }

        //уведомляем слушателей канала
        event(new OrderShipped());
    }
}
