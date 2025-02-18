<?php

namespace App\Http\Controllers;

use App\Models\Platform;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $platforms = Platform::all();

        /** @var \App\Models\User $user */
        $user = Auth::user();
    
        $userLinks = $user->userLinks()->with('platform')->orderBy('order')->get();
    
        return Inertia::render('Dashboard', [
            'user' => $user,
            'platforms' => $platforms,
            'userLinks' => $userLinks,
            'currentRoute' => Route::currentRouteName(),
        ]);
    }
}
