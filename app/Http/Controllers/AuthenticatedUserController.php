<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AuthenticatedUserController extends Controller
{
    public function __invoke(): JsonResponse
    {
        /** @var \App\Models\User|null $user */
        $user = Auth::user();

        if ($user) {
            $user->load([
                'userLinks' => function ($query) {
                    $query->orderBy('order')->with('platform');
                },
                'socialLinks.platform'
            ]);
        }

        return response()->json([
            'data' => [
                'user' => $user,
            ],
            'meta' => [
                'timestamp' => now()->toDateTimeString(),
                'status' => 'success'
            ]
        ]);
    }
}