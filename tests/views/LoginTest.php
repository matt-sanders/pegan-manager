<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\User;

class LoginTest extends TestCase
{

    /**
     * You should not be able to see the homepage unless logged in.
     */
    public function testHomeProtected()
    {
        $this->visit('/')
            ->seePageIs('/login');
    }

    /**
     * You should be able to access the homepage logged in
     */
    public function testHomeOpen()
    {
        $user = new User(array( 'name' => 'Admin' ));
        $this->actingAs($user);
        $this->visit('/')
            ->seePageIs('/');
    }

    /**
     * You should not be able to register
     */
    public function testRegisterDisabled()
    {
        $this->visit('/register')
            ->seePageIs('/login');
    }
}
