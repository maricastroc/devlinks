<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Str;

class SharedLinkController extends Controller
{
    public function handle($userIdentifier)
    {
        $query = User::query();
        
        if (is_numeric($userIdentifier)) {
            $query->where('id', $userIdentifier);
        }
        
        $query->orWhere('username', $userIdentifier);
        
        $user = $query->first();

        if (!$user) {
            return Inertia::render('ErrorPage', [
                'status' => 404,
                'message' => 'Profile not found'
            ]);
        }

        $data = [
            'user' => [
                'first_name'   => $user->first_name,
                'last_name'    => $user->last_name,
                'public_email' => $user->public_email,
                'template'     => $user->template,
                'avatar_url'  => $user->avatar_url,
                'id'          => $user->id,
            ],
            'userLinks' => $user->userLinks()->with('platform')->orderBy('order')->get(),
            'authUser' => auth()->user() ? [
                'id' => auth()->user()->id,
            ] : null,
        ];

        return request()->expectsJson() 
            ? response()->json($data) 
            : Inertia::render('Shared', $data);
    }
}