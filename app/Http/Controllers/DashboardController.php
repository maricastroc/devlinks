<?php

namespace App\Http\Controllers;

use App\Models\Platform;
use App\Models\Theme;
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
        $user = Auth::user()->load([
            'theme',
            'userLinks.platform',
            'socialLinks.platform'
        ]);
    
        $themes = Theme::where('is_active', true)
            ->select(['id', 'name', 'styles'])
            ->get();

        return Inertia::render('Dashboard/Index', [
            'user' => $user,
            'platforms' => $platforms,
            'themes' => $themes,
            'currentRoute' => Route::currentRouteName(),
        ]);
    }
}
