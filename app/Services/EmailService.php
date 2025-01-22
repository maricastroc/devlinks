<?php

namespace App\Services;

use App\Mail\EmailCampaign;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;

class EmailService
{
    public function sendCampaignEmails($campaign)
    {
        $emailList = $campaign->emailList; 

        if ($emailList && $emailList->subscribers) {
            foreach ($emailList->subscribers as $subscriber) {
                Mail::to($subscriber->email)->later(
                    $campaign->send_at,
                    new EmailCampaign($campaign)
                );
            }
        }
    }

    public function sendTestEmail($campaign, $email)
    {
        Mail::to($email)->send(new EmailCampaign($campaign));
    }
}