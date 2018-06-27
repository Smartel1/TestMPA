<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = [
        'template_id', 'unit', 'price'
    ];

    protected $hidden = ['template_id', 'created_at', 'updated_at'];


    public function template () {

        return $this->belongsTo('App\Template');

    }

    public function orders() {

        return $this->belongsToMany('App\Order');

    }
}
