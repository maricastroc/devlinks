<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Log;
use App\Mail\EmailCampaign;
use App\Models\Campaign;
use App\Models\CampaignMail;
use App\Models\Subscriber;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendEmailCampaignJob implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public Campaign $campaign,
        public Subscriber $subscriber
    ) {}

    public function handle(): void
    {
        try {
            Mail::to($this->subscriber->email)->send(new EmailCampaign($this->campaign));
            
            CampaignMail::query()->create([
                'campaign_id' => $this->campaign->id,
                'subscriber_id' => $this->subscriber->id,
                'send_at' => $this->campaign->send_at,
            ]);
        } catch (\Exception $e) {
            Log::error("Failed to send email to {$this->subscriber->email}: {$e->getMessage()}");
        }
    }
}
