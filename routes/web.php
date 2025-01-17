<?php

use App\Http\Controllers\CampaignController;
use App\Http\Controllers\EmailListController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubscriberController;
use App\Http\Controllers\TemplateController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [CampaignController::class, 'index'])->name('dashboard');
    Route::resource('campaigns', CampaignController::class)->except(['index']);
});

Route::middleware('auth')->prefix('profile')->name('profile.')->group(function () {
    Route::get('/', [ProfileController::class, 'edit'])->name('edit');
    Route::patch('/', [ProfileController::class, 'update'])->name('update');
    Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
});

Route::middleware('auth')->group(function () {
    Route::resource('lists', EmailListController::class);
    Route::resource('templates', TemplateController::class);
});

Route::middleware('auth')->prefix('lists/{list}')->group(function () {
    Route::resource('subscribers', SubscriberController::class)->except(['index', 'show']);
});

require __DIR__ . '/auth.php';
