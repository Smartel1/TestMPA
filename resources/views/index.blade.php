@extends('layouts.mainframe')

@section('content')
    <div class="mb-5 px-3">
    <!-- Hot section -->
        <div class="row text-center align-items-center hot text-white bg-secondary py-4">
            <div class="col-xs-12 col-md-4 px-4">
                <h1>Sale!</h1>
                праздничные скидки на все роллы!
            </div>
            <div class="col-xs-12 col-md-4 px-4">
                <h1>5yrs</h1>
                на рынке еды начиная с 2013 года!
            </div>
            <div class="col-xs-12 col-md-4 px-4">
                <h1>New</h1>
                обновление меню с марта
            </div>
        </div>

        <!-- Advantages -->
        <div class="text-secondary text-center">
            <div class="row py-4 advantages">
                <div class="col-xs-12 col-md-4">
                    <img src="images/natural.png" alt="" class="img-fluid">
                </div>
                <div class="col-xs-12 col-md-8 my-auto">
                    Мы используем только натуральные продукты для приготовления наших товаров
                </div>
            </div>
            <hr>

            <div class="row py-4 advantages">
                <div class="col-xs-12 col-md-4 order-md-2">
                    <img src="images/fast.png" alt="" class="img-fluid">
                </div>
                <div class="col-xs-12 col-md-8 my-auto">
                    Срок доставки заказов - 60 минут. При опоздании курьер отдает Вам заказ бесплатно!
                </div>
            </div>
            <hr>

            <div class="row py-4 advantages">
                <div class="col-xs-12 col-md-4">
                    <img src="images/cheap.png" alt="" class="img-fluid">
                </div>
                <div class="col-xs-12 col-md-8 my-auto">
                    Наши цены вас приятно удивят!
                </div>
            </div>
        </div>
    </div>

@stop

