<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmailListRequest;
use App\Http\Requests\UpdateEmailListRequest;
use App\Models\EmailList;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmailListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $search = $request->query('search', '');
        $withTrashed = $request->query('withTrashed', false);

        $emailListsQuery = $user->emailLists()
        ->search($search);
    
        if ($withTrashed) {
            $emailListsQuery->withTrashed();
        }

        $emailLists = $emailListsQuery->with('subscribers')
            ->orderBy('created_at', 'asc')
            ->paginate(7);

        return Inertia::render('EmailLists/Index', [
            'emailLists' => $emailLists,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('EmailLists/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EmailListRequest $request)
    {
        try {
            $userId = auth()->id();
            
            $data = $request->validated();
            
            EmailList::createList($data, $userId);
            
            return response()->json([
                'message' => 'List successfully created!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create list. Please try again later.',
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
        return Inertia::render('EmailLists/Edit', [
            'emailList' => $list,
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
