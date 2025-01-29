<?php

namespace App\Http\Controllers;

use App\Http\Requests\CampaignRequest;
use App\Http\Requests\UpdateCampaignRequest;
use App\Jobs\SendEmailsCampaignJob;
use App\Models\Campaign;
use App\Services\EmailService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CampaignController extends Controller
{
    protected $emailService;

    public function __construct(EmailService $emailService)
    {
        $this->emailService = $emailService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $this->authorize('viewAny', Campaign::class);

        $search = $request->query('search', '');
        $withTrashed = $request->query('withTrashed', false);

        $campaignsQuery = $user->campaigns()
            ->search($search);
    
        if ($withTrashed) {
            $campaignsQuery->withTrashed();
        }

        $campaigns = $campaignsQuery
            ->with('emailList', 'template')
            ->orderBy('id', 'asc')
            ->paginate(10);

        return Inertia::render('Dashboard/Index', [
            'campaigns' => $campaigns,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $this->authorize('create', Campaign::class);

        $user = $request->user();

        $emailLists = $user->emailLists()->with('subscribers')->get();
        $templates = $user->templates()->with('user:id,name,email')->get();

        return Inertia::render('Dashboard/Form', [
            'emailLists' => $emailLists,
            'templates' => $templates,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CampaignRequest $request)
    {
        try {
            $data = $request->validated();

            if (isset($data['send_at'])) {
                $data['send_at'] = Carbon::parse($data['send_at'])->setTimezone('America/Sao_Paulo');
            }

            if ($request->step === 3) {
                $campaign = Campaign::create($data);

                if (isset($request->draft_mode) && !$request->draft_mode) {
                    try {
                        $campaign->update(['status' => Campaign::STATUS_SCHEDULED]);

                        SendEmailsCampaignJob::dispatch($campaign)->delay($data['send_at']);
    
                        return response()->json([
                            'message' => 'Emails sent successfully!',
                        ], 200);
                    } catch (\Exception $e) {
                        return response()->json([
                            'message' => 'Failed to send emails. Please try again later.',
                        ], 500);
                    }
                }

                return response()->json([
                    'message' => 'Campaign draft successfully created!',
                ], 200);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create campaign. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Campaign $campaign, Request $request)
    {
        $this->authorize('show', $campaign);

        $search = $request->query('search', '');
        $withTrashed = $request->query('withTrashed', false);
    
        $campaignsQuery = $campaign->subscribers();
    
        if ($withTrashed) {
            $campaignsQuery->withTrashed();
        }
    
        $campaigns = $campaignsQuery
            ->search($search)
            ->paginate(10);
    
        return Inertia::render('Dashboard/Show', [
            'campaigns' => $campaigns,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Campaign $campaign)
    {
        $this->authorize('edit', $campaign);

        $user = $request->user();

        $emailLists = $user->emailLists()->with('subscribers')->get();
        $templates = $user->templates()->with('user:id,name,email')->get();

        return Inertia::render('Dashboard/Form', [
            'campaign' => $campaign,
            'emailLists' => $emailLists,
            'templates' => $templates,
            'isEdit' => true,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCampaignRequest $request, Campaign $campaign)
    {
        try {
            $data = $request->validated();

            if (isset($data['send_at'])) {
                $data['send_at'] = Carbon::parse($data['send_at'])->setTimezone('America/Sao_Paulo');
            }

            if ($request->step === 3) {
                $campaign->update($data);

                if (isset($request->draft_mode) && !$request->draft_mode) {
                    try {
                        $campaign->update(['status' => Campaign::STATUS_SCHEDULED]);
                        
                        SendEmailsCampaignJob::dispatch($campaign)->delay($data['send_at']);
    
                        return response()->json([
                            'message' => 'Emails sent successfully!',
                        ], 200);
                    } catch (\Exception $e) {
                        return response()->json([
                            'message' => 'Failed to send emails. Please try again later.',
                        ], 500);
                    }
                }

                return response()->json([
                    'message' => 'Campaign draft successfully updated!',
                ], 200);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update campaign. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Campaign $campaign)
    {
        $this->authorize('delete', $campaign);

        try {
            $campaign->delete();
    
            return response()->json([
                'message' => 'Campaign successfully deleted!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete campaign. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function restore(Campaign $campaign)
    {
        if (!$campaign) {
            return response()->json([
                'message' => 'Campaign not found.',
            ], 404);
        }
    
        if (!$campaign->trashed()) {
            return response()->json([
                'message' => 'This campaign is not deleted.',
            ], 400);
        }
    
        $this->authorize('restore', $campaign);
    
        try {
            $campaign->restore();
    
            return response()->json([
                'message' => 'Campaign successfully restored!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to restore campaign. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
