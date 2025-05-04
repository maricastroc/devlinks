<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AuthenticatedUserController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $user = Auth::user()->load([
            'theme',
            'userLinks' => function($query) {
                $query->orderBy('order')->with('platform');
            },
            'socialLinks.platform'
        ]);

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