<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Theme;
use Inertia\Inertia;
use Illuminate\Support\Str;

class SharedLinkController extends Controller
{
    public function handle($userIdentifier)
    {
        $query = User::query();
        
        if (is_numeric($userIdentifier)) {
            $query->where('id', $userIdentifier);
        } else {
            $query->where('username', $userIdentifier);
        }

        $user = $query->with('theme')->first();

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
                'first_name'   => $user->first_name,
                'last_name'    => $user->last_name,
                'public_email' => $user->public_email,
                'avatar_url'   => $user->avatar_url,
                'id'          => $user->id,
                'theme'       => $user->theme ? [
                    'id' => $user->theme->id,
                    'name' => $user->theme->name,
                    'styles' => $user->theme->styles
                ] : null
            ],
            'themes' => $themes,
            'userLinks' => $user->userLinks()->with('platform')->orderBy('order')->get(),
            'authUser' => auth()->user() ? [
                'id' => auth()->user()->id,
            ] : null,
        ];

        return request()->expectsJson() 
            ? response()->json($data) 
            : Inertia::render('Shared/Index', $data);
    }
}