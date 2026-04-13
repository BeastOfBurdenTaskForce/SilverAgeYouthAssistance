'use client';

import { useEffect, useRef } from 'react';

interface StatItemProps {
  target?: number;
  label: string;
}

function StatItem({ target, label }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || target === undefined) return;
    const num = target; // capture in block-scoped const for closure
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1800;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(num * ease).toLocaleString();
            if (progress < 1) requestAnimationFrame(animate);
            else el.textContent = num.toLocaleString() + '+';
          };
          requestAnimationFrame(animate);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div className="reveal-wrapper text-center">
      <div ref={ref} className={target !== undefined ? 'stat-num' : 'stat-num-zero'}>
        0
      </div>
      <div className="text-brown-400 text-sm mt-2 font-medium">{label}</div>
    </div>
  );
}

const stats = [
  { target: undefined, label: '服务老人（人次）' },
  { target: undefined, label: '注册志愿者' },
  { target: undefined, label: '完成订单' },
  { target: undefined, label: '覆盖社区' },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <StatItem key={s.label} target={s.target} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
