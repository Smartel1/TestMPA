<template>
    <div class="card">

                         <!--заголовок карты-->

        <div class="card-header bg-warning d-flex justify-content-between"
             data-toggle="collapse" href="#collapseTable" aria-controls="collapseExample" aria-expanded="true">
            <h5 class="mb-1">Корзина
                <span class="badge badge-primary">{{totalCount}}</span>
            </h5>
            <h5>={{totalCost}}р</h5>
        </div>

        <div id="collapseTable" class="collapse">

                            <!--тело карты-->

            <div class="card-body">
                <div class="list-group">
                    <div class="list-group-item list-group-item-action d-flex justify-content-between "
                         v-for="(item, index) in items" @click="chosen=index" :class="{active : index===chosen}">
                            <div class="col-3 p-0">
                                {{item.name}}
                            </div>
                            <div class="col-3 p-0 text-center">
                                {{item.unit}}
                            </div>
                            <div class="col-3 p-0 text-center">
                                {{item.count}}
                            </div>
                            <div class="col-3 p-0 text-right">
                                {{item.price*item.count}}
                            </div>
                    </div>
                </div>
            </div>

                            <!--подвал карты-->

            <div class="card-footer d-flex justify-content-between">
                <div>
                    <button class="btn btn-danger" :disabled="chosen===-1"
                            @click="decCurrentItemCount()">
                        Выложить
                    </button>
                    <button class="btn btn-success" :disabled="chosen===-1"
                            @click="incCurrentItemCount()">
                        Добавить
                    </button>
                </div>
                <!--модальное окно хранится в particles.modal.blade.php-->
                <button class="btn btn-warning" data-toggle="modal" data-target="#modal">
                    Заказать!
                </button>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                chosen: -1
            }
        },
        props: ['items'],
        computed: {
            //количество товаров в корзине
            totalCount: function () {
                return this.items.length;
            },
            //стоимость товаров в корзине
            totalCost: function () {
                let result = 0;
                this.items.forEach(function (item) {
                    result+=item.price*item.count;
                });
                return result
            }
        },
        methods: {
            incCurrentItemCount: function () {
                this.$emit('change-item-count', this.items[this.chosen].id, +1);
            },
            decCurrentItemCount: function () {
                let index=this.chosen;
                //если удаляем пункт полностью, то снимаем выделение
                if(this.items[index].count===1){
                    this.chosen=-1;
                }
                this.$emit('change-item-count', this.items[index].id, -1);

            }
        }
    }
</script>
