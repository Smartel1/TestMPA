<template>
    <div style="display:none" class="alert mb-0" id="mainAlert" role="alert" @click="slide">
        {{ message }}
    </div>
</template>

<script>
    export default {
        props: ['message'],
        methods: {
            slide: function () {
                $('#mainAlert').slideUp();
            }
        }
    }
</script>