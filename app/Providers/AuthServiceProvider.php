<?php

namespace App\Providers;

use App\Models\UserLink;
use App\Policies\UserLinkPolicy;
use App\Models\SocialLink;
use App\Policies\SocialLinkPolicy;
use Illuminate\Support\Facades\URL;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        UserLink::class => UserLinkPolicy::class,
        SocialLink::class => SocialLinkPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        if (app()->environment('production')) {
            URL::forceScheme('https');
        }
    }
}
