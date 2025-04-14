<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SocialLinks extends Model
{
    protected $fillable = ['user_id', 'platform_id', 'url', 'order'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function platform()
    {
        return $this->belongsTo(Platform::class);
    }

    public function getIconAttribute()
    {
        return $this->platform->icon;
    }
}
