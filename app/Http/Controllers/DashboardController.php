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

        /** @var \App\Models\User|null $user */
        $user = Auth::user();

        if ($user) {
            $user->load([
                'userLinks.platform',
                'socialLinks.platform'
            ]);
        }
        return Inertia::render('Dashboard/Index', [
            'user' => $user,
            'platforms' => $platforms,
            'currentRoute' => Route::currentRouteName(),
        ]);
    }
}
