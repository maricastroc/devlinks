<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubscriberRequest;
use App\Models\Subscriber;
use App\Models\EmailList;
use Illuminate\Database\Eloquent\SoftDeletes;
use Inertia\Inertia;

class SubscriberController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(EmailList $list)
    {
        $this->authorize('create', Subscriber::class);

        return Inertia::render('EmailLists/Subscribers/Form', [
            'emailList' => $list,
        ]);
    }

        /**
     * Store a newly created resource in storage.
     */
    public function store(SubscriberRequest $request)
    {
        try {
            $data = $request->validated();
            
            Subscriber::create($data);
            
            return response()->json([
                'message' => 'Subscriber successfully created!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create subscriber. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EmailList $list, Subscriber $subscriber)
    {
        $this->authorize('edit', $subscriber);

        return Inertia::render('EmailLists/Subscribers/Form', [
            'subscriber' => $subscriber,
            'isEdit' => true,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SubscriberRequest $request, EmailList $list, Subscriber $subscriber)
    {
        $this->authorize('update', $subscriber);

        try {
            $data = $request->validated();
            $subscriber->update($data);
    
            return response()->json([
                'message' => 'Subscriber successfully updated!',
                'subscriber' => $subscriber,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while updating the subscriber.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EmailList $list, Subscriber $subscriber)
    {
        $this->authorize('delete', $subscriber);

        try {
            $subscriber->delete();
    
            return response()->json([
                'message' => 'Subscriber successfully deleted!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete subscriber. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function restore(EmailList $list, $id)
    {
        $subscriber = Subscriber::withTrashed()->find($id);
    
        if (!$subscriber) {
            return response()->json([
                'message' => 'Subscriber not found.',
            ], 404);
        }
    
        if (!$subscriber->trashed()) {
            return response()->json([
                'message' => 'This subscriber is not deleted.',
            ], 400);
        }
    
        $this->authorize('restore', $subscriber);
    
        try {
            $subscriber->restore();
    
            return response()->json([
                'message' => 'Subscriber successfully restored!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to restore subscriber. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
