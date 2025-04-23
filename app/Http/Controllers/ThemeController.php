<?php

namespace App\Http\Controllers;

use App\Models\Theme;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ThemeController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $this->authorize('viewAny', Theme::class);

        try {
            $themes = Theme::where('is_active', true)
            ->where('is_custom', false)
            ->select(['id', 'name', 'styles', 'type', 'order'])
            ->orderBy('order', 'asc')
            ->get();
            
            return response()->json([
                'data' => [
                    'themes' => $themes
                ]
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An unexpected error occurred!',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
