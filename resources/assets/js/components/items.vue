<template>
    <div class="card-deck">
        <div v-for="tmpl of templates" class="card bg-secondary text-white m-1 text-center">
            <img class="card-img-top" :src="'images/'+tmpl.image" alt="image">
            <h4 class="card-header bg-dark">
                {{tmpl.name}}
            </h4>
            <div class="card-body text-left">
                <p class="card-text">
                    {{tmpl.description}}
                </p>
            </div>
            <div class="card-footer">
                <button v-for="item of tmpl.items" @click="choose(item.id)"
                   class="btn btn-dark btn-block my-1 d-flex justify-content-between">
                    <span>{{item.unit}}</span>
                    {{item.price}}p
                </button>
            </div>
        </div>

        <div v-if="templates==''" class="jumbotron container-fluid">
            <h1>Выберите категорию меню</h1>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['templates'],
        methods: {
            choose: function (id) {
                this.$emit('choose', id);
            }
        }
    }
</script>

<style>
    .card-deck .card {
        flex-basis: auto;
        flex-grow: 0;
        width: 15rem;
    }
    .card-body {
        padding: 0.5rem;
    }
</style>