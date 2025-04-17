<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Theme;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PublicPageController extends Controller
{
    public function handle($userIdentifier)
    {
        $user = $this->resolveUser($userIdentifier);
        
        if (!$user) {
            return $this->renderError(404, 'Profile not found');
        }

        return $this->renderPublicPage($user);
    }

    protected function resolveUser($identifier): ?User
    {
        $query = User::query()
            ->with(['theme', 'userLinks.platform', 'socialLinks.platform']);

        return is_numeric($identifier) 
            ? $query->find($identifier)
            : $query->where('username', $identifier)->first();
    }

    protected function renderPublicPage(User $user)
    {
        $data = [
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'bio' => $user->bio,
                'name'       => $user->name,
                'avatar_url' => $user->avatar_url,
                'theme'      => $user->theme?->only(['id', 'name', 'styles', 'type'])
            ],
            'themes' => Theme::all(),
            'userLinks' => $user->userLinks->map(function ($link) {
                return $link->load('platform');
            }),
            'socialLinks' => $user->socialLinks->map(function ($link) {
                return $link->load('platform');
            }),
            'authUser' => auth()->user()?->only('id')
        ];

        return request()->expectsJson()
            ? response()->json($data)
            : Inertia::render('PublicPage/Index', $data);
    }

    protected function renderError($status, $message)
    {
        return request()->expectsJson()
            ? response()->json(['message' => $message], $status)
            : Inertia::render('ErrorPage', [
                'status' => $status,
                'message' => $message
            ]);
    }
}