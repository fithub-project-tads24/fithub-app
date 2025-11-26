<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Restriction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class BookingController extends Controller
{
    public function index()
    {
        return Booking::where('users_id', Auth::id())
            ->where('booking_date', '>=', now()->toDateString())
            ->orderBy('booking_date')
            ->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'data' => 'required|date|after_or_equal:today',
            'hora_inicio' => 'required',
        ]);

        $user = Auth::user();

        $restricao = Restriction::where('users_id', $user->id)
            ->where('expiration_date', '>', now())
            ->first();

        if ($restricao) {
            return response()->json([
                'message' => 'Você está temporariamente impedido de agendar.',
                'reason' => $restricao->reason,
                'expires_at' => $restricao->expiration_date->format('d/m/Y H:i')
            ], 403);
        }

        $minuto = Carbon::parse($request->hora_inicio)->format('i');
        if (!in_array($minuto, ['00', '30'])) {
            return response()->json(['message' => 'Horários permitidos apenas em intervalos de 30 min.'], 422);
        }

        $inicioSemana = Carbon::parse($request->data)->startOfWeek();
        $fimSemana = Carbon::parse($request->data)->endOfWeek();

        $countSemana = Booking::where('users_id', $user->id)
            ->whereBetween('booking_date', [$inicioSemana, $fimSemana])
            ->where('status', 'confirmado')
            ->count();

        if ($countSemana >= 4) {
            return response()->json(['message' => 'Limite semanal de 4 agendamentos atingido.'], 403);
        }

        $lotacao = Booking::where('booking_date', $request->data)
            ->where('status', 'confirmado')
            ->count();

        if ($lotacao >= 30) {
            return response()->json(['message' => 'Horário lotado.'], 409);
        }

        $booking = new Booking();
        $booking->booking_date = $request->data;
        $booking->time_slots_id = 1;
        $booking->status = 'confirmado';

        $booking->users_id = $user->id;
        $booking->users_user_profiles_id = $user->user_profiles_id;
        $booking->users_roles_id = $user->roles_id;

        $booking->save();

        return response()->json($booking, 201);
    }

    public function destroy($id)
    {
        $booking = Booking::where('users_id', Auth::id())->findOrFail($id);
        $user = Auth::user();

        $dataTreino = Carbon::parse($booking->booking_date);

        $agora = now();
        $diferencaMinutos = $agora->diffInMinutes($dataTreino, false);

        if ($diferencaMinutos < 30 && $diferencaMinutos > 0) {
            Restriction::create([
                'reason' => 'Cancelamento tardio (< 30min)',
                'expiration_date' => now()->addHours(24),

                'users_id' => $user->id,
                'users_user_profiles_id' => $user->user_profiles_id,
                'users_roles_id' => $user->roles_id
            ]);

            $booking->status = 'cancelado_tardio';
            $booking->save();

            return response()->json([
                'message' => 'Cancelamento tardio. Restrição de 24h aplicada.',
                'warning' => true
            ]);
        }

        $booking->delete();
        return response()->json(['message' => 'Agendamento cancelado.']);
    }
}
