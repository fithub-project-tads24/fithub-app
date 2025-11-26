<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    // Listar todos os eventos (Para Alunos e Admins)
    public function index()
    {
        return Event::with('participants')->get();
    }

    // Criar evento (Apenas Admin)
    public function store(Request $request)
    {
        // Validação simples para MVP
        $data = $request->validate([
            'titulo' => 'required',
            'descricao' => 'required',
            'data' => 'required',
            'hora' => 'required',
            'local' => 'required',
        ]);

        $data['created_by'] = Auth::id();
        $event = Event::create($data);

        return response()->json($event, 201);
    }

    // Inscrever-se no evento (Para Alunos)
    public function join($id)
    {
        $event = Event::findOrFail($id);
        $user = Auth::user();

        // Evitar duplicação
        if (!$event->participants()->where('user_id', $user->id)->exists()) {
            $event->participants()->attach($user->id);
            return response()->json(['message' => 'Inscrição realizada com sucesso!']);
        }

        return response()->json(['message' => 'Você já está inscrito.'], 400);
    }
}
