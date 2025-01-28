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

        $campaign = Campaign::with(['emailList' => function($query) {
            $query->with('subscribers');
        }])->findOrFail($campaign->id);

        $subscribers = $campaign->emailList->subscribers()->paginate(10);

        return Inertia::render('Dashboard/Show/Index', [
            'campaign' => $campaign,
            'subscribers' => $subscribers,
        ]);
    }
}