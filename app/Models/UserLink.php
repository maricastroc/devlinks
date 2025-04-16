<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserLink extends Model {
    use HasFactory;

    protected $fillable = ['user_id', 'platform_id', 'url', 'order', 'custom_name', 'custom_color', 'custom_icon', 'username',];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function platform() {
        return $this->belongsTo(Platform::class);
    }

    public function getDisplayNameAttribute()
{
    return $this->custom_name ?? $this->platform->name;
}
}
