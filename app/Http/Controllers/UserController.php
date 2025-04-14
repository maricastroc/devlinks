<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Theme;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
  public function getAuthenticatedUser()
  {
      /** @var \App\Models\User $user */
      $user = Auth::user()->load('theme');
      
      return response()->json([
          'user' => $user,
      ]);
  }
}