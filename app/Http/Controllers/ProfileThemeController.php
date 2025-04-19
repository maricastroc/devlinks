<?php

namespace App\Http\Controllers;

use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProfileThemeController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'custom_bg_type' => 'nullable|string',
            'custom_bg_color' => 'nullable|string',
            'theme_id' => 'nullable|integer|exists:themes,id',
            'custom_styles' => 'nullable|array'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $user = Auth::user();
            $updateData = [];
            $responseData = [];
            
            if ($request->has('theme_id')) {
                $updateData['theme_id'] = $request->theme_id;
                $responseData['theme_id'] = $request->theme_id;
            }

            if ($request->has('custom_bg_type')) {
                $updateData['custom_bg_type'] = $request->custom_bg_type;
                $responseData['custom_bg_type'] = $request->custom_bg_type;
            }

            if ($request->has('custom_bg_color')) {
                $updateData['custom_bg_color'] = $request->custom_bg_color;
                $responseData['custom_bg_color'] = $request->custom_bg_color;
            }
            
            if (!empty($updateData)) {
                $user->update($updateData);
            }
            
            if ($request->has('custom_styles') && !empty($request->custom_styles)) {
                $customTheme = $this->handleCustomTheme($user, $request->custom_styles);
                
                $responseData = array_merge($responseData, [
                    'theme' => $customTheme,
                    'theme_id' => $customTheme->id,
                    'custom_styles' => $customTheme->styles
                ]);
            }
            
            if (empty($updateData) && !$request->has('custom_styles')) {
                return response()->json([
                    'message' => 'No changes detected'
                ], 400);
            }
            
            return response()->json(array_merge($responseData, [
                'message' => 'Theme updated successfully'
            ]), 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update theme',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    protected function handleCustomTheme($user, array $customStyles): Theme
    {
        Theme::where('user_id', $user->id)
            ->where('is_custom', true)
            ->delete();

        $timestamp = now()->timestamp;

        $customTheme = Theme::create([
            'user_id' => $user->id,
            'name' => 'Custom Theme - ' . $user->name . ' - ' . $timestamp,
            'slug' => 'custom-theme-' . $user->id . '-' . $timestamp,
            'styles' => $customStyles,
            'is_custom' => true,
            'is_active' => true
        ]);

        $user->update([
            'theme_id' => $customTheme->id,
            'custom_styles' => null
        ]);

        return $customTheme;
    }
}