<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Subscriber extends Model
{
    /** @use HasFactory<\Database\Factories\Subscribers> */
    use HasFactory;
    use SoftDeletes;

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

    public function campaignMails(): HasMany
    {
        return $this->hasMany(CampaignMail::class);
    }
}
