@extends('layouts.mainframe')

@section('content')
    <!--vue-->
    <div id="app_menu" class="container-fluid mb-5">
        <flash      :message="flashMessage"
                    :class="flashType"></flash>

        <basket     :items="basketItems"
                    @change-item-count="(id, count) => basketQuery(id, count)"></basket>
        <div class="row">
            <div class="col-xs-12 col-md-2 bg-light border-right">
                <categories :categories="categories"
                            @change="index => {changeCategory(index)}"></categories>
            </div>
            <div class="col-xs-12 col-md-10 ml-auto">
                <items      :templates="templatesOfChosenCtg"
                            @choose="id => basketQuery(id, +1)"></items>
            </div>
        </div>
     </div>

    @include('particles.modal')

@stop

@section ('scripts')
    <script src="js/axios.js"></script>
    <script src="js/vue.js"></script>

    <script src="js/menu.js"></script>
@stop