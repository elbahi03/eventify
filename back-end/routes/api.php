<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\EventController;

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


// Event routes
Route::post('/events', [EventController::class, 'store'])->middleware('auth:sanctum');
Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{id}', [EventController::class, 'show']);
Route::get('/events/user/{userId}', [EventController::class, 'getUserEvents'])->middleware('auth:sanctum');
Route::get('/events/categorie/{categorie}', [EventController::class, 'searchByCategory']);
Route::put('/events/{id}', [EventController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/events/{id}', [EventController::class, 'destroy'])->middleware('auth:sanctum');
Route::get('/events/search/{title}', [EventController::class, 'searchByTitle']);
Route::get('/events/search/date-local/{local}', [EventController::class, 'searchByDateOrLocation']);
