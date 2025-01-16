<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Template extends Model
{
    /** @use HasFactory<\Database\Factories\TemplateFactory> */
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['name', 'body', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Local scope for search by name or id.
     */
    public function scopeSearch($query, $search)
    {
        return $query->when($search, function ($query, $search) {
            $query->where('name', 'like', "%$search%")
                ->orWhere('id', 'like', "%$search%");
        });
    }
}
