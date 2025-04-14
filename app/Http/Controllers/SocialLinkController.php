<?php

namespace App\Http\Controllers;

use App\Models\SocialLinks;
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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'platform_id' => 'required|exists:platforms,id',
            'value' => 'required|string|max:255', 
        ]);
    
        $user = Auth::user();

        $platform = Platform::find($validated['platform_id']);

        $existingLink = SocialLinks::where('user_id', $user->id)
            ->where('platform_id', $validated['platform_id'])
            ->first();
    
        if ($existingLink) {
            return response()->json([
                'message' => 'You already have a link for this platform',
                'link' => $existingLink
            ], 409);
        }
    
        $formattedValue = $this->formatValue($platform->name, $validated['value']);
    
        $link = $user->socialLinks()->create([
            'platform_id' => $validated['platform_id'],
            'url' => $formattedValue,
            'order' => $user->socialLinks()->count() + 1
        ]);
    
        return response()->json([
            'message' => 'Link added successfully!',
            'link' => $link->load('platform')
        ], 201);
    }
    
    private function formatValue(string $platformName, string $value): string
    {
        $platformName = strtolower($platformName);
        
        switch ($platformName) {
            case 'whatsapp':
                $number = preg_replace('/[^0-9]/', '', $value);
                return "https://wa.me/{$number}";
                
            case 'email':
                return "mailto:{$value}";
                
            default:
                if (!preg_match('~^(?:f|ht)tps?://~i', $value)) {
                    return "https://{$value}";
                }
                return $value;
        }
    }

    public function destroy(SocialLinks $socialLink)
    {
        $this->authorize('delete', $socialLink);
        
        $socialLink->delete();

        return response()->json([
            'message' => 'Link removed successfully!'
        ]);
    }
}