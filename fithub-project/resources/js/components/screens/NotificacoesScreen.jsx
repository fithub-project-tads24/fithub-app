import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Trash2, Bell, AlertTriangle, Info, Calendar } from 'lucide-react';

const NotificacoesScreen = () => {
  const navigate = useNavigate();

  const [notificacoes, setNotificacoes] = useState([
    {
      id: 1,
      titulo: 'Vaga Liberada!',
      mensagem: 'Surgiu uma vaga na lista de espera para Musculação às 18:00. Confirme agora para garantir seu lugar.',
      tipo: 'sucesso',
      lida: false,
      hora: 'Agora mesmo'
    },
    {
      id: 2,
      titulo: 'Restrição Aplicada',
      mensagem: 'Você cancelou o treino de ontem com menos de 30min de antecedência. Novos agendamentos estão bloqueados por 24h.',
      tipo: 'erro',
      lida: false,
      hora: 'Ontem, 19:30'
    },
    {
      id: 3,
      titulo: 'Agendamento Confirmado',
      mensagem: 'Seu treino de CrossFit foi confirmado dentro do bloco de horário das 10:00.',
      tipo: 'info',
      lida: true,
      hora: 'Ontem, 14:00'
    },
    {
      id: 4,
      titulo: 'Atenção ao Limite',
      mensagem: 'Você já utilizou 3 dos seus 4 agendamentos permitidos para esta semana.',
      tipo: 'aviso',
      lida: true,
      hora: 'Seg, 09:00'
    },
  ]);

  const handleBack = () => navigate('/tela-principal');

  const marcarComoLida = (id) =>
    setNotificacoes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, lida: true } : n))
    );

  const marcarTodasComoLidas = () =>
    setNotificacoes((prev) => prev.map((n) => ({ ...n, lida: true })));

  const excluirNotificacao = (id) =>
    setNotificacoes((prev) => prev.filter((n) => n.id !== id));

  const getStyleAndIcon = (tipo) => {
      switch(tipo) {
          case 'sucesso':
            return { border: 'border-l-green-500', icon: <Check size={16} className="text-green-500" /> };
          case 'erro':
            return { border: 'border-l-red-500', icon: <AlertTriangle size={16} className="text-red-500" /> };
          case 'aviso':
            return { border: 'border-l-yellow-500', icon: <Info size={16} className="text-yellow-500" /> };
          default:
            return { border: 'border-l-purple-500', icon: <Calendar size={16} className="text-purple-500" /> };
      }
  };

  return (
    <div className="w-full min-h-full bg-black text-white flex flex-col p-6 relative pb-24">

      {/* Header Simples */}
      <header className="flex items-center justify-between mb-8">
        <button
            onClick={handleBack}
            className="p-2 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 transition"
        >
            <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Notificações</h1>
        <div className="w-10"></div> {/* Espaçador visual */}
      </header>

      {/* Controles de Lote */}
      <div className="flex justify-between items-center mb-6 px-1">
        <span className="text-sm text-gray-400">
            {notificacoes.filter(n => !n.lida).length} não lidas
        </span>
        {notificacoes.some(n => !n.lida) && (
            <button
                onClick={marcarTodasComoLidas}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold uppercase tracking-wide"
            >
                Marcar todas como lidas
            </button>
        )}
      </div>

      {/* Lista de Notificações */}
      <div className="flex-1 space-y-4 overflow-y-auto pr-1">
        {notificacoes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-600">
                <Bell size={48} className="mb-4 opacity-50" />
                <p>Você não tem novas notificações.</p>
            </div>
        ) : (
            notificacoes.map((n) => {
                const style = getStyleAndIcon(n.tipo);
                return (
                    <div
                        key={n.id}
                        className={`bg-gray-900 rounded-lg p-4 shadow-md border-l-4 ${style.border} transition-all ${n.lida ? 'opacity-60' : 'opacity-100'}`}
                    >
                        <div className="flex justify-between items-start gap-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    {style.icon}
                                    <h3 className={`font-bold text-sm ${n.lida ? 'text-gray-400' : 'text-white'}`}>
                                        {n.titulo}
                                    </h3>
                                </div>
                                <p className="text-xs text-gray-300 leading-relaxed pl-6">
                                    {n.mensagem}
                                </p>
                                <span className="text-[10px] text-gray-500 mt-2 block pl-6 uppercase tracking-wide font-semibold">
                                    {n.hora}
                                </span>
                            </div>

                            {/* Botões de Ação */}
                            <div className="flex flex-col gap-2">
                                {!n.lida && (
                                    <button
                                        onClick={() => marcarComoLida(n.id)}
                                        className="p-2 bg-gray-800 rounded-full text-green-400 hover:bg-gray-700 hover:text-green-300 transition"
                                        title="Marcar como lida"
                                    >
                                        <Check size={14} />
                                    </button>
                                )}
                                <button
                                    onClick={() => excluirNotificacao(n.id)}
                                    className="p-2 bg-gray-800 rounded-full text-red-400 hover:bg-gray-700 hover:text-red-300 transition"
                                    title="Excluir"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })
        )}
      </div>
    </div>
  );
};

export default NotificacoesScreen;
