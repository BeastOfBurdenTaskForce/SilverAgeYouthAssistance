interface HeroProps {
  onOrderClick: () => void;
  onHotlineClick: () => void;
}

export default function Hero({ onOrderClick, onHotlineClick }: HeroProps) {
  return (
    <section className="hero-bg min-h-screen flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-5 py-20 md:py-0 w-full">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left relative z-10">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-50 border border-accent/15 rounded-full text-accent text-xs font-medium mb-6"
              style={{ animation: 'fadeInUp 0.6s ease both' }}
            >
              <i className="fas fa-seedling" />
              响应国家战略 · 用技术温暖银发
            </div>
            <h1
              className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-brown-900 leading-tight mb-5"
              style={{ animation: 'fadeInUp 0.7s ease 0.1s both' }}
            >
              银发青助
            </h1>
            <p
              className="text-xl sm:text-2xl font-serif font-semibold text-primary mb-4"
              style={{ animation: 'fadeInUp 0.7s ease 0.2s both' }}
            >
              青年力量，温暖每一根银发
            </p>
            <p
              className="text-brown-400 text-base sm:text-lg leading-relaxed max-w-lg mx-auto md:mx-0 mb-8"
              style={{ animation: 'fadeInUp 0.7s ease 0.3s both' }}
            >
              大学生志愿者为社区老人提供代购、挂号、缴费等生活服务，
              <br className="hidden sm:block" />
              子女线上下单，志愿者线下跑腿，让爱没有距离。
            </p>
            <div
              className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start"
              style={{ animation: 'fadeInUp 0.7s ease 0.4s both' }}
            >
              <button
                onClick={onOrderClick}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-white font-semibold rounded-2xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                <i className="fas fa-pen-to-square" /> 子女代下单
              </button>
              <button
                onClick={onHotlineClick}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-accent text-accent font-semibold rounded-2xl hover:bg-accent hover:text-white transition-all pulse"
              >
                <i className="fas fa-phone-volume" /> 老人服务热线
              </button>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="flex-shrink-0 relative" style={{ animation: 'scaleIn 0.8s ease 0.5s both' }}>
            <div className="phone-frame">
              <div className="phone-notch" />
              <div className="pt-7 px-3 pb-3 h-full flex flex-col">
                <div className="text-center mb-2.5 pt-1">
                  <div className="text-sm font-bold text-brown-800">银发青助</div>
                  <div className="text-[10px] text-brown-400">为父母便捷下单</div>
                </div>
                <div className="grid grid-cols-3 gap-1.5 flex-1">
                  {[
                    { icon: 'fa-shopping-cart', label: '代购生鲜', bg: 'bg-primary-50', text: 'text-primary' },
                    { icon: 'fa-hospital', label: '代办挂号', bg: 'bg-accent-50', text: 'text-accent' },
                    { icon: 'fa-receipt', label: '生活缴费', bg: 'bg-primary-50', text: 'text-primary' },
                    { icon: 'fa-car', label: '出行辅助', bg: 'bg-accent-50', text: 'text-accent' },
                    { icon: 'fa-mobile-alt', label: '手机教学', bg: 'bg-primary-50', text: 'text-primary' },
                    { icon: 'fa-phone-alt', label: '紧急求助', bg: 'bg-accent-50', text: 'text-accent' },
                  ].map((item) => (
                    <div key={item.label} className={`${item.bg} rounded-xl p-2 text-center`}>
                      <i className={`fas ${item.icon} ${item.text} text-xs`} />
                      <div className="text-[9px] mt-1 text-brown-600 font-medium">{item.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-2.5 space-y-1.5">
                  <div className="bg-warm-100 rounded-xl p-2.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] text-brown-400">进行中的订单</span>
                      <span className="bg-amber-100 text-amber-700 text-[9px] px-2 py-0.5 rounded-full font-medium">等待接单</span>
                    </div>
                    <div className="text-xs font-semibold text-brown-800">代购蔬菜水果</div>
                    <div className="text-[10px] text-brown-400 mt-0.5">暂无志愿者接单</div>
                    <div className="mt-2 h-1.5 bg-warm-200 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: '15%' }} />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-2.5 border border-warm-300">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-brown-400">已完成</span>
                      <span className="bg-warm-200 text-brown-600 text-[9px] px-2 py-0.5 rounded-full font-medium">已完成</span>
                    </div>
                    <div className="text-xs font-semibold text-brown-800">代缴电费</div>
                    <div className="text-[10px] text-brown-400 mt-0.5">昨天 14:30 · 金额 ¥186.50</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-3 -right-3 w-7 h-7 bg-primary-light/25 rounded-full" style={{ animation: 'floatB 3.5s ease-in-out infinite' }} />
            <div className="absolute -bottom-5 -left-5 w-10 h-10 bg-accent/8 rounded-full" style={{ animation: 'floatB 4.5s ease-in-out infinite reverse' }} />
            <div className="absolute top-1/2 -right-7 w-5 h-5 bg-primary/10 rounded-full" style={{ animation: 'floatC 5s ease-in-out infinite' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
