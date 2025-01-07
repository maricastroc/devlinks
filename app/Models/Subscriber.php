<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscriber extends Model
{
    protected $fillable = ['name', 'email', 'email_list_id'];

    public function emailList()
    {
        return $this->belongsTo(EmailList::class);
    }
}
