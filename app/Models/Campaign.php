<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Campaign extends Model
{
    /** @use HasFactory<\Database\Factories\CampaignFactory> */
    use HasFactory;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'template_id',
        'email_list_id',
        'user_id',
        'name',
        'subject',
        'body',
        'send_at',
        'track_click',
        'track_open',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function emailList()
    {
        return $this->belongsTo(EmailList::class);
    }

    public function template()
    {
        return $this->belongsTo(Template::class);
    }

    public function scopeSearch($query, $search)
    {
        return $query->when($search, function ($query, $search) {
            $query->where('name', 'like', "%$search%")
                ->orWhere('id', 'like', "%$search%")
                ->orWhereHas('emailList', function ($query) use ($search) {
                    $query->where('title', 'like', "%$search%");
                })
                ->orWhereHas('template', function ($query) use ($search) {
                    $query->where('name', 'like', "%$search%");
                });
        });
    }
}
