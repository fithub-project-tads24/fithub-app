<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    public function index()
    {
        // Retorna eventos e verifica se o usuário atual (Auth::id()) está na lista de participantes
        $events = Event::with('participants')->get()->map(function ($event) {
            $event->is_registered = $event->participants->contains(Auth::id());
            return $event;
        });

        return response()->json($events);
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string',
            'descricao' => 'required|string',
            'data' => 'required',
            'hora' => 'required',
            'local' => 'required',
        ]);

        $event = Event::create([
            'titulo' => $request->titulo,
            'descricao' => $request->descricao,
            'data' => $request->data,
            'hora' => $request->hora,
            'local' => $request->local,
            'created_by' => Auth::id(), // Pega o ID do Admin logado
        ]);

        return response()->json($event, 201);
    }

    public function join($id)
    {
        $event = Event::findOrFail($id);
        $userId = Auth::id();

        // Verifica se já está inscrito para evitar duplicidade
        if (!$event->participants()->where('user_id', $userId)->exists()) {
            $event->participants()->attach($userId);
            return response()->json(['message' => 'Inscrição realizada!', 'success' => true]);
        }

        return response()->json(['message' => 'Você já está inscrito neste evento.', 'success' => false], 400);
    }
}
