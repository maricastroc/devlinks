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

    /**
     * Local scope for search by name or email.
     */
    public function scopeSearch($query, $search)
    {
        return $query->when($search, function ($query, $search) {
            $query->where('name', 'like', "%$search%")
                ->orWhere('email', 'like', "%$search%");
        });
    }
}
