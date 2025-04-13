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
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('theme_id')
                ->nullable()
                ->constrained('themes')
                ->onDelete('SET NULL');
        });

        $defaultTheme = DB::table('themes')->where('slug', 'default')->first();
        
if ($defaultTheme) {
    DB::table('users')->update(['theme_id' => $defaultTheme->id]);
}
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['theme_id']);
            $table->dropColumn('theme_id');
        });
    }
};