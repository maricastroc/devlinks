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
    Route::post('/user-links', [UserLinkController::class, 'store'])->name('user-links.store');;
});

Route::get('/shared/{user}', SharedLinkController::class)->name('shared');

require __DIR__ . '/auth.php';
