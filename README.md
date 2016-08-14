# Recipe Manager

The Recipe Manager will eventually become the backend manager for a recipe app. Once given a login, the user should be able to create, edit and delete recipes and ingredients.

## Installation

Recipe Manager requires PHP7 to run

Download the repo and run:

```sh
$ php composer.phar install
$ php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\JWTAuthServiceProvider"
$ php artisan jwt:generate
```

## Unit Testing

Tests can be run with:

```sh
$ phpunit
```

or

```sh
$ ./vendor/bin/phpunit
```

## To Do
- Give admins ability to create new users (at the moment this is done by inserting a record into the db)
