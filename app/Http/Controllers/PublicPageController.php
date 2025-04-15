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
        $query = User::query();
        
        if (is_numeric($userIdentifier)) {
            $query->where('id', $userIdentifier);
        } else {
            $query->where('username', $userIdentifier);
        }

        $user = $query->with([
            'theme',
            'userLinks.platform',
            'socialLinks.platform'
        ])->first();

        if (!$user) {
            return Inertia::render('ErrorPage', [
                'status' => 404,
                'message' => 'Profile not found'
            ]);
        }

        $themes = Theme::where('is_active', true)
            ->select(['id', 'name', 'styles'])
            ->get();

        $data = [
            'user' => [
                'name'       => $user->name,
                'avatar_url' => $user->avatar_url,
                'id'         => $user->id,
                'theme'      => $user->theme ? [
                    'id'     => $user->theme->id,
                    'name'   => $user->theme->name,
                    'styles' => $user->theme->styles
                ] : null
            ],
            'themes'    => $themes,
            'userLinks' => $user->userLinks,
            'socialLinks' => $user->socialLinks,
            'authUser'  => auth()->user() ? [
                'id' => auth()->user()->id,
            ] : null,
        ];

        return request()->expectsJson() 
            ? response()->json($data) 
            : Inertia::render('PublicPage/Index', $data);
    }
}