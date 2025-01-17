<?php

namespace App\Http\Controllers;

use App\Http\Requests\CampaignRequest;
use App\Http\Requests\EmailListRequest;
use App\Http\Requests\UpdateEmailListRequest;
use App\Models\Campaign;
use App\Models\EmailList;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CampaignController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

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
            ->paginate(7);

        return Inertia::render('Dashboard/Index', [
            'campaigns' => $campaigns,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
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
            $userId = auth()->id();
            
            $data = $request->validated();

            $data['user_id'] = $userId;

            if ($request->step === 3) {
                Campaign::create($data);

                return response()->json([
                    'message' => 'Campaign successfully created!',
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
    public function show(EmailList $list, Request $request)
    {
        $search = $request->query('search', '');
        $withTrashed = $request->query('withTrashed', false);
    
        $subscribersQuery = $list->subscribers();
    
        if ($withTrashed) {
            $subscribersQuery->withTrashed();
        }
    
        $subscribers = $subscribersQuery
            ->search($search)
            ->paginate(7);
    
        return Inertia::render('EmailLists/Show', [
            'emailList' => $list,
            'subscribers' => $subscribers,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EmailList $list)
    {
        return Inertia::render('EmailLists/Form', [
            'emailList' => $list,
            'isEdit' => true,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmailListRequest $request, EmailList $list)
    {
        try {
            $data = $request->validated();
            $list->update($data);
    
            return response()->json([
                'message' => 'List successfully updated!',
                'list' => $list,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while updating the list.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EmailList $list)
    {
        try {
            $list->delete();
    
            return response()->json([
                'message' => 'List successfully deleted!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete list. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
