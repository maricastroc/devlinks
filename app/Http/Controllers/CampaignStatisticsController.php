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
            ->when($search, function ($query) use ($search) {
                $query->whereHas('subscriber', function ($subQuery) use ($search) {
                    $subQuery->where('name', 'LIKE', "%{$search}%")
                            ->orWhere('email', 'LIKE', "%{$search}%");
                });
            })
            ->paginate(10)
            ->withQueryString();
    
        $totalEmails = $campaign->mails()->count();
    
        $totalOpens = $campaign->mails()->sum('opens');
        $totalClicks = $campaign->mails()->sum('clicks');
    
        $uniqueOpens = $campaign->mails()
            ->where('opens', '>', 0)
            ->distinct('subscriber_id')
            ->count();

        $uniqueClicks = $campaign->mails()
            ->where('clicks', '>', 0)
            ->distinct('subscriber_id')
            ->count();

        $openRate = $totalEmails > 0 ? ($uniqueOpens / $totalEmails) * 100 : 0;
        $clickRate = $totalEmails > 0 ? ($uniqueClicks / $totalEmails) * 100 : 0;
    
        return Inertia::render('Dashboard/Show/Index', [
            'campaign' => $campaign,
            'campaignMails' => $campaignMails,
            'statistics' => [
                'total_emails' => $totalEmails,
                'total_opens' => $totalOpens,
                'total_clicks' => $totalClicks,
                'unique_opens' => $uniqueOpens,
                'unique_clicks' => $uniqueClicks,
                'open_rate' => number_format($openRate, 2) . '%',
                'click_rate' => number_format($clickRate, 2) . '%',
            ],
        ]);
    }    
}