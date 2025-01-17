<?php

namespace App\Policies;

use App\Models\EmailList;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class EmailListPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(): bool
    {
        return auth()->check();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, EmailList $list): bool
    {
        return $list->user->is($user);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(): bool
    {
        return auth()->check();
    }

    /**
     * Determine whether the user can edit models.
     */
    public function edit(User $user, EmailList $list): bool
    {
        return $list->user->is($user);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, EmailList $list): bool
    {
        return $list->user->is($user);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, EmailList $list): bool
    {
        return $list->user->is($user);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, EmailList $list): bool
    {
        return $list->user->is($user);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, EmailList $list): bool
    {
        return false;
    }
}
