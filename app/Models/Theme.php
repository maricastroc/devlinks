<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Theme extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'slug',
        'styles',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'styles' => 'array',
            'is_active' => 'boolean',
        ];
    }
}
