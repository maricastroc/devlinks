<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('template')->default('Default')->change();
        });

        DB::table('users')->where('template', 'default')->update(['template' => 'Default']);
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('template')->default('default')->change();
        });

        DB::table('users')->where('template', 'Default')->update(['template' => 'default']);
    }
};