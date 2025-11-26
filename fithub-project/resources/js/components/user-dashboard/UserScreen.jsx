import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import ButtonContinue from '../ui/ButtonContinue';
import ButtonLoggout from '../ui/ButtonLoggout';
import ButtonDelete from '../ui/ButtonDelete';
import { ArrowLeft } from 'lucide-react';

const Field = ({ label, children }) => (
    <label className="block w-full">
        <span className="block text-sm text-gray-400 mb-2">{label}</span>
        {children}
    </label>
);

const UserScreen = ({ onBack, onSave }) => {
    const { user, updateProfile, logout, deleteAccount } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
        }
    }, [user]);

    const handleBack = () => {
        if (typeof onBack === 'function') return onBack();
        navigate('/tela-principal');
    };

    const handleSave = async () => {
        const payload = { name, email };

        if (password && password.length > 0) {
            payload.password = password;
        }

        try {
            if (onSave) await onSave(payload);
            else await updateProfile(payload);

            alert('Perfil atualizado com sucesso!');
            setPassword('');
            navigate('/tela-principal');
        } catch (e) {
            console.error(e);
            alert('Erro ao salvar. Verifique se o e-mail já não está em uso.');
        }
    };

    return (
        <div className="w-full min-h-full bg-black text-white flex flex-col p-6 relative pb-24">

            {/* Header */}
            <div className="flex items-center justify-between mb-8 relative">
                <button
                    type="button"
                    onClick={handleBack}
                    className="p-2 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 transition"
                >
                    <ArrowLeft size={20} />
                </button>

                <h1 className="text-xl font-bold absolute left-1/2 -translate-x-1/2">Editar Perfil</h1>

                <div className="scale-75 origin-right">
                     <ButtonLoggout onClick={() => { logout(); navigate('/login'); }} />
                </div>
            </div>

            {/* Avatar */}
            <div className="flex flex-col items-center mb-8">
                <div className="relative group cursor-pointer">
                    <img
                        src={user?.avatarUrl || 'https://api.dicebear.com/9.x/initials/svg?seed=' + encodeURIComponent(user?.name || 'User')}
                        alt="Avatar"
                        className="w-28 h-28 rounded-full object-cover border-4 border-gray-800 shadow-xl group-hover:border-purple-600 transition"
                    />
                </div>
                <p className="mt-3 text-gray-400 text-sm">{user?.email}</p>
            </div>

            {/* Formulário */}
            <div className="flex-1 space-y-5 overflow-y-auto mb-6">
                <Field label="Nome Completo">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl py-4 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 transition"
                        placeholder="Seu nome"
                        type="text"
                    />
                </Field>

                <Field label="Email">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl py-4 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 transition"
                        placeholder="seu@email.com"
                        type="email"
                    />
                </Field>

                <Field label="Nova Senha">
                    <div className="relative">
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl py-4 px-4 pr-20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 transition"
                            placeholder="••••••••"
                            type={showPassword ? 'text' : 'password'}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((s) => !s)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-sm font-semibold"
                        >
                            {showPassword ? 'Ocultar' : 'Mostrar'}
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Preencha apenas se quiser alterar sua senha atual.</p>
                </Field>
            </div>

            {/* Botão Salvar */}
            <div className="mb-8">
                <ButtonContinue onClick={handleSave}>
                    Salvar Alterações
                </ButtonContinue>
            </div>

            {/* Zona de Perigo */}
            <div className="border-t border-gray-800 pt-6 mt-4 flex justify-center">
                 <ButtonDelete onClick={async () => {
                    if (!confirm('Tem certeza que deseja excluir sua conta?')) return;
                    try {
                        await deleteAccount();
                        navigate('/login');
                    } catch (e) {
                        alert('Falha ao excluir a conta.');
                    }
                }} />
            </div>
        </div>
    );
};

export default UserScreen;
