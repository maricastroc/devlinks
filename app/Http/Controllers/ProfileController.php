<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function index(Request $request): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
    
        $userLinks = $user->userLinks()->with('platform')->get();
    
        return Inertia::render('Profile', [
            'user' => $user,
            'userLinks' => $userLinks,
            'currentRoute' => Route::currentRouteName(),
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request)
    {
        try {
            /** @var \App\Models\User $user */
            $user = Auth::user();

            $updated = $user->updateWithPhoto($request->validated(), $user);

            if ($updated) {
                return response()->json([
                    'message' => 'Profile successfully updated!',
                    'status' => 'success',
                    'user' => $user
                ], 200);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An unexpected error has occurred. Please try again.',
                'status' => 'error'
            ], 500);
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function updateTheme(Request $request)
{
    $request->validate([
        'template' => ['required', 'string', 'in:Default,Lavender,Midnight,Dark,Serenity,Gradient,Mist,Ocean'],
    ]);

    try {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->template = $request->template;
        $user->save();

        return response()->json([
            'message' => 'Theme updated successfully!',
            'template' => $user->template
        ], 200);
        
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Failed to update theme',
            'error' => $e->getMessage()
        ], 500);
    }
}
}
