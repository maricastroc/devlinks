<?php

namespace App\Providers;

use App\Models\EmailList;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\Link;
use App\Models\Subscriber;
use App\Policies\EmailListPolicy;
use App\Policies\LinkPolicy;
use App\Policies\SubscriberPolicy;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        EmailList::class => EmailListPolicy::class,
        Subscriber::class => SubscriberPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
    }
}
