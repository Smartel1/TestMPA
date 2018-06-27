<template>
    <div>
        <ul class="nav nav-pills flex-column">
           <li v-for="(category, index) in categories">
             <div class="nav-link"
                     :class="{active: index===chosen}"
                     @click="choose(index)">
                        {{ category.name }}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                chosen: -1 //выбранный элемент списка
            }
        },
        props: ['categories'],
        methods: {
            choose: function (index){
                if (index!==this.chosen) {
                    this.chosen=index;
                    this.$emit('change', index);
                }
            }
        }
    }
</script>

<style>
    .nav-link:hover {
        cursor:pointer
    }
</style>