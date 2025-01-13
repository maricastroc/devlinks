<?php

namespace App\Http\Controllers;

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
}
