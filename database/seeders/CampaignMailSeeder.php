<?php

namespace Database\Seeders;

use App\Models\Campaign;
use App\Models\CampaignMail;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CampaignMailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Campaign::query()->with('emailList', 'emailList.subscribers')->get()
            ->each(function (Campaign $campaign) {
                foreach ($campaign->emailList->subscribers as $subscriber) {
                    CampaignMail::factory()->create([
                        'campaign_id' => $campaign->id,
                        'subscriber_id' => $subscriber->id,
                        'send_at' => $campaign->send_at,
                    ]);
                }
            });
    }
}
