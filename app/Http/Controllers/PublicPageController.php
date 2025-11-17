<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

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
            ->with([
                'userLinks' => function ($query) {
                    $query->with('platform')->orderBy('order');
                },
                'socialLinks.platform'
            ]);

        return is_numeric($identifier)
            ? $query->find($identifier)
            : $query->where('username', $identifier)->first();
    }

    protected function renderPublicPage(User $user)
    {
        $authUser = auth()->user();

        $data = [
            'user' => [
                'id'         => $user->id,
                'username'   => $user->username,
                'bio'        => $user->bio,
                'name'       => $user->name,
                'avatar_url' => $user->avatar_url,
            ],
            'userLinks'   => $user->userLinks,
            'socialLinks' => $user->socialLinks->map(function ($link) {
                return $link->load('platform');
            }),
            'authUser' => $authUser?->only('id'),
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