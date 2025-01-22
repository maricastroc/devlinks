<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Log;
use App\Mail\EmailCampaign;
use App\Models\Campaign;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendEmailCampaign implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(public Campaign $campaign) {}

    public function handle(): void
    {
        $this->campaign = Campaign::find($this->campaign->id);

        if (!$this->campaign) {
            Log::error("Campaign not found. ID: {$this->campaign->id}");
            return;
        }

        if ($this->campaign->status === Campaign::STATUS_SENT) {
            Log::info("Campaign already marked as sent. Skipping email dispatch.", [
                'campaign_id' => $this->campaign->id,
            ]);
            return;
        }

        $emailList = $this->campaign->emailList;

        if ($emailList && $emailList->subscribers) {
            foreach ($emailList->subscribers as $subscriber) {
                try {
                    Mail::to($subscriber->email)->send(new EmailCampaign($this->campaign));
                } catch (\Exception $e) {
                    Log::error("Failed to send email to {$subscriber->email}: {$e->getMessage()}");
                }
            }
        }

        try {
            $this->campaign->update(['status' => Campaign::STATUS_SENT]);
            Log::info('Campaign status updated.', [
                'campaign_id' => $this->campaign->id,
                'new_status' => $this->campaign->status,
            ]);
        } catch (\Exception $e) {
            Log::error("Failed to update campaign status to 'sent': {$e->getMessage()}");
        }
    }
}
