<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ThemeController;
use App\Http\Controllers\PlatformController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfileThemeController;
use App\Http\Controllers\AuthenticatedUserController;
use App\Http\Controllers\PublicPageController;
use App\Http\Controllers\UserLinkController;
use App\Http\Controllers\SocialLinkController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'web'])->group(function () {
    Route::get('/profile', fn(Request $request) => inertia('Profile/Index'))->name(
        'web.profile.index'
    );

    Route::get('/themes', fn(Request $request) => inertia('Themes/Index'))->name(
        'web.themes.index'
    );

    Route::get('/', fn(Request $request) => inertia('Dashboard/Index'))->name(
        'web.dashboard.index'
    );

    Route::prefix('api')->middleware('web')->group(function () {
        Route::get('/social-links', [SocialLinkController::class, 'index']);
        Route::post('/social-links', [SocialLinkController::class, 'store']);
        Route::put('/social-links/{socialLink}', [SocialLinkController::class, 'update']);
        Route::delete('/social-links/{socialLink}', [SocialLinkController::class, 'destroy']);

        Route::post('/user-links', [UserLinkController::class, 'store']);
        Route::get('/platforms', [PlatformController::class, 'index']);
        Route::get('/themes', [ThemeController::class, 'index']);
        Route::get('/auth/user', AuthenticatedUserController::class);
        Route::put('/profile/update', [ProfileController::class, 'update']);
        Route::put('/profile/theme', ProfileThemeController::class);
    });    
});

Route::middleware('web')->group(function () {
    Route::get('/@{user:username}', [PublicPageController::class, 'handle'])->name('shared');
});


Route::get('/click/{id}', [UserLinkController::class, 'trackClick'])
    ->name('links.track')
    ->withoutMiddleware(['web']);

require __DIR__ . '/auth.php';
