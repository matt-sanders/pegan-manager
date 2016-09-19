var elixir = require('laravel-elixir')

elixir(function (mix) {
    mix.sass('app.scss')

    // mix.scripts([], 'public/js/vendor.js')

    mix.browserify('app.js')

    mix.version(['js/app.js', 'css/app.css'])
});

