import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Trash2 } from 'lucide-react';

const AgendamentoScreen = () => {
  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [meusAgendamentos, setMeusAgendamentos] = useState([]);

  const horariosDisponiveis = ["06:00", "07:00", "08:00", "09:00", "17:00", "18:00", "19:00", "20:00"];

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  const fetchAgendamentos = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/bookings', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setMeusAgendamentos(res.data);
    } catch (error) {
        console.error("Erro ao buscar agendamentos");
    }
  };

  const handleAgendar = async () => {
    if (!data || !hora) return alert("Selecione data e hora!");

    try {
        const token = localStorage.getItem('token');
        await axios.post('/api/bookings', {
            data: data,
            hora_inicio: hora
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        alert("Agendamento confirmado!");
        fetchAgendamentos();
    } catch (error) {
        const msg = error.response?.data?.message || "Erro ao agendar.";
        alert(`Atenção: ${msg}`);
    }
};

  const handleCancelar = async (id) => {
      if(!confirm("Deseja cancelar?")) return;
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/bookings/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchAgendamentos();
      } catch (error) {
          alert("Erro ao cancelar.");
      }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24">
      <header className="flex items-center mb-6">
        <button onClick={() => navigate('/tela-principal')} className="p-2 bg-gray-800 rounded-full mr-4">
            <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Agendar Treino</h1>
      </header>

      {/* Formulário */}
      <div className="space-y-4 mb-8">
        <div>
            <label className="block text-gray-400 mb-2">Data</label>
            <input
                type="date"
                className="w-full bg-gray-900 border border-gray-700 p-3 rounded-xl"
                value={data}
                onChange={(e) => setData(e.target.value)}
            />
        </div>

        <div>
            <label className="block text-gray-400 mb-2">Horário Disponível</label>
            <div className="grid grid-cols-4 gap-2">
                {horariosDisponiveis.map(h => (
                    <button
                        key={h}
                        onClick={() => setHora(h)}
                        className={`p-2 rounded-lg text-sm font-bold ${
                            hora === h ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400'
                        }`}
                    >
                        {h}
                    </button>
                ))}
            </div>
        </div>

        <button
            onClick={handleAgendar}
            className="w-full bg-white text-black font-bold py-3 rounded-xl mt-4 hover:bg-gray-200"
        >
            CONFIRMAR AGENDAMENTO
        </button>
      </div>

      {/* Lista de Agendamentos */}
      <h2 className="text-lg font-bold border-b border-gray-800 pb-2 mb-4">Meus Agendamentos</h2>
      <div className="space-y-3">
          {meusAgendamentos.length === 0 && <p className="text-gray-500 text-sm">Nenhum treino agendado.</p>}

          {meusAgendamentos.map(booking => (
              <div key={booking.id} className="bg-gray-900 p-4 rounded-xl flex justify-between items-center border border-gray-800">
                  <div>
                      <p className="font-bold text-purple-400">Musculação</p>
                      <p className="text-sm text-gray-300">{booking.data} às {booking.hora_inicio}</p>
                  </div>
                  <button
                    onClick={() => handleCancelar(booking.id)}
                    className="text-red-500 p-2 hover:bg-red-500/10 rounded-full"
                  >
                      <Trash2 size={18} />
                  </button>
              </div>
          ))}
      </div>
    </div>
  );
};

export default AgendamentoScreen;
