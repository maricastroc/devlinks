<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserLink extends Model {
    use HasFactory;

    protected $fillable = ['user_id', 'platform_id', 'url'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function platform() {
        return $this->belongsTo(Platform::class);
    }
}
