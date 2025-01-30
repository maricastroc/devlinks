<?php

namespace Database\Seeders;

use App\Models\EmailList;
use App\Models\Template;
use App\Models\Campaign;
use App\Models\User;
use Illuminate\Database\Seeder;

class CampaignSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 3; $i++) { 
            $emailList = EmailList::query()->inRandomOrder()->first();
            $template = Template::query()->inRandomOrder()->first();
            $user = User::query()->first();

            Campaign::factory()->create([
                'template_id' => $template->id,
                'email_list_id' => $emailList->id,
                'user_id' => $user->id,
                'deleted_at' => null,
            ]);
        }
    }
}
