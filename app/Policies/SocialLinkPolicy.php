<?php

namespace App\Policies;

use App\Models\User;
use App\Models\SocialLink;
use Illuminate\Auth\Access\Response;

class SocialLinkPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return auth()->check();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user): bool
    {
        return auth()->check();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, SocialLink $socialLink): bool
    {
        return $socialLink->user_id === $user->id;
    }
    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, SocialLink $socialLink): bool
    {
        return $socialLink->user_id === $user->id;
    }
}
