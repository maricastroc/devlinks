<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('platforms', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('icon_url');
            $table->string('color');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('platforms');
    }
};