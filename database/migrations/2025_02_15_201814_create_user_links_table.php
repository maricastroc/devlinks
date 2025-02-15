<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('user_links', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('platform_id')->constrained()->onDelete('cascade');
            $table->string('url');
            $table->timestamps();

            $table->unique(['user_id', 'platform_id']);
        });
    }

    public function down(): void {
        Schema::dropIfExists('user_links');
    }
};
