Vue.component('categories', require('./components/categories.vue'));
Vue.component('items', require('./components/items.vue'));
Vue.component('basket', require('./components/basket.vue'));
Vue.component('flash', require('./components/flash.vue'));

vm = new Vue({
    el: '#app_menu',
    data: {
        menu: [], //массив, хранящий все элементы меню
        basketItems: [], //элементы в корзине
        templatesOfChosenCtg: [], //массив шаблонов, расчитывается методом changCategory
        flashMessage: 'сообщение', //сообщение элемента alert...
        flashType: 'alert-success' //... и его класс
    },

    computed : {
        //категории меню массивом для передачи компоненту categories
        //зависит от переменной menu
        categories: function () {
            let result = [];
            this.menu.forEach(function (item) {
                result.push({
                    id: item.id,
                    name: item.name
                })
            });
            return result;
        }
    },
    methods: {
        //заполняет скрытый элемент формы, хранящий товары в корзине
        fillFormHidden: function () {
            $('#orderForm')[0].elements['items'].value=
                JSON.stringify(this.optimisedBasketItems());
        },

        //создаёт массив, содержащий заказанные товары. {id, count} на основе basketItems
        optimisedBasketItems: function () {
            let result = [];
            this.basketItems.forEach((item)=>{
                result.push(Object.assign({}, {id:item['id'], count: item['count']} ));
            });
            return result;
        },

        setFlash: function (message, type='success') {
            this.flashMessage = message;
            this.flashType = 'alert-'+type;
            $('#mainAlert').hide().slideDown();
        },

        changeCategory: function (index) {
            this.templatesOfChosenCtg = this.menu[index].templates;
        },

        basketQuery: function(id, count) {
            //найден ли элемент в корзине
            let found = false;

            this.basketItems.forEach((item, n) => {
                if (item.id===id){
                    item.count+=count;
                    found=true;
                    if (item.count<=0){
                        this.basketItems.splice(n, 1);
                    }
                }
            });

            if (!found){
                this.basketItems.push(
                    Object.assign({id: id, count: 1},this.getMenuItemInfoById(id))
                );
            }

        },

        //находит элемент меню по id и возвращает информацию о нём
        getMenuItemInfoById(id){
            let result = null;
            this.menu.forEach(categ => {
                categ.templates.forEach(templ => {
                    templ.items.forEach(item => {
                        if (item.id===id){
                            result = {
                                name: templ.name,
                                unit: item.unit,
                                price: item.price
                            }
                        }
                    })
                })
            });
            return result;
        }
    },
    mounted: function() {
        $('#btnSendOrder').click(function () {
            vm.fillFormHidden()
        });

        axios.get('api/menu')
            .then( response => this.menu = response.data)
            .catch( error => {alert('loading_menu_fail'); console.log(error)} );
    }


});
