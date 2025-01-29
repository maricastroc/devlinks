<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CampaignMail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;

class EmailTrackingController extends Controller
{
    public function trackOpening(CampaignMail $mail)
    {
        try {
            Log::info('Tracking open for CampaignMail ID: ' . $mail->id);  // Verifique se o ID é o esperado
    
            $mail->increment('opens');
        
            Log::info("E-mail opened!", ['campaign_mail_id' => $mail->id]);
        
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
}
