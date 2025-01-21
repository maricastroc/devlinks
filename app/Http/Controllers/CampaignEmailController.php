<?php

namespace App\Http\Controllers;

use App\Mail\TestCampaignMail;
use App\Models\Campaign;
use App\Services\EmailService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class CampaignEmailController extends Controller
{
    protected $emailService;

    public function __construct(EmailService $emailService)
    {
        $this->emailService = $emailService;
    }

    /**
     * Send emails for the specified campaign.
     */
    public function store(Campaign $campaign)
    {
        try {
            $this->emailService->sendCampaignEmails($campaign);

            return response()->json([
                'message' => 'Emails sent successfully!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to send emails. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Send a test email.
     */
    public function test(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'subject' => 'required|string|max:255',
            'body' => 'required|string',
        ]);

        try {
            Mail::to($request->email)->send(new TestCampaignMail($request->subject, $request->body));

            return response()->json([
                'message' => 'Test email sent successfully!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to send email. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}