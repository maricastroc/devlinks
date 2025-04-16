<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PlatformController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicPageController;
use App\Http\Controllers\UserLinkController;
use App\Http\Controllers\SocialLinkController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;



Route::middleware('auth:sanctum')->group(function () {
    // Rotas de perfil
    Route::get('/profile', [ProfileController::class, 'getProfileData']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::patch('/profile/theme', [ProfileController::class, 'updateTheme']);
    
    // Outras rotas API
    Route::get('/platforms', [PlatformController::class, 'index']);
    Route::apiResource('/user-links', UserLinkController::class);
    Route::apiResource('/social-links', SocialLinkController::class);
});