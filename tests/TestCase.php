<?php

use App\User;

class TestCase extends Illuminate\Foundation\Testing\TestCase
{
    /**
     * The base URL to use while testing the application.
     *
     * @var string
     */
    protected $baseUrl = 'http://localhost';

    /**
     * Server string used when making ajax calls
     */
    public $server = ['HTTP_X-Requested-With' => 'XMLHttpRequest'];
    
    /**
     * log in as a user
     */
    public function logIn(){
        $user = new User(['name' => 'Admin']);
        $this->actingAs($user);
        return $user;
    }

    /**
     * Decodes the response and returns the json
     *
     * @param Response $response
     * @return Object
     */
    public function decodeResponse($response)
    {
        return json_decode($response->response->getContent());
    }

    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication()
    {
        $app = require __DIR__.'/../bootstrap/app.php';

        $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

        return $app;
    }
}
