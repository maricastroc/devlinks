<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserLinkRequest;
use App\Models\UserLink;

class UserLinkController extends Controller
{
  public function store(UserLinkRequest $request)
{
    try {
        $userId = auth()->id();

        // Validando os links no array
        $links = $request->validate([
            'links' => 'required|array',
            'links.*.platform_id' => 'required|exists:platforms,id',
            'links.*.url' => 'required|url',
        ]);

        foreach ($links['links'] as $link) {
            $link['user_id'] = $userId;

            UserLink::create($link);
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
