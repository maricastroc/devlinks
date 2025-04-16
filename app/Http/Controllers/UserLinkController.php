<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserLinkRequest;
use App\Models\UserLink;
use App\Models\Platform;
use Illuminate\Http\Request;

class UserLinkController extends Controller
{
    public function store(UserLinkRequest $request)
    {
        try {
            $userId = auth()->id();
            $links = $request->input('links', []);
            
            $submittedPlatformIds = collect($links)->pluck('platform_id')->toArray();
    
            foreach ($links as $linkData) {
                $platform = Platform::find($linkData['platform_id']);
                
                $baseUrl = $platform->base_url ?? '';
                
                $dataToSave = [
                    'user_id' => $userId,
                    'platform_id' => $linkData['platform_id'],
                    'username' => $linkData['username'],
                    'url' => $this->buildCompleteUrl($baseUrl, $linkData['username']), // Passa string, não o objeto
                    'order' => $linkData['order'],
                    'custom_name' => $linkData['custom_name'] ?? null
                ];
    
                $existingLink = UserLink::where('user_id', $userId)
                    ->where('platform_id', $linkData['platform_id'])
                    ->first();
    
                if ($existingLink) {
                    $existingLink->update($dataToSave);
                } else {
                    UserLink::create($dataToSave);
                }
            }
    
            UserLink::where('user_id', $userId)
                ->whereNotIn('platform_id', $submittedPlatformIds)
                ->delete();
    
            return response()->json(['message' => 'Links saved successfully'], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to process links',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function trackClick($id)
    {
        $link = UserLink::findOrFail($id);
        $link->increment('clicks');

        return redirect($link->url);
    }

    protected function buildCompleteUrl(?string $baseUrl, string $userUrl): string
    {
        if (str_starts_with($userUrl, 'http://')
            || str_starts_with($userUrl, 'https://')
        ) {
            return $userUrl;
        }

        if (empty($baseUrl)) {
            return $userUrl;
        }
    
        $baseUrl = rtrim($baseUrl, '/');
        
        $userUrl = ltrim($userUrl, '/');
        
        return $baseUrl . '/' . $userUrl;
    }
}