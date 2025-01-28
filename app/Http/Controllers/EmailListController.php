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
        $this->authorize('viewAny', EmailList::class);

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
            ->paginate(10);

        return Inertia::render('EmailLists/Index', [
            'emailLists' => $emailLists,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', EmailList::class);

        return Inertia::render('EmailLists/Form');
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
        $this->authorize('view', $list);

        $search = $request->query('search', '');
        $withTrashed = $request->query('withTrashed', false);
    
        $subscribersQuery = $list->subscribers();
    
        if ($withTrashed) {
            $subscribersQuery->withTrashed();
        }
    
        $subscribers = $subscribersQuery
            ->search($search)
            ->paginate(10);
    
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
        $this->authorize('edit', $list);

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
        $this->authorize('update', $list);

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
        $this->authorize('delete', $list);

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

    public function restore(EmailList $list)
    {
        if (!$list) {
            return response()->json([
                'message' => 'List not found.',
            ], 404);
        }
    
        if (!$list->trashed()) {
            return response()->json([
                'message' => 'This list is not deleted.',
            ], 400);
        }
    
        $this->authorize('restore', $list);
    
        try {
            $list->restore();
    
            return response()->json([
                'message' => 'List successfully restored!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to restore list. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
