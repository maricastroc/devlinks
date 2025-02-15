<?php

namespace App\Http\Controllers;

use App\Models\Platform;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PlatformController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $this->authorize('viewAny', Platform::class);

        try {
            $platforms = Platform::all();

            return response()->json([
                'success' => true,
                'data' => $platforms
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
