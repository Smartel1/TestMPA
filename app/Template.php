<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    protected $fillable = ['name', 'category_id', 'image', 'description'];

    protected $hidden = ['created_at', 'updated_at', 'category_id', 'id'];


    public function category () {

        return $this->belongsTo('App\Category');

    }

    public function items () {

        return $this->hasMany('App\Item');

    }
}
