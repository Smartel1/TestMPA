let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/menu.js', 'public/js')
    .js('resources/assets/js/orders.js', 'public/js')
    .js('resources/assets/js/bootstrap4_jquery.js', 'public/js')
    .js('resources/assets/js/axios.js', 'public/js')
    .js('resources/assets/js/vue.js', 'public/js')
    .js('resources/assets/js/web_sockets.js', 'public/js')
    .sass('resources/assets/sass/app.scss', 'public/css');
