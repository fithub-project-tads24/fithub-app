<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();

            $table->date('booking_date');
            $table->string('status')->default('confirmado');

            $table->unsignedBigInteger('time_slots_id')->default(1);

            $table->foreignId('users_id')->constrained('users')->onDelete('cascade');

            $table->unsignedBigInteger('users_user_profiles_id')->nullable();
            $table->unsignedInteger('users_roles_id')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
