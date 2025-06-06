<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'username' => 'required|string|lowercase|min:3|max:255|unique:' . User::class,
            'password' => ['required', Rules\Password::defaults()],
        ]);
    
        try {
            $user = User::create([
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'username' => $request->username,
            ]);
    
            Auth::login($user);
    
            return redirect()->route('web.dashboard.index');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                'error' => 'An unexpected error has occurred. Please try again.',
            ]);
        }
    }
}
