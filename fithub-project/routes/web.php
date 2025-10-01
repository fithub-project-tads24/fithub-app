<?php

use Illuminate\Support\Facades\Route;

// Carrega a view 'app' para a rota raiz
Route::get('/', function () {
    return view('app');
});

// "Catch-all" Route: Para qualquer outra rota que não seja uma API,
// também carrega a view 'app'. Isso permite que o React Router
// gerencie as URLs do frontend (ex: /login, /register, etc.).
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
