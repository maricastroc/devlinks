<?php

use App\Http\Controllers\CampaignController;
use App\Http\Controllers\CampaignEmailController;
use App\Http\Controllers\EmailListController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubscriberController;
use App\Http\Controllers\TemplateController;
use App\Mail\EmailCampaign;
use App\Models\Campaign;
use Illuminate\Support\Facades\Mail;
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
    Route::get('/campaigns/{campaign}/emails', [CampaignController::class, 'sendCampaignEmails'])->name('campaign.emails');
    Route::post('/campaigns/test-email', [CampaignEmailController::class, 'test'])->name('campaign.test.email');
});

Route::middleware('auth')->prefix('lists/{list}')->group(function () {
    Route::resource('subscribers', SubscriberController::class)->except(['index', 'show']);
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
