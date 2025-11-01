import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import ButtonContinue from '../ui/ButtonContinue';
import ButtonLoggout from '../ui/ButtonLoggout';
import ButtonDelete from '../ui/ButtonDelete';

const Field = ({ label, children }) => (
	<label className="block w-full">
		<span className="block text-sm text-gray-300 mb-2">{label}</span>
		{children}
	</label>
);

const UserScreen = ({ onBack, onSave }) => {
		const { user, updateProfile, logout, deleteAccount } = useAuth();
		const navigate = useNavigate();

	const handleBack = () => {
		if (typeof onBack === 'function') return onBack();
		navigate(-1);
	};
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [dob, setDob] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		if (user) {
			setName(user.name || '');
			setEmail(user.email || '');
			if (user.phone) setPhone(user.phone);
			if (user.dob) setDob(user.dob);
		}
	}, [user]);

		const handleSave = async () => {
			const payload = { name, email, phone, dob };
			if (password) payload.password = password;
			try {
				if (onSave) {
					await onSave(payload);
				} else {
					await updateProfile(payload);
				}
				navigate('/dashboard');
			} catch (e) {
				console.error('Failed to save profile', e);
				alert('Não foi possível salvar as alterações.');
			}
		};

	return (
			<div className="w-full h-full bg-black text-white flex flex-col p-6 relative">
				{/* Bottom-left delete button */}
				<div className="absolute bottom-8 left-4">
					<ButtonDelete onClick={async () => {
						if (!confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) return;
						try {
							await deleteAccount();
							navigate('/register');
						} catch (e) {
							console.error('Falha ao excluir a conta', e);
							alert('Falha ao excluir a conta.');
						}
					}} />
				</div>
				{/* Top-right logout */}
				<div className="absolute top-4 right-4">
					<ButtonLoggout onClick={() => { logout(); navigate('/login'); }} />
				</div>
			{/* Header */}
			<div className="flex items-center gap-3 mb-6">
				<button type="button" onClick={handleBack} className="p-2 rounded-full bg-neutral-800 text-gray-300 hover:bg-neutral-700">◂</button>
				<h1 className="text-2xl font-bold">Editar Perfil</h1>
			</div>

			{/* Avatar */}
			<div className="flex flex-col items-center mb-6">
				<div className="relative">
					<img
						src={user?.avatarUrl || 'https://api.dicebear.com/9.x/initials/svg?seed=' + encodeURIComponent(user?.name || 'User')}
						alt="Avatar"
						className="w-24 h-24 rounded-full object-cover border-2 border-neutral-700"
					/>
					<button
						className="absolute bottom-0 right-0 bg-red-600 hover:bg-red-500 text-white text-xs px-2 py-1 rounded-full"
						title="Trocar foto"
						type="button"
					>
						Editar
					</button>
				</div>
			</div>

			{/* Form (scrollable area) */}
			<div className="flex-1 space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900 pb-28">
				<Field label="Nome Completo">
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="w-full bg-neutral-900 border border-neutral-700 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
						placeholder="Seu nome"
						type="text"
					/>
				</Field>

				<Field label="Email">
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full bg-neutral-900 border border-neutral-700 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
						placeholder="seu@email.com"
						type="email"
					/>
				</Field>

				<Field label="Senha">
					<div className="relative">
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full bg-neutral-900 border border-neutral-700 rounded-xl py-3 px-4 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
							placeholder="••••••••"
							type={showPassword ? 'text' : 'password'}
						/>
						<button
							type="button"
							onClick={() => setShowPassword((s) => !s)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
						>
							{showPassword ? 'Ocultar' : 'Mostrar'}
						</button>
					</div>
					<p className="text-xs text-gray-400 mt-2">Por segurança, sua senha atual não pode ser exibida. Digite uma nova para alterá-la.</p>
				</Field>
			</div>

			{/* Footer */}
			<div className="mt-6 flex justify-end">
				<ButtonContinue onClick={handleSave}>Salvar</ButtonContinue>
			</div>
		</div>
	);
};

export default UserScreen;

