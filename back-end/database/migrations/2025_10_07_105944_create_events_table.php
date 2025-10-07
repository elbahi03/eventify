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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->date('date');
            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();
            $table->string('location')->nullable();
            $table->string('type')->nullable();  // presionciel, online
            $table->string('categorie')->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');   // id organisateur
            $table->integer('capacity')->nullable();
            $table->enum('status', ["prévu", "en cours", "terminé", "annulé"]); // prévu, en cours, terminé, annulé
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
