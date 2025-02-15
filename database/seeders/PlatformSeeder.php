<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Platform;

class PlatformSeeder extends Seeder {
    public function run() {
        $platforms = [
            ['name' => 'GitHub', 'icon_url' => 'icon-github.svg', 'color' => '#000000'],
            ['name' => 'Frontend Mentor', 'icon_url' => 'icon-frontend-mentor.svg', 'color' => '#ffffff'],
            ['name' => 'LinkedIn', 'icon_url' => 'icon-linkedin.svg', 'color' => '#326DFB'],
            ['name' => 'YouTube', 'icon_url' => 'icon-youtube.svg', 'color' => '#EC3C3F'],
            ['name' => 'Facebook', 'icon_url' => 'icon-facebook.svg', 'color' => '#2746AA'],
            ['name' => 'Dev.to', 'icon_url' => 'icon-devto.svg', 'color' => '#333333'],
            ['name' => 'Codewars', 'icon_url' => 'icon-codewars.svg', 'color' => '#891D50'],
            ['name' => 'freeCodeCamp', 'icon_url' => 'icon-freecodecamp.svg', 'color' => '#302566'],
            ['name' => 'GitLab', 'icon_url' => 'icon-gitlab.svg', 'color' => '#E94A30'],
            ['name' => 'Hashnode', 'icon_url' => 'icon-hashnode.svg', 'color' => '#0B39CE'],
            ['name' => 'Stack Overflow', 'icon_url' => 'icon-stack-overflow.svg', 'color' => '#EA711F'],
        ];

        foreach ($platforms as $platform) {
            Platform::updateOrCreate(['name' => $platform['name']], $platform);
        }
    }
}