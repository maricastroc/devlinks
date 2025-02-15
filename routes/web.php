<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix('profile')->name('profile.')->group(function () {
    Route::get('/', [ProfileController::class, 'edit'])->name('edit');
    Route::patch('/', [ProfileController::class, 'update'])->name('update');
    Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => inertia('Dashboard/Index'))->name('web.dashboard.index');
});

Route::middleware('auth')->group(function () {
    Route::get('/env-variables', function () {
        return response()->json([
            'MAIL_FROM_ADDRESS' => env('MAIL_FROM_ADDRESS'),
            'MAIL_FROM_NAME' => env('MAIL_FROM_NAME'),
        ]);
    });
});

require __DIR__ . '/auth.php';
