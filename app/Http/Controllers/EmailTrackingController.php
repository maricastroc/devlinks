<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CampaignMail;
use Illuminate\Support\Facades\Log;

class EmailTrackingController extends Controller
{
    public function trackOpening(CampaignMail $mail)
    {
        if (!$mail->campaign->track_open) {
            return;
        }

        try {
            $mail->increment('opens');
        
            $transparentImage = base64_decode(
                'R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
            );
        
            return response($transparentImage)
                ->header('Content-Type', 'image/gif');
        } catch (\Exception $e) {
            Log::error("Error during tracking open: " . $e->getMessage());
            return response(null, 500);
        }
    }

    public function trackClick(Request $request, CampaignMail $mail)
    {
        if (!$mail->campaign->track_click) {
            return;
        }

        try {
            $mail->increment('clicks');
            
            $originalUrl = $request->query('url');
    
            if (!$originalUrl || !filter_var($originalUrl, FILTER_VALIDATE_URL)) {
                return response()->json(['error' => 'Invalid or missing URL'], 400);
            }
    
            return redirect()->away($originalUrl);
        } catch (\Exception $e) {
            Log::error("Error during tracking click: " . $e->getMessage());
            return response(null, 500);
        }
    }
}
