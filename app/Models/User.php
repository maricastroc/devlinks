<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'email',
        'password',
        'public_email',
        'first_name',
        'last_name',
        'avatar_url',
        'theme',
        'username'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function userLinks()
    {
        return $this->hasMany(UserLink::class);
    }

    public function updateWithPhoto(array $data, User $user)
    {
        if (isset($data['new_password'])) {
            $data['new_password'] = Hash::make($data['new_password']);
        }
    
        if (isset($data['avatar_url']) && $data['avatar_url'] instanceof \Illuminate\Http\UploadedFile) {
            $this->deleteOldAvatar($user);
            
            $fileName = 'avatar_'.$user->id.'_'.time().'.'.$data['avatar_url']->extension();
            $data['avatar_url']->move(public_path('assets/users'), $fileName);
            
            $user->avatar_url = 'assets/users/'.$fileName;
        }

        if (isset($data['public_email'])) {
            $user->public_email = $data['public_email'];
        }

        $user->username = $data['username'];
        
        $user->first_name = $data['first_name'];

        $user->last_name = $data['last_name'];

        $user->email = $data['email'] ?? $user->email;

        $user->password = $data['new_password'] ?? $user->password;
    
        return $user->save();
    }

    protected function deleteOldAvatar(User $user)
    {
        if ($user->avatar_url && strpos($user->avatar_url, 'assets/users/') === 0) {
            $oldPath = public_path($user->avatar_url);
            if (file_exists($oldPath)) {
                unlink($oldPath);
            }
        }
    }

    public function getAvatarUrlAttribute()
    {
        if (!$this->attributes['avatar_url']) {
            return null;
        }
        
        if (filter_var($this->attributes['avatar_url'], FILTER_VALIDATE_URL)) {
            return $this->attributes['avatar_url'];
        }
        
        if (strpos($this->attributes['avatar_url'], 'assets/users/') === 0) {
            return url('/').'/'.$this->attributes['avatar_url'];
        }
        
        return $this->attributes['avatar_url'];
    }

    public function getRouteKeyName()
    {
        return 'username';
    }

    public function theme()
{
    return $this->belongsTo(Theme::class);
}
}
