<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmailListRequest;
use App\Models\EmailList;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmailListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('EmailLists/Index');
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
    public function show(EmailList $list) // Alterado para EmailList
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EmailList $list) // Alterado para EmailList
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, EmailList $list) // Alterado para EmailList
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EmailList $list) // Alterado para EmailList
    {
        //
    }
}
