<?php

use App\Http\Controllers\EmailListController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubscriberController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', fn() => Inertia::render('Dashboard'))->name('dashboard');
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard'); // Pode ser removida se duplicada for desnecessária
});

Route::middleware('auth')->prefix('profile')->name('profile.')->group(function () {
    Route::get('/', [ProfileController::class, 'edit'])->name('edit');
    Route::patch('/', [ProfileController::class, 'update'])->name('update');
    Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
});

Route::middleware('auth')->group(function () {
    Route::resource('lists', EmailListController::class);
});

Route::middleware('auth')->prefix('lists/{list}')->group(function () {
    Route::resource('subscribers', SubscriberController::class)->except(['index', 'show']);
});

require __DIR__ . '/auth.php';
