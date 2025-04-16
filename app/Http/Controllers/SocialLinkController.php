<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateSocialLinkRequest;
use App\Http\Requests\SocialLinkRequest;
use App\Models\SocialLink;
use App\Models\Platform;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SocialLinkController extends Controller
{
        public function index()
    {
        $user = Auth::user();
        
        $socialLinks = $user->socialLinks()
            ->with('platform')
            ->orderBy('order')
            ->get();

        return response()->json([
            'socialLinks' => $socialLinks,
            'count' => $socialLinks->count()
        ]);
    }

    public function store(SocialLinkRequest $request)
    {
        try {
            $user = Auth::user();
            $platform = Platform::find($request['platform_id']);
            
            if (!$platform) {
                return response()->json(['message' => 'Platform not found'], 404);
            }

            $existingLink = SocialLink::where('user_id', $user->id)
                ->where('platform_id', $request['platform_id'])
                ->first();
        
            if ($existingLink) {
                return response()->json([
                    'message' => 'You already have a link for this platform',
                    'link' => $existingLink
                ], 409);
            }
        
            $link = $user->socialLinks()->create([
                'platform_id' => $request['platform_id'],
                'username' => $request['username'],
                'url' => $this->buildCompleteUrl($platform->base_url, $request['username']),
                'order' => $user->socialLinks()->count() + 1
            ]);
        
            return response()->json([
                'message' => 'Link added successfully!',
                'link' => $link->load('platform')
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create link. Please try again later.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(UpdateSocialLinkRequest $request, SocialLink $socialLink)
    {
        $this->authorize('update', $socialLink);

        try {
            $platform = $socialLink->platform;

            $existingLink = SocialLink::where('user_id', Auth::id())
                ->where('platform_id', $platform->id)
                ->where('id', '!=', $socialLink->id)
                ->first();

            if ($existingLink) {
                return response()->json([
                    'message' => 'You already have another link for this platform',
                    'link' => $existingLink
                ], 409);
            }

            $socialLink->update([
                'username' => $request['username'],
                'url' => $this->buildCompleteUrl($platform->base_url, $request['username'])
            ]);

            return response()->json([
                'message' => 'Link updated successfully!',
                'link' => $socialLink->fresh()->load('platform')
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update link. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy(SocialLink $socialLink)
    {
        $this->authorize('delete', $socialLink);

        try {
            $socialLink->delete();

            return response()->json([
                'message' => 'Link removed successfully!'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete link. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    protected function buildCompleteUrl(?string $baseUrl, string $username): string
    {
        if (str_starts_with($username, 'http://') || str_starts_with($username, 'https://')) {
            return $username;
        }

        if (empty($baseUrl)) {
            return $username;
        }

        $baseUrl = rtrim($baseUrl, '/');
        $username = ltrim($username, '/');
        
        return $baseUrl . '/' . $username;
    }
}