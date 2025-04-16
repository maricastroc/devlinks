<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class ProfileThemeController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $request->validate([
            'theme_id' => 'required|integer|exists:themes,id'
        ]);

        try {
            $user = Auth::user();
            
            $user->theme_id = $request->theme_id;
            $user->save();
            
            return response()->json([
                'theme_id' => $user->theme_id,
                'message' => 'Theme updated successfully'
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update theme',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}