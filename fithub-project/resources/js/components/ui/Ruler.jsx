import React, { useEffect, useRef } from 'react';

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

	// Ponteiro central (Linha roxa fixa)
	const pointer = (
		<div ref={pointerRef} className="absolute left-1/2 -translate-x-1/2 bottom-0 top-0 flex items-end pointer-events-none z-10">
			<div className="w-1 h-16 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
		</div>
	);

	const offset = (width / 2) - (value - min) * stepPx;

	return (
		<div ref={trackRef} className="relative w-full max-w-md h-24 select-none overflow-hidden cursor-grab active:cursor-grabbing mask-linear-fade">
			{pointer}
			<div
                className="absolute left-1/2 h-full transition-transform duration-75 ease-out will-change-transform"
                style={{ width: `${width}px`, transform: `translateX(calc(-50% + ${offset}px))` }}
            >
				{/* Renderiza os traços da régua */}
				<div className="absolute inset-0 flex items-end">
					{Array.from({ length: total + 1 }).map((_, i) => {
						const is10 = i % 10 === 0;
						const is5 = !is10 && i % 5 === 0;
						const height = is10 ? 32 : is5 ? 20 : 12; // Alturas diferentes
						const opacity = is10 ? 1 : is5 ? 0.6 : 0.3; // Opacidades diferentes

                        // Cor: Branco para os traços normais
						const colorClass = 'bg-white';

						return (
							<div key={i} className="relative flex justify-center" style={{ width: `${stepPx}px` }}>
								<div
                                    className={`absolute bottom-0 w-0.5 rounded-full ${colorClass}`}
                                    style={{ height: `${height}px`, opacity }}
                                />
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Ruler;
