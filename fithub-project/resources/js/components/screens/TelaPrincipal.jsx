import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';

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
            console.error("Erro ao buscar eventos", error);
        } finally {
            setLoading(false);
        }
    };

    const handleJoin = async (eventId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`/api/events/${eventId}/join`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Inscrição realizada com sucesso!");
            fetchEventos(); // Recarrega a lista para atualizar o botão
        } catch (error) {
            alert("Erro ao se inscrever.");
        }
    };

    return (
        <div className="w-full h-full bg-gray-900 text-white overflow-y-auto p-6 pb-24">
            <header className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Olá, {user?.name || 'Visitante'}</h1>
                    <p className="text-gray-400 text-sm">Bem-vindo ao FithHub</p>
                </div>
                <button onClick={logout} className="text-red-400 text-sm font-semibold">Sair</button>
            </header>

            {/* SEÇÃO EXCLUSIVA DE ADMIN: Criar Evento */}
            {isAdmin && (
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/cadastro-eventos')}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-4 rounded-xl font-bold text-lg shadow-lg hover:opacity-90 transition"
                    >
                        + CRIAR NOVO EVENTO
                    </button>
                </div>
            )}

            {/* LISTA DE EVENTOS */}
            <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Eventos Disponíveis</h2>

            {loading ? <p>Carregando...</p> : (
                <div className="space-y-4">
                    {eventos.length === 0 && <p className="text-gray-500">Nenhum evento encontrado.</p>}

                    {eventos.map((evento) => (
                        <div key={evento.id} className="bg-gray-800 p-5 rounded-2xl border border-gray-700 shadow-md">
                            <h3 className="text-lg font-bold text-purple-400">{evento.titulo}</h3>
                            <p className="text-sm text-gray-300 mt-1 mb-2">{evento.descricao}</p>

                            <div className="flex justify-between text-xs text-gray-400 mb-4">
                                <span>📅 {evento.data} às {evento.hora}</span>
                                <span>📍 {evento.local}</span>
                            </div>

                            {/* Botão de Ação: Se Admin (Ver Detalhes) / Se User (Participar) */}
                            {isAdmin ? (
                                <button className="w-full bg-gray-700 text-gray-300 py-2 rounded-lg text-xs cursor-default">
                                    Visualização de Admin
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleJoin(evento.id)}
                                    disabled={evento.is_registered}
                                    className={`w-full py-3 rounded-xl font-bold transition ${
                                        evento.is_registered
                                        ? 'bg-green-600/20 text-green-500 cursor-default'
                                        : 'bg-white text-black hover:bg-gray-200'
                                    }`}
                                >
                                    {evento.is_registered ? 'VOCÊ JÁ ESTÁ INSCRITO ✅' : 'PARTICIPAR AGORA'}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className="h-20"></div>
        </div>
    );
};

export default TelaPrincipal;
