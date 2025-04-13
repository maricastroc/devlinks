<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ThemeSeeder extends Seeder {
    public function run() {
        DB::table('themes')->insert([
            [
                'name' => 'Default',
                'slug' => 'default',
                'styles' => json_encode([
                    'color' => '#633CFF',
                    'background' => 'bg-light-gray',
                    'button' => 'text-white md:text-[#633CFF]',
                    'primary_text' => 'text-dark-gray',
                    'secondary_text' => 'text-medium-gray',
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Lavender',
                'slug' => 'lavender',
                'styles' => json_encode([
                    'color' => '#72659B',
                    'background' => 'bg-gradient-to-b from-[#72659B] to-[#EBA3AC] text-[#342B51]',
                    'button' => 'text-[#ffffff] hover:bg-[#5E4E8B]',
                    'primary_text' => 'text-[#FFFFFF]',
                    'secondary_text' => 'text-[#FFFFFF]',
                    'link_card' => '#5E4E8B',
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Midnight',
                'slug' => 'midnight',
                'styles' => json_encode([
                    'color' => '#C54D48',
                    'background' => 'bg-gradient-to-b from-[#C54D48] via-[#383952] to-[#21303D] text-[#1C2431]',
                    'button' => 'text-[#ffffff] hover:bg-[#C74C48]',
                    'primary_text' => 'text-[#FFFFFF]',
                    'secondary_text' => 'text-[#FFFFFF]',
                    'link_card' => '#C74C48',
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Serenity',
                'slug' => 'serenity',
                'styles' => json_encode([
                    'color' => '#C55A48',
                    'background' => 'bg-gradient-to-b from-[#C57248] via-[#4E4848] to-[#2D2D37] text-[#1C2431]',
                    'button' => 'text-[#ffffff] hover:bg-[#C55A48]',
                    'primary_text' => 'text-[#FFFFFF]',
                    'secondary_text' => 'text-[#FFFFFF]',
                    'link_card' => '#C55A48',
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Ocean',
                'slug' => 'ocean',
                'styles' => json_encode([
                    'color' => '#478EA9',
                    'background' => 'bg-gradient-to-b from-[#478EA9] via-[#C99F9A] to-[#E29042] text-[#1C2431]',
                    'button' => 'text-[#ffffff] hover:bg-[#2A5F7A]',
                    'primary_text' => 'text-[#1C2431]',
                    'secondary_text' => 'text-[#1C2431]',
                    'link_card' => '#2A5F7A',
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Gradient',
                'slug' => 'gradient',
                'styles' => json_encode([
                    'color' => '#EAB560',
                    'background' => 'bg-gradient-to-b from-[#C15757] via-[#FFBE57] to-[#3E8E9C] text-[#2B3D40]',
                    'button' => 'text-[#ffffff] hover:bg-[#2A5F7A]',
                    'primary_text' => 'text-[#2B3D40]',
                    'secondary_text' => 'text-[#2B3D40]',
                    'link_card' => 'rgba(42, 95, 122, 0.85)',
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
