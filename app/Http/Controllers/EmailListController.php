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

        $emailLists = $user->emailLists()
            ->search($search)
            ->with('subscribers')
            ->orderBy('created_at', 'asc')
            ->get();

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
                'redirect' => route('lists'),
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
    public function show(EmailList $emailList, Request $request)
    {
        $search = $request->query('search', '');

        $subscribers = $emailList->subscribers()
            ->search($search)
            ->paginate(7);
    
        return Inertia::render('EmailLists/Show', [
            'emailList' => $emailList,
            'subscribers' => $subscribers,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EmailList $emailList)
    {
        return Inertia::render('EmailLists/Edit', [
            'emailList' => $emailList,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmailListRequest $request, EmailList $emailList)
    {
        try {
            $data = $request->validated();
            $emailList->update($data);
    
            return response()->json([
                'redirect' => route('lists'),
                'message' => 'List successfully updated!',
                'list' => $emailList,
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
    public function destroy(EmailList $list) // Alterado para EmailList
    {
        //
    }
}
