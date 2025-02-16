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
    
        return Inertia::render('Profile/Index', [
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

            return response()->json([
                'message' => 'Error updating profile.',
                'status' => 'error'
            ], 500);
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
}
