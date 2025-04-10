<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PlatformController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SharedLinkController;
use App\Http\Controllers\UserLinkController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
    Route::put('/profile/update', [ProfileController::class, 'update'])->name('profile.update');
    Route::get('/api/platforms', [PlatformController::class, 'index'])->name('platforms.index');
    Route::post('/user-links', [UserLinkController::class, 'store'])->name('user-links.store');
    Route::patch('/profile/theme', [ProfileController::class, 'updateTheme'])
    ->name('profile.theme.update');
});

Route::get('/devlinks/{user:username}', [SharedLinkController::class, 'handle'])->name('shared');
Route::get('/click/{id}', [UserLinkController::class, 'trackClick'])->name('links.track');

require __DIR__ . '/auth.php';
