<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('restrictions', function (Blueprint $table) {
            $table->id();
            $table->string('reason', 255)->nullable();
            $table->timestamp('expiration_date');

            $table->foreignId('users_id')->nullable()->constrained('users');

            $table->unsignedBigInteger('users_user_profiles_id')->nullable();
            $table->unsignedInteger('users_roles_id')->nullable();

            $table->timestamps();

            $table->foreign('users_user_profiles_id', 'fk_restr_user_profiles')
                  ->references('id')->on('user_profiles')
                  ->onDelete('no action');

            $table->foreign('users_roles_id', 'fk_restr_roles')
                  ->references('id')->on('roles')
                  ->onDelete('no action');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('restrictions');
    }
};
