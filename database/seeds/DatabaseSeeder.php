<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        DB::table('users')->insert([
            'name' => 'Matt Sanders',
            'email' => 'matt@twitchdevelopment.com',
            'password' => bcrypt('test')
        ]);
    }
}
