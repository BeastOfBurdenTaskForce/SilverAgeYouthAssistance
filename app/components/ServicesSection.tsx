import Reveal from './Reveal';
import { services } from '../../lib/data';

interface ServicesSectionProps {
  onServiceClick: (id: string) => void;
}

export default function ServicesSection({ onServiceClick }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 bg-warm-50 relative">
      <div className="max-w-6xl mx-auto px-5">
        <Reveal className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-primary-50 text-primary text-xs font-semibold rounded-full mb-4">
            核心服务
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-brown-800 mb-3">六大标准化服务</h2>
          <p className="text-brown-400 max-w-md mx-auto">
            将非标服务进行电商化改造，每一项都经过流程打磨，确保服务质量可感知、可评价、可追溯
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={Math.min(i + 1, 5) * 0.1}>
              <div
                className="service-card bg-white rounded-2xl p-6 border border-warm-300/40 shadow-sm h-full"
                onClick={() => onServiceClick(s.id)}
                role="button"
                tabIndex={0}
                aria-label={s.name}
                onKeyDown={(e) => e.key === 'Enter' && onServiceClick(s.id)}
              >
                <div
                  className={`icon-wrap c-${s.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                    s.color === 'primary' ? 'bg-primary-50 text-primary' : 'bg-accent-50 text-accent'
                  }`}
                >
                  <i className={`fas ${s.icon} text-xl`} />
                </div>
                <h3 className="font-semibold text-brown-800 text-lg mb-2">{s.name}</h3>
                <p className="text-brown-400 text-sm leading-relaxed">{s.brief}</p>
                <div className={`mt-4 text-${s.color} text-sm font-medium flex items-center gap-1`}>
                  <span>了解详情</span>
                  <i className="fas fa-arrow-right text-xs" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
