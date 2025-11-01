import React, { useEffect, useMemo, useRef, useState } from 'react';
import ButtonContinue from '../ui/ButtonContinue';

const Ruler = ({ min = 30, max = 200, value, onChange }) => {
	const trackRef = useRef(null);
	const pointerRef = useRef(null);

	const total = max - min;
	const stepPx = 8;
	const width = (total + 1) * stepPx;

	useEffect(() => {
		const el = trackRef.current;
		if (!el) return;
		let isDown = false;
		const start = (clientX) => {
			isDown = true;
			update(clientX);
		};
		const move = (clientX) => {
			if (!isDown) return;
			update(clientX);
		};
		const end = () => (isDown = false);

		const update = (clientX) => {
			const rect = el.getBoundingClientRect();
			const center = rect.left + rect.width / 2;
			const delta = clientX - center;
			const kgDelta = Math.round(delta / stepPx);
			const newVal = Math.min(max, Math.max(min, value + kgDelta));
			if (newVal !== value) onChange(newVal);
		};

		const onWheel = (e) => {
			e.preventDefault();
			const delta = e.deltaY > 0 ? -1 : 1;
			const newVal = Math.min(max, Math.max(min, value + delta));
			if (newVal !== value) onChange(newVal);
		};

		const md = (e) => start(e.clientX);
		const mm = (e) => move(e.clientX);
		const mu = end;
		const ts = (e) => start(e.touches[0].clientX);
		const tm = (e) => move(e.touches[0].clientX);
		const tu = end;

		el.addEventListener('mousedown', md);
		window.addEventListener('mousemove', mm);
		window.addEventListener('mouseup', mu);
		el.addEventListener('touchstart', ts, { passive: true });
		window.addEventListener('touchmove', tm, { passive: true });
		window.addEventListener('touchend', tu);
		el.addEventListener('wheel', onWheel, { passive: false });
		return () => {
			el.removeEventListener('mousedown', md);
			window.removeEventListener('mousemove', mm);
			window.removeEventListener('mouseup', mu);
			el.removeEventListener('touchstart', ts);
			window.removeEventListener('touchmove', tm);
			window.removeEventListener('touchend', tu);
			el.removeEventListener('wheel', onWheel);
		};
	}, [min, max, stepPx, onChange, value]);

	const pointer = (
		<div ref={pointerRef} className="absolute left-1/2 -translate-x-1/2 bottom-0 top-0 flex items-end pointer-events-none">
			<div className="w-0.5 h-16 bg-red-600" />
		</div>
	);

	const offset = (width / 2) - (value - min) * stepPx;

	return (
		<div ref={trackRef} className="relative w-full max-w-md h-24 select-none overflow-hidden">
			{pointer}
			<div className="absolute left-1/2 h-full" style={{ width: `${width}px`, transform: `translateX(calc(-50% + ${offset}px))` }}>
				{/* render red ticks for every kg */}
				<div className="absolute inset-0 flex">
					{Array.from({ length: total + 1 }).map((_, i) => {
						const is10 = i % 10 === 0;
						const is5 = !is10 && i % 5 === 0;
						const height = is10 ? 28 : is5 ? 20 : 12;
						const opacity = is10 ? 1 : is5 ? 0.9 : 0.8;
						const colorClass = 'bg-red-500';
						return (
							<div key={i} className="relative" style={{ width: `${stepPx}px` }}>
								<div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 ${colorClass}`} style={{ height: `${height}px`, opacity }} />
							</div>
						);
					})}
				</div>
				{/* center emphasized tick */}
				<div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0.5 bg-red-600" style={{ height: '32px' }} />
			</div>
		</div>
	);
};

const WeightStep = ({ onNext, onBack, defaultValue = 70 }) => {
	const [weight, setWeight] = useState(defaultValue);
	return (
		<div className="flex flex-col h-full text-white p-6 justify-between">
			<div className="text-center mt-10">
				<h2 className="text-3xl font-bold mb-2">Qual é o seu peso?</h2>
			</div>
			<div className="flex flex-col items-center gap-4">
				<div className="text-6xl font-bold">
					{weight}
					<span className="text-2xl font-normal text-gray-300 ml-2">kg</span>
				</div>
				<Ruler max={250} value={weight} onChange={setWeight} />
			</div>
			<div className="w-full flex justify-between items-center">
				<button onClick={onBack} className="text-gray-400 hover:text-white">◂ Voltar</button>
				<ButtonContinue onClick={() => onNext({ weight_kg: weight })} className="px-6">Next ▸</ButtonContinue>
			</div>
		</div>
	);
};

export default WeightStep;

