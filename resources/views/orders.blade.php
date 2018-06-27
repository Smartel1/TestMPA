@extends('layouts.mainframe')

@section('content')
    <!--vue-->
    <div id="app_orders">
        <div class="container mb-5">
            <div class="row">

                <div class="col-xs-12 col-md-4">
                    <order-list :orders="orders"
                               :chosen_index="chosenIndex"
                               @choose="index=>chooseOrder(index)"></order-list>
                </div>

                <div class="col-xs-12 col-md-8">
                    <order-card :order="orders[chosenIndex]"
                                @status="status => sendOrderStatus(chosenIndex, status)"></order-card>
                </div>

            </div>
        </div>
    </div>

@stop


@section('scripts')
    <script src="js/axios.js"></script>
    <script src="js/vue.js"></script>

    <script src="js/web_sockets.js"></script>
    <script src="js/orders.js"></script>
@stop