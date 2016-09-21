# Recipe Manager

The Recipe Manager will eventually become the backend manager for a recipe app. Once given a login, the user should be able to create, edit and delete recipes and ingredients.

## Installation

###Laravel

Recipe Manager requires PHP7 and MongoDB to run. Laravel is mainly used as an API. It does serve the frontend initially but the rest is handled by VueJS. Authentication has been set up using JWT. Currently you'll need to manually create a user until I create a migrate file.

Download the repo and run:

```sh
$ php composer.phar install
$ php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\JWTAuthServiceProvider"
$ php artisan jwt:generate
```
Make sure you copy the .env.example file to .env and .env.testing respectively.

#### Unit Testing

Tests can be run with:

```sh
$ phpunit
```

or

```sh
$ ./vendor/bin/phpunit
```

Tests are located in `/tests`

###VueJS

This is still in development. However, once ready you can `npm install` and `npm run dev` to start gulp which will watch for changes on all js and sass files.

####Unit Testing
```sh
npm test
```

Tests are located in `/test`