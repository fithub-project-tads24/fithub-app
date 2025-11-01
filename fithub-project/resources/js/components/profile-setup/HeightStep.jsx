import React, { useEffect, useMemo, useRef, useState } from 'react';
import ButtonContinue from '../ui/ButtonContinue';

const Wheel = ({
	min = 40,
	max = 250,
	value,
	onChange,
	unit = 'cm',
}) => {
	const listRef = useRef(null);
	const items = useMemo(() => {
		const arr = [];
		for (let i = min; i <= max; i++) arr.push(i);
		return arr;
	}, [min, max]);

	useEffect(() => {
		const el = listRef.current;
		if (!el) return;

		let rafId;
		let ticking = false;
		const onScroll = () => {
			if (ticking) return;
			ticking = true;
					rafId = requestAnimationFrame(() => {
				const itemHeight = 48;
							const spacer = el.querySelector('[data-top-spacer="true"]');
							const topPadding = spacer ? spacer.offsetHeight : 96;
				const selectionTop = el.scrollTop + (el.clientHeight - itemHeight) / 2 - topPadding;
				const index = Math.round(selectionTop / itemHeight);
				const snapped = items[Math.min(items.length - 1, Math.max(0, index))];
				if (snapped !== value) onChange(snapped);
				ticking = false;
			});
		};
		el.addEventListener('scroll', onScroll, { passive: true });
		return () => {
			el.removeEventListener('scroll', onScroll);
			cancelAnimationFrame(rafId);
		};
	}, [items, onChange, value]);

	useEffect(() => {
			const el = listRef.current;
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
			{/* selection lines bracketing the center item */}
			<div className="pointer-events-none absolute inset-x-0" style={{ top: 'calc(50% - 24px)' }}>
				<div className="h-0.5 bg-red-600" />
			</div>
			<div className="pointer-events-none absolute inset-x-0" style={{ top: 'calc(50% + 24px)' }}>
				<div className="h-0.5 bg-red-600" />
			</div>

			<div
				ref={listRef}
				className="h-60 overflow-y-auto scroll-smooth snap-y snap-mandatory scrollbar-thin scrollbar-thumb-gray-700/50"
			>
			<div className="pt-24" data-top-spacer="true" />
				{items.map((n) => (
					<div
						key={n}
						className="h-12 flex items-center justify-center snap-center select-none"
					>
						<span
							className={`transition-all text-2xl ${
								n === value ? 'text-white font-bold scale-110' : 'text-gray-500'
							}`}
						>
							{n}
							{n === value && (
								<span className="text-base text-gray-300 ml-1">{unit}</span>
							)}
						</span>
					</div>
				))}
				<div className="pb-24" />
			</div>
		</div>
	);
};

const HeightStep = ({ onNext, onBack, defaultValue = 168 }) => {
	const [height, setHeight] = useState(defaultValue);

	return (
		<div className="flex flex-col h-full text-white p-6 justify-between">
			<div className="text-center mt-10">
				<h2 className="text-3xl font-bold mb-2">Qual é a sua altura?</h2>
			</div>

			<div className="flex-grow flex items-center justify-center">
				<Wheel value={height} onChange={setHeight} />
			</div>

			<div className="w-full flex justify-between items-center">
				<button onClick={onBack} className="text-gray-400 hover:text-white">
					◂ Voltar
				</button>
				<ButtonContinue
					onClick={() => onNext({ height_cm: height })}
					className="px-6"
				>
					Next ▸
				</ButtonContinue>
			</div>
		</div>
	);
};

export default HeightStep;

