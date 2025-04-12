<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('user_links', function (Blueprint $table) {
            $table->string('custom_name')->nullable()->after('url');
            $table->string('custom_icon')->nullable()->after('custom_name');
            $table->string('custom_color')->nullable()->after('custom_icon');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_links', function (Blueprint $table) {
            $table->dropColumn('custom_name');
            $table->dropColumn('custom_icon');
            $table->dropColumn('custom_color');
        });
    }
};
