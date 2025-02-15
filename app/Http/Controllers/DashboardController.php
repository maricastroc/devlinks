<?php

namespace App\Http\Controllers;

use App\Models\Platform;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $platforms = Platform::all();

        return Inertia::render('Dashboard/Index', [
            'platforms' => $platforms,
            'currentRoute' => Route::currentRouteName(),
        ]);
    }
}
