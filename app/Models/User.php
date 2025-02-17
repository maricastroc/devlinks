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
    
        if (isset($data['avatar_url']) && $data['avatar_url']->isValid()) {
            $destinationPath = public_path('assets/users');
            $fileName = time() . '_' . $data['avatar_url']->getClientOriginalName();
            $data['avatar_url']->move($destinationPath, $fileName);
        
            $data['avatar_url'] = 'assets/users/' . $fileName;
        } else {
            $data['avatar_url'] = $data['avatar_url'] ?? $user->avatar_url;
        }

        if (isset($data['public_email'])) {
            $user->public_email = $data['public_email'];
        }
        
        $user->first_name = $data['first_name'];

        $user->last_name = $data['last_name'];

        $user->avatar_url = $data['avatar_url'];

        $user->email = $data['email'] ?? $user->email;

        $user->password = $data['new_password'] ?? $user->password;
    
        return $user->save();
    }
}
