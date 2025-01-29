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
        $mail = $campaign->mails()->first();

        if ($emailList && $emailList->subscribers) {
            foreach ($emailList->subscribers as $subscriber) {
                Mail::to($subscriber->email)->later(
                    $campaign->send_at,
                    new EmailCampaign($campaign, $mail)
                );
            }
        }
    }

    public function sendTestEmail($campaign, $email)
    {
        $mail = $campaign->mails()->first();
        
        Mail::to($email)->send(new EmailCampaign($campaign, $mail));
    }
}