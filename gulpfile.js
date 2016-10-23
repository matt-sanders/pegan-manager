var elixir = require('laravel-elixir')


/*elixir.config.js.browserify = {
    transformers: [{ name: 'envify' }]
};*/

elixir(function (mix) {
    mix.sass('app.scss')

    mix.browserify('app.js', null, null, {
        transform: ['envify']
    })


    mix.version(['js/app.js', 'css/app.css'])
});

