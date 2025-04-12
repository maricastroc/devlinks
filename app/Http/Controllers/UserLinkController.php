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
    
            foreach ($links as $link) {
                $link['user_id'] = $userId;
    
                $existingLink = UserLink::where('user_id', $userId)
                    ->where('platform_id', $link['platform_id'])
                    ->first();
    
                if ($existingLink) {
                    if (
                        $existingLink->url !== $link['url'] ||
                        $existingLink->order !== $link['order'] ||
                        ($existingLink->custom_name ?? null) !== ($link['custom_name'] ?? null)
                    ) {
                        $this->authorize('update', $existingLink);
                    
                        $existingLink->update([
                            'custom_name' => $link['custom_name'] ?? null,
                            'url' => $link['url'],
                            'order' => $link['order'],
                        ]);
                    }
                } else {
                    UserLink::create($link);
                }
            }
    
            UserLink::where('user_id', $userId)
                ->whereNotIn('platform_id', $submittedPlatformIds)
                ->delete();
    
            return response()->json([
                'message' => 'Links successfully processed!',
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to process links. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function trackClick($id)
    {
        $link = UserLink::findOrFail($id);
        $link->increment('clicks');

        return redirect($link->url);
    }
}