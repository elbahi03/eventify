<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\EventsController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [RegisteredUserController::class, 'store']);

Route::post('/login', [AuthenticatedSessionController::class, 'store']);

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum');

// Routes pour les events

Route::get('/events', [EventsController::class, 'index']); // Tous les événements
Route::get('/events/{id}', [EventsController::class, 'show']); // Un seul événement
Route::get('/events/category/{category}', [EventsController::class, 'searchByCategory']); // Par catégorie
Route::get('/events/type/{type}', [EventsController::class, 'searchByType']); // Par type
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/cree-event', [EventsController::class, 'store']); // Créer un event
    Route::put('/events/{id}', [EventsController::class, 'update']); // Modifier un event
    Route::delete('/events/{id}', [EventsController::class, 'destroy']); // Supprimer un event
    Route::get('/events/user/{userId}', [EventsController::class, 'getUserEvents']); // Événements par utilisateur
});