<?php

namespace App\Providers;

use App\Models\EmailList;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\Campaign;
use App\Models\CampaignMail;
use App\Models\Subscriber;
use App\Models\Template;
use App\Policies\CampaignPolicy;
use App\Policies\EmailListPolicy;
use App\Policies\SubscriberPolicy;
use App\Policies\TemplatePolicy;

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
        Template::class => TemplatePolicy::class,
        Campaign::class => CampaignPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
    }
}
