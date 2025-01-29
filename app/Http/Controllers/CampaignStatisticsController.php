<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CampaignStatisticsController extends Controller
{
    public function __invoke(Campaign $campaign, Request $request)
    {
        $this->authorize('view', $campaign);

        $campaign->load('emailList', 'emailList.subscribers');

        $search = $request->query('search', '');
    
        $campaignMails = $campaign->mails()
            ->with('subscriber')
            ->filterBySubscriber($search)
            ->paginate(10)
            ->withQueryString();

        $statistics = $this->calculateStatistics($campaign);

        return Inertia::render('Dashboard/Show/Index', [
            'campaign' => $campaign,
            'campaignMails' => $campaignMails,
            'statistics' => $statistics,
        ]);
    }

    private function calculateStatistics(Campaign $campaign)
    {
        $totalEmails = $campaign->mails()->count();

        $totalOpens = $campaign->mails()->sum('opens');
        $totalClicks = $campaign->mails()->sum('clicks');

        $uniqueOpens = $this->calculateUnique($campaign, 'opens');
        $uniqueClicks = $this->calculateUnique($campaign, 'clicks');

        $openRate = $totalEmails = $campaign->mails()->count() > 0 ? ($uniqueOpens / $totalEmails) * 100 : 0;
        $clickRate = $totalEmails > 0 ? ($uniqueClicks / $totalEmails) * 100 : 0;

        return [
            'total_emails' => $totalEmails,
            'total_opens' => $totalOpens,
            'total_clicks' => $totalClicks,
            'unique_opens' => $uniqueOpens,
            'unique_clicks' => $uniqueClicks,
            'open_rate' => number_format($openRate, 2) . '%',
            'click_rate' => number_format($clickRate, 2) . '%',
        ];
    }

    private function calculateUnique(Campaign $campaign, string $column)
    {
        return $campaign->mails()
            ->where($column, '>', 0)
            ->distinct('subscriber_id')
            ->count();
    }
}
