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
            'custom_styles' => 'nullable|array',
            'custom_styles.link_card' => 'nullable|array',
            'custom_styles.link_card.borderRadius' => 'nullable|string',
            'custom_styles.link_card.border' => 'nullable|string',
            'custom_styles.link_card.backgroundColor' => 'nullable|string',
            'custom_styles.link_card.color' => 'nullable|string',
            'custom_styles.icon' => 'nullable|array',
            'custom_styles.icon.filter' => 'nullable|string'
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
            
            // Atualizações básicas do tema
            if ($request->has('theme_id')) {
                $updateData['theme_id'] = $request->theme_id;
                $responseData['theme_id'] = $request->theme_id;
                
                // Se for um tema padrão (não custom), limpa os estilos customizados
                $theme = Theme::find($request->theme_id);
                if (!$theme->is_custom) {
                    $updateData['custom_bg_type'] = null;
                    $updateData['custom_bg_color'] = null;
                    $updateData['custom_styles'] = null;
                }
            }

            // Atualizações de background
            if ($request->has('custom_bg_type')) {
                $updateData['custom_bg_type'] = $request->custom_bg_type;
                $responseData['custom_bg_type'] = $request->custom_bg_type;
            }

            if ($request->has('custom_bg_color')) {
                $updateData['custom_bg_color'] = $request->custom_bg_color;
                $responseData['custom_bg_color'] = $request->custom_bg_color;
            }
            
            // Atualizações de estilos customizados
            if ($request->has('custom_styles')) {
                $customStyles = $request->custom_styles;
                
                // Se já tem um tema customizado, mescla com os estilos existentes
                if ($user->theme_id && $user->theme->is_custom) {
                    $currentStyles = $user->theme->styles ?? [];
                    $customStyles = array_merge($currentStyles, $customStyles);
                }
                
                $customTheme = $this->handleCustomTheme($user, $customStyles);
                
                $responseData = array_merge($responseData, [
                    'theme' => $customTheme,
                    'theme_id' => $customTheme->id,
                    'custom_styles' => $customTheme->styles
                ]);
                
                // Garante que os dados de background estão sincronizados
                if ($request->has('custom_bg_type') || $request->has('custom_bg_color')) {
                    $user->refresh();
                }
            }
            
            // Aplica atualizações no usuário
            if (!empty($updateData)) {
                $user->update($updateData);
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
        // Remove temas customizados antigos
        Theme::where('user_id', $user->id)
            ->where('is_custom', true)
            ->delete();

        $timestamp = now()->timestamp;

        // Cria novo tema customizado
        $customTheme = Theme::create([
            'user_id' => $user->id,
            'name' => 'Custom Theme - ' . $user->name . ' - ' . $timestamp,
            'slug' => 'custom-theme-' . $user->id . '-' . $timestamp,
            'styles' => $customStyles,
            'is_custom' => true,
            'is_active' => true
        ]);

        // Atualiza usuário com o novo tema
        $user->update([
            'theme_id' => $customTheme->id,
            'custom_styles' => null // Limpa estilos antigos se existirem
        ]);

        return $customTheme;
    }
}