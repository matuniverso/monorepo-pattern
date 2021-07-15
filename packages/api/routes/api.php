<?php

use App\Http\Controllers\Auth\Login;
use App\Http\Controllers\Auth\Logout;
use App\Http\Controllers\Auth\Register;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::post('/login', Login::class);
    Route::post('/register', Register::class);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', Logout::class);
});
