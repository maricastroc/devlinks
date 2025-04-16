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

Route::middleware('auth')->group(function () {
    Route::put('/profile/update', [ProfileController::class, 'update'])->name('profile.update');
    
    Route::get('/profile', fn(Request $request) => inertia('Profile/Index'))->name(
        'web.profile.index'
    );

    Route::get('/', fn(Request $request) => inertia('Dashboard/Index'))->name(
        'web.dashboard.index'
    );

    Route::prefix('api')->group(function () {
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

Route::get('/@{user:username}', [PublicPageController::class, 'handle'])->name('shared');
Route::get('/click/{id}', [UserLinkController::class, 'trackClick'])->name('links.track');

require __DIR__ . '/auth.php';
