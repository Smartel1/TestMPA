<template>
    <div>
        <h4 class="mt-4">Список заказов:</h4>
        <div class="card">
            <!--div class="card-header">
                <button class="btn btn-primary"><=</button>
                <button class="btn btn-primary">=></button>
            </div-->
            <div class="card-body p-0">
                <div class="list-group">
                    <button type="button" class="list-group-item list-group-item-action"
                            v-for="(order, index) of orders"
                            v-if="(index>=first_visible)&&(index<total_visible+first_visible)"
                            :class="{'active' : index===chosen_index,
                                    'border-warning' : order.status==0,
                                    'border-info' : order.status==1,
                                    'border-success' : order.status==2,
                                    'border-danger' : order.status==3}"

                            @click="choose(index)">
                        <div class="row">
                            <div class="col-3 pl-1">
                                {{order.created_at.substring(11,16)}}
                            </div>
                            <div class="col-5 p-0 text-center">
                                {{order.user_name}}
                            </div>
                            <div class="col-4  p-0 text-right">
                                {{order.user_tel}}
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                first_visible: 0,
                total_visible: 25,
            }
        },
        props: ['orders', 'chosen_index'],
        computed: {

        },
        methods: {
            choose: function (index) {
                this.$emit('choose', index);
            }
        }
    }
</script>
