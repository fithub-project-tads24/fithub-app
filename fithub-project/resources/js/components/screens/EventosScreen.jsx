import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';

const EventosScreen = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        titulo: '',
        descricao: '',
        data: '',
        hora: '',
        local: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/events', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Evento criado com sucesso!");
            navigate('/tela-principal');
        } catch (error) {
            console.error(error);
            alert("Erro ao criar evento. Verifique os dados.");
        }
    };

    return (
        <div className="bg-black min-h-screen text-white p-6 pb-24">
            <header className="flex items-center mb-6">
                <button onClick={() => navigate(-1)} className="p-2 bg-gray-800 rounded-full mr-4">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold">Novo Evento</h1>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Título do Evento</label>
                    <input
                        type="text" name="titulo" required
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 focus:border-purple-500 outline-none"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1">Descrição</label>
                    <textarea
                        name="descricao" rows="3" required
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 focus:border-purple-500 outline-none"
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="flex gap-4">
                    <div className="w-1/2">
                        <label className="block text-sm text-gray-400 mb-1">Data</label>
                        <input
                            type="date" name="data" required
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 outline-none"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-sm text-gray-400 mb-1">Horário</label>
                        <input
                            type="time" name="hora" required
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 outline-none"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1">Local</label>
                    <input
                        type="text" name="local" placeholder="Ex: Quadra 2, Sala de Espelhos..." required
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 outline-none"
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl mt-6 shadow-lg transition"
                >
                    PUBLICAR EVENTO
                </button>
            </form>
        </div>
    );
};

export default EventosScreen;
