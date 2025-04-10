<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('user_links', function (Blueprint $table) {
            $table->unsignedBigInteger('clicks')->default(0);
        });
    }
    
    public function down(): void
    {
        Schema::table('user_links', function (Blueprint $table) {
            $table->dropColumn('clicks');
        });
    }
};
