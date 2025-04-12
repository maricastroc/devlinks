<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserLinkRequest;
use App\Models\UserLink;
use Illuminate\Http\Request;

class UserLinkController extends Controller
{
    public function store(UserLinkRequest $request)
    {
        try {
            $userId = auth()->id();
    
            $links = $request->validate([
                'links' => 'nullable|array',
                'links.*.platform_id' => 'required_if:links,!=,null|exists:platforms,id',
                'links.*.url' => 'required_if:links,!=,null|url',
                'links.*.order' => 'required_if:links,!=,null|integer',
                'links.*.custom_name' => [
                    'nullable',
                    'string',
                ],
            ]);

            $existingLinks = UserLink::where('user_id', $userId)->get();
    
            $submittedPlatformIds = collect($links['links'])->pluck('platform_id')->toArray();
    
            foreach ($links['links'] as $link) {
                $link['user_id'] = $userId;
    
                $existingLink = UserLink::where('user_id', $userId)
                    ->where('platform_id', $link['platform_id'])
                    ->first();
    
                if ($existingLink) {
                    if (
                        $existingLink->url !== $link['url'] ||
                        $existingLink->order !== $link['order'] ||
                        $existingLink->custom_name !== $link['custom_name']
                    ) {
                        $this->authorize('update', $existingLink);
                    
                        $existingLink->update([
                            'custom_name' => $link['custom_name'],
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
