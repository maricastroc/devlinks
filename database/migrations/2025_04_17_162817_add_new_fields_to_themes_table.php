<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('themes', function (Blueprint $table) {
            $table->boolean('is_custom')->default(false)->after('styles');
            $table->foreignId('user_id')->nullable()->constrained('users')->after('is_custom');
        });
    }

    public function down()
    {
        Schema::table('themes', function (Blueprint $table) {
            $table->dropColumn(['is_custom', 'user_id']);
        });
    }
};
