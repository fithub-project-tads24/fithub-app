import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import { User, Calendar, Bell, LogOut, PlusCircle } from 'lucide-react';

const TelaPrincipal = () => {
    const navigate = useNavigate();
    const { user, isAdmin, logout } = useAuth();
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEventos();
    }, []);

    const fetchEventos = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/events', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEventos(response.data);
        } catch (error) {
            console.error("Erro ao buscar eventos");
        } finally {
            setLoading(false);
        }
    };

    // Lógica Unificada: Entrar ou Sair
    const handleEventAction = async (evento) => {
        const token = localStorage.getItem('token');
        const action = evento.is_registered ? 'leave' : 'join'; // Decide a ação baseada no estado atual
        const confirmMessage = evento.is_registered
            ? "Deseja cancelar sua inscrição neste evento?"
            : "Deseja se inscrever neste evento?";

        if (!confirm(confirmMessage)) return;

        try {
            await axios.post(`/api/events/${evento.id}/${action}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert(evento.is_registered ? "Inscrição cancelada." : "Inscrição realizada!");
            fetchEventos();
        } catch (error) {
            alert("Erro ao processar solicitação.");
        }
    };

    return (
        <div className="w-full min-h-screen bg-black text-white p-6 pb-24">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Olá, {user?.name?.split(' ')[0]} 👋</h1>
                    <p className="text-gray-400 text-sm">Vamos treinar hoje?</p>
                </div>
                {/* Botão Logout (canto superior) */}
                <button onClick={logout} className="p-2 bg-gray-800 rounded-full text-red-400 hover:bg-gray-700">
                    <LogOut size={20} />
                </button>
            </header>

            {/* MENU DE ACESSO RÁPIDO */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                    onClick={() => navigate('/profile')}
                    className="bg-gray-800 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-gray-700 transition"
                >
                    <div className="p-3 bg-purple-600/20 rounded-full text-purple-400">
                        <User size={24} />
                    </div>
                    <span className="font-semibold text-sm">Meu Perfil</span>
                </button>

                <button
                    onClick={() => navigate('/agendamento')}
                    className="bg-gray-800 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-gray-700 transition"
                >
                    <div className="p-3 bg-blue-600/20 rounded-full text-blue-400">
                        <Calendar size={24} />
                    </div>
                    <span className="font-semibold text-sm">Agendar</span>
                </button>

                <button
                    onClick={() => navigate('/notificacoes')}
                    className="bg-gray-800 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-gray-700 transition"
                >
                    <div className="p-3 bg-orange-600/20 rounded-full text-orange-400">
                        <Bell size={24} />
                    </div>
                    <span className="font-semibold text-sm">Avisos</span>
                </button>

                {isAdmin ? (
                    <button
                        onClick={() => navigate('/cadastro-eventos')}
                        className="bg-gray-800 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-gray-700 transition border border-purple-500/50"
                    >
                        <div className="p-3 bg-purple-600 rounded-full text-white">
                            <PlusCircle size={24} />
                        </div>
                        <span className="font-semibold text-sm text-purple-400">Criar Evento</span>
                    </button>
                ) : (
                    <div className="bg-gray-900 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border border-gray-800 opacity-50">
                        <span className="text-2xl font-bold">0</span>
                        <span className="text-xs text-gray-500">Treinos na semana</span>
                    </div>
                )}
            </div>

            {/* LISTA DE EVENTOS */}
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-purple-600 rounded-full"></span>
                Aulas Disponíveis
            </h2>

            {loading ? (
                <p className="text-gray-500 text-center py-10">Carregando aulas...</p>
            ) : (
                <div className="space-y-4">
                    {eventos.length === 0 && (
                        <div className="text-center py-8 bg-gray-900 rounded-xl border border-gray-800">
                            <p className="text-gray-400">Nenhuma aula agendada.</p>
                        </div>
                    )}

                    {eventos.map((evento) => (
                        <div key={evento.id} className="bg-gray-800 p-5 rounded-2xl border border-gray-700 shadow-lg relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500"></div>

                            <div className="ml-2">
                                <h3 className="text-lg font-bold text-white">{evento.titulo}</h3>
                                <p className="text-sm text-gray-400 mt-1 mb-3 line-clamp-2">{evento.descricao}</p>

                                <div className="flex flex-wrap gap-3 text-xs text-gray-300 mb-4">
                                    <span className="bg-gray-700 px-2 py-1 rounded">📅 {evento.data}</span>
                                    <span className="bg-gray-700 px-2 py-1 rounded">⏰ {evento.hora}</span>
                                    <span className="bg-gray-700 px-2 py-1 rounded">📍 {evento.local}</span>
                                </div>

                                {isAdmin ? (
                                    <div className="text-center text-xs text-gray-500 border-t border-gray-700 pt-2">
                                        Visualização de Admin
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleEventAction(evento)}
                                        className={`w-full py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
                                            evento.is_registered
                                            ? 'bg-red-600/20 text-red-500 border border-red-600/30 hover:bg-red-600/30'
                                            : 'bg-white text-black hover:bg-gray-200'
                                        }`}
                                    >
                                        {evento.is_registered ? 'CANCELAR INSCRIÇÃO ✕' : 'REGISTRAR-SE'}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TelaPrincipal;
