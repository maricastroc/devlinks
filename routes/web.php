<?php

use App\Http\Controllers\CampaignController;
use App\Http\Controllers\CampaignEmailController;
use App\Http\Controllers\CampaignStatisticsController;
use App\Http\Controllers\EmailListController;
use App\Http\Controllers\EmailTrackingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubscriberController;
use App\Http\Controllers\TemplateController;
use App\Mail\EmailCampaign;
use App\Models\Campaign;
use App\Models\CampaignMail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->prefix('profile')->name('profile.')->group(function () {
    Route::get('/', [ProfileController::class, 'edit'])->name('edit');
    Route::patch('/', [ProfileController::class, 'update'])->name('update');
    Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [CampaignController::class, 'index'])->name('dashboard');
    Route::resource('campaigns', CampaignController::class)->except(['index']);
    Route::put('campaigns/{campaign}/restore', [CampaignController::class, 'restore'])->withTrashed()->name('campaigns.restore');
    Route::get('/campaigns/{campaign}/emails', [CampaignController::class, 'sendCampaignEmails'])->name('campaign.emails');
    Route::post('/campaigns/test-email', [CampaignEmailController::class, 'test'])->name('campaign.test.email');

    Route::get('/campaigns/{campaign}/statistics', CampaignStatisticsController::class)->name('campaign.statistics');
});

Route::middleware('auth')->group(function () {
    Route::resource('lists', EmailListController::class);
    Route::put('lists/{list}/restore', [EmailListController::class, 'restore'])->withTrashed()->name('lists.restore');
    Route::resource('templates', TemplateController::class);
    Route::put('templates/{template}/restore', [TemplateController::class, 'restore'])->withTrashed()->name('templates.restore');
});

Route::middleware('auth')->prefix('lists/{list}')->group(function () {
    Route::resource('subscribers', SubscriberController::class)->except(['index', 'show']);
    Route::put('subscribers/{subscriber}/restore', [SubscriberController::class, 'restore'])->withTrashed()->name('subscribers.restore');
});

Route::middleware('auth')->group(function () {
    Route::get('/env-variables', function () {
        return response()->json([
            'MAIL_FROM_ADDRESS' => env('MAIL_FROM_ADDRESS'),
            'MAIL_FROM_NAME' => env('MAIL_FROM_NAME'),
        ]);
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/track/opening/{mail}', [EmailTrackingController::class, 'trackOpening'])
        ->name('tracking.openings');

    Route::get('/email', function () {
        $campaign = Campaign::find(12);
        $mail = $campaign->mails()->first();

        $email = new EmailCampaign($campaign, $mail);

        return $email->render();
    });
});

require __DIR__ . '/auth.php';
