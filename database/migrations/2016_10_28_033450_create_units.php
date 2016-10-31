<?php

use App\Unit;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUnits extends Migration
{
    protected $connection = 'mongodb';
    
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        $units = [
            [
                'single' => 'cup',
                'plural' => 'cups'
            ],
            [
                'single' => 'tsp'
            ],
            [
                'single' => 'Tbsp'
            ],
            [
                'single' => 'kg',
                'single_imp' => 'lb',
                'conversion' => 2.20462
            ],
            [
                'single' => 'g',
                'single_imp' => 'oz',
                'conversion' => 0.035274
            ],
            [
                'single' => 'can',
                'plural' => 'cans'
            ],
            [
                'single' => 'bunch',
                'plural' => 'bunches'
            ],
            [
                'single' => 'pinch',
                'plural' => 'pinches'
            ],
            [
                'single' => 'handful',
                'plural' => 'handfuls'
            ],
            [
                'single' => 'ml',
                'single_imp' => 'fl oz',
                'conversion' => 0.033814
            ],
            [
                'single' => 'l',
                'single_imp' => 'gal (US)',
                'conversion' => 0.264172
            ]
        ];
        foreach ( $units as $unit ){
            $Unit = new Unit;

            foreach ( $unit as $key => $val ){
                $Unit[$key] = $val;
            }
            
            $Unit->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::connection($this->connection)
            ->table('units', function(Blueprint $collection)
            {
                $collection->drop();
            });
    }
}
