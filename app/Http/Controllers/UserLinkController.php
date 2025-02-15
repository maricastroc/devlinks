<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserLinkRequest;
use App\Models\UserLink;
use Illuminate\Http\Request;

class UserLinkController extends Controller
{
    public function store(Request $request)
    {
        try {
            $userId = auth()->id(); // Pega o ID do usuário autenticado
    
            $links = $request->validate([
                'links' => 'required|array',
                'links.*.platform_id' => 'required|exists:platforms,id',
                'links.*.url' => 'required|url',
            ]);
    
            foreach ($links['links'] as $link) {
                // Não precisa passar o user_id, pois já estamos associando ele ao link automaticamente
                $link['user_id'] = $userId;
    
                UserLink::create($link); // Cria o link com o user_id já atribuído
            }
    
            return response()->json([
                'message' => 'Links successfully created!',
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create links. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
}
