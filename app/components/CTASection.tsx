import Reveal from './Reveal';

interface CTASectionProps {
  onOrderClick: () => void;
  onHotlineClick: () => void;
}

export default function CTASection({ onOrderClick, onHotlineClick }: CTASectionProps) {
  return (
    <section
      className="py-16 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #2A7D5F 0%, #1F5E47 50%, #2A7D5F 100%)' }}
    >
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-0 left-1/4 w-64 h-64 border border-white rounded-full"
          style={{ animation: 'floatB 6s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-48 h-48 border border-white rounded-full"
          style={{ animation: 'floatB 8s ease-in-out infinite reverse' }}
        />
      </div>
      <Reveal className="max-w-3xl mx-auto px-5 text-center relative z-10">
        <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white mb-4">
          每一次下单，都是一次温暖的接力
        </h2>
        <p className="text-white/70 mb-8 max-w-lg mx-auto">
          您的一个订单，不仅解决了老人的实际困难，也为一位大学生提供了践行社会责任的机会
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onOrderClick}
            className="px-8 py-3.5 bg-white text-accent-dark font-bold rounded-2xl hover:bg-warm-50 transition-all shadow-lg hover:-translate-y-0.5"
          >
            <i className="fas fa-pen-to-square mr-2" />
            立即为父母下单
          </button>
          <button
            onClick={onHotlineClick}
            className="px-8 py-3.5 border-2 border-white/40 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all"
          >
            <i className="fas fa-phone-volume mr-2" />
            拨打服务热线
          </button>
        </div>
      </Reveal>
    </section>
  );
}
