<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubscriberRequest;
use App\Models\Subscriber;
use App\Models\EmailList;
use Inertia\Inertia;

class SubscriberController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(EmailList $emailList)
    {
        return Inertia::render('EmailLists/AddSubscriber', [
          'emailList' => $emailList,
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
    public function edit(EmailList $emailList, Subscriber $subscriber)
    {
        return Inertia::render('EmailLists/EditSubscriber', [
            'emailList' => $emailList,
            'subscriber' => $subscriber,
        ]);
    }
}
