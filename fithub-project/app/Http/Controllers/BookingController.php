<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    // Listar agendamentos do usuário logado
    public function index()
    {
        return Booking::where('users_id', Auth::id())
            ->where('data', '>=', now()->toDateString())
            ->orderBy('data')
            ->orderBy('hora_inicio')
            ->get();
    }

    // Criar novo agendamento
    public function store(Request $request)
    {
        $request->validate([
            'data' => 'required|date|after_or_equal:today',
            'hora_inicio' => 'required', // Formato HH:MM
        ]);

        // Verificação simples de duplicidade (RN01 - evitar sobreposição do próprio usuário)
        $exists = Booking::where('users_id', Auth::id())
            ->where('data', $request->data)
            ->where('hora_inicio', $request->hora_inicio)
            ->where('status', 'confirmado')
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'Você já possui agendamento neste horário.'], 400);
        }

        $booking = Booking::create([
            'users_id' => Auth::id(),
            'data' => $request->data,
            'hora_inicio' => $request->hora_inicio,
            'status' => 'confirmado'
        ]);

        return response()->json($booking, 201);
    }

    // Cancelar agendamento (RN03 Simplificada)
    public function destroy($id)
    {
        $booking = Booking::where('users_id', Auth::id())->where('id', $id)->firstOrFail();
        $booking->delete(); // Ou mudar status para 'cancelado'
        return response()->json(['message' => 'Agendamento cancelado.']);
    }
}
