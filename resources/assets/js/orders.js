Vue.component('order-list', require('./components/order-list.vue'));
Vue.component('order-card', require('./components/order-card.vue'));

vm = new Vue({
    el: '#app_orders',
    data: {
        orders: [], //массив заказов, загруженных с сервера
        chosenIndex: 0, //индекс выбранного заказа
    },
    computed : {

    },
    methods: {
        chooseOrder: function (index) {
            this.chosenIndex=index;
            if (this.orders[index].status==0){
                this.sendOrderStatus(index, 1);
            }
        },
        loadOrders: function () {
            axios.get('api/orders')
                .then( response => this.orders = response.data)
                .catch( error => {alert('loading_orders_fail'); console.log(error)} );
        },
        subscribe: function () {
            Echo.channel('orders.channel')
                .listen('.order.shipped', (e) => {
                    this.loadOrders();
                    this.chosenIndex++;
                })
                .listen('.order.status.changed', (e) => {
                    this.setLocalOrderStatus(e.id, e.status)
                });
        },
        sendOrderStatus: function (index, status) {
            axios.get('api/orders/'+this.orders[index].id+'/status/'+status);
        },
        setLocalOrderStatus: function(id, status){
            this.orders.forEach(function (order) {
                if(order.id==id){
                    order.status=status;
                }
            })
        }
    },
    mounted: function() {
        this.loadOrders();
        this.subscribe();
    }
});
