<?php

use Illuminate\Support\Facades\Route;

// Serve the React app for all routes that should be handled by React Router
Route::get('/{path?}', function () {
    return view('app');
})->where('path', '.*');
