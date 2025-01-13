<?php

use App\Http\Controllers\EmailListController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubscriberController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/lists', [EmailListController::class, 'index'])->name('lists');
    Route::get('/lists/create', [EmailListController::class, 'create'])->name('lists.create');
    Route::post('/lists/store', [EmailListController::class, 'store'])->name('lists.store');
    Route::put('/lists/update/{emailList}', [EmailListController::class, 'update'])->name('lists.update');
    Route::get('/lists/{emailList}/subscribers', [EmailListController::class, 'show'])->name('lists.show');
    Route::get('/lists/edit/{emailList}', [EmailListController::class, 'edit'])->name('lists.edit');

    Route::get('/lists/{emailList}/add-subscriber', [SubscriberController::class, 'create'])->name('lists.show.add-subscriber');
});

require __DIR__.'/auth.php';
