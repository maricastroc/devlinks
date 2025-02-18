<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class SharedLinkController extends Controller
{
    public function __invoke($userId)
    {
        if (!is_numeric($userId)) {
            return Inertia::render('ErrorPage');
        }

        try {
            $user = User::findOrFail($userId);
        } catch (ModelNotFoundException $e) {
            return Inertia::render('ErrorPage');
        }

        $data = [
            'user' => [
                'first_name'   => $user->first_name,
                'last_name'    => $user->last_name,
                'public_email' => $user->public_email,
                'avatar_url'   => $user->avatar_url,
                'id' => $user->id,
            ],
            'userLinks' => $user->userLinks()->with('platform')->orderBy('order')->get(),
            'authUser' => auth()->user() ? [
                'id' => auth()->user()->id,
            ] : null,
        ];

        /** @var \Illuminate\Http\Request $request */
        $request = request();

        if ($request->expectsJson()) {
            return response()->json($data);
        }

        return Inertia::render('Shared', $data);
    }
}