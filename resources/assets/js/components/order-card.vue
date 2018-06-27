<template>
    <div>
        <h4 class="mt-4">Описание:</h4>
        <div class="card" v-if="order!=null">
            <div class="card-header">
                <button class="btn btn-danger" @click="changeStatus(3)">Отклонить</button>
                <button class="btn btn-primary" @click="changeStatus(2)">Принять</button>
            </div>
            <div class="card-body">
                Заказчик: {{order.user_name}} <br>
                Телефон: {{order.user_tel}} <br>
                Адрес: {{order.user_address}} <br>
                Комментарий: {{order.user_comment}} <br>
                Заказ: <br>
                <div class="list-group">
                    <li v-for="item of order.items" class="list-group-item py-1">
                        <div class="row">
                               <div class="col-6 col-md-3">
                                    {{item.name}}
                                </div>

                                <div class="col-6 col-md-3 text-right">
                                    {{item.unit}}
                                </div>

                                <div class="col-6 col-md-3">
                                    x{{item.count}}
                                </div>

                                <div class="col-6 col-md-3 pr-0 text-right">
                                    {{item.price*item.count}}руб
                                </div>
                        </div>
                    </li>
                    <li class="list-group-item py-1 bg-light">
                        <div class="row">
                            <div class="col-8 col-md-3 offset-md-5 text-right">
                                Итого
                            </div>
                            <div class="col-4 p-0 text-right">
                                {{total_cost}}руб
                            </div>
                        </div>
                    </li>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
    export default {
        data: function () {
            return {
            }
        },
        props: ['order'],
        computed: {
            total_cost: function () {
                let result = 0;
                this.order.items.forEach( item=>{result+=item.count*item.price} );
                return result;
            }
        },
        methods: {
            changeStatus: function (status) {
                this.$emit('status', status);
            }
        }
    }
</script>
