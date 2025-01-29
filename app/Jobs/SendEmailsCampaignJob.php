<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Log;
use App\Models\Campaign;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\SerializesModels;

class SendEmailsCampaignJob implements ShouldQueue
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



        $emailList = $this->campaign->emailList;

        if ($emailList && $emailList->subscribers) {
            foreach ($emailList->subscribers as $subscriber) {
                SendEmailCampaignJob::dispatch($this->campaign, $subscriber);
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
