import React, { useMemo, useRef, useEffect, useState } from 'react';
import ButtonContinue from '../ui/ButtonContinue';

const AgeWheel = ({ min = 10, max = 100, value, onChange }) => {
	const ref = useRef(null);
	const items = useMemo(() => Array.from({ length: max - min + 1 }, (_, i) => i + min), [min, max]);

	useEffect(() => {
			const el = ref.current;
		if (!el) return;
			const itemHeight = 48;
			const spacer = el.querySelector('[data-top-spacer="true"]');
			const topPadding = spacer ? spacer.offsetHeight : 96;
		const onScroll = () => {
			const selectionTop = el.scrollTop + (el.clientHeight - itemHeight) / 2 - topPadding;
			const index = Math.round(selectionTop / itemHeight);
			const snapped = items[Math.min(items.length - 1, Math.max(0, index))];
			if (snapped !== value) onChange(snapped);
		};
		el.addEventListener('scroll', onScroll, { passive: true });
		return () => el.removeEventListener('scroll', onScroll);
	}, [items, onChange, value]);

	useEffect(() => {
			const el = ref.current;
		if (!el) return;
			const itemHeight = 48;
			const spacer = el.querySelector('[data-top-spacer="true"]');
			const topPadding = spacer ? spacer.offsetHeight : 96;
		const index = items.indexOf(value);
		if (index >= 0) {
			const targetTop = index * itemHeight + topPadding - (el.clientHeight - itemHeight) / 2;
			el.scrollTo({ top: targetTop, behavior: 'smooth' });
		}
	}, [items, value]);

	return (
		<div className="relative w-full max-w-xs mx-auto">
			<div className="pointer-events-none absolute inset-x-0" style={{ top: 'calc(50% - 24px)' }}>
				<div className="h-0.5 bg-red-600" />
			</div>
			<div className="pointer-events-none absolute inset-x-0" style={{ top: 'calc(50% + 24px)' }}>
				<div className="h-0.5 bg-red-600" />
			</div>
					<div ref={ref} className="h-60 overflow-y-auto scroll-smooth snap-y snap-mandatory">
						<div className="pt-24" data-top-spacer="true" />
				{items.map((n) => (
					<div key={n} className="h-12 flex items-center justify-center snap-center select-none">
						<span className={`transition-all text-2xl ${n === value ? 'text-white font-bold scale-110' : 'text-gray-500'}`}>
							{n}
						</span>
					</div>
				))}
				<div className="pb-24" />
			</div>
		</div>
	);
};

const YearsOldStep = ({ onNext, onBack, defaultValue = 25 }) => {
	const [age, setAge] = useState(defaultValue);
	return (
		<div className="flex flex-col h-full text-white p-6 justify-between">
			<div className="text-center mt-10">
				<h2 className="text-3xl font-bold mb-2">Quantos anos você tem?</h2>
				<p className="text-sm text-gray-400">Isso nos ajuda a criar seu plano personalizado</p>
			</div>
			<div className="flex-grow flex items-center justify-center">
				<AgeWheel value={age} onChange={setAge} />
			</div>
			<div className="w-full flex justify-between items-center">
				<button onClick={onBack} className="text-gray-400 hover:text-white">◂ Voltar</button>
				<ButtonContinue onClick={() => onNext({ age_years: age })} className="px-6">Next ▸</ButtonContinue>
			</div>
		</div>
	);
};

export default YearsOldStep;

