import Reveal from './Reveal';

const steps = [
  {
    num: 1,
    color: 'primary' as const,
    title: '发起需求',
    desc: '子女小程序下单\n或老人拨打热线',
  },
  {
    num: 2,
    color: 'primary' as const,
    title: '智能派单',
    desc: 'LBS定位匹配\n附近志愿者接单',
  },
  {
    num: 3,
    color: 'accent' as const,
    title: '线下服务',
    desc: '志愿者按时上门\n按标准流程执行',
  },
  {
    num: 4,
    color: 'accent' as const,
    title: '评价闭环',
    desc: '服务完成确认\n双方互评积累信用',
  },
];

export default function FlowSection() {
  return (
    <section id="flow" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-5">
        <Reveal className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-accent-50 text-accent text-xs font-semibold rounded-full mb-4">
            服务流程
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-brown-800 mb-3">四步完成一次温暖接力</h2>
          <p className="text-brown-400 max-w-md mx-auto">
            从需求发起到服务完成，全程线上化追踪，让每一份善意安全抵达
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.1} className="text-center relative">
              {i < 3 && <div className="hidden lg:block step-line" />}
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 border-2 ${
                  s.color === 'primary'
                    ? 'bg-primary-50 border-primary'
                    : 'bg-accent-50 border-accent'
                }`}
              >
                <span className={`font-serif font-bold text-lg ${s.color === 'primary' ? 'text-primary' : 'text-accent'}`}>
                  {s.num}
                </span>
              </div>
              <h4 className="font-semibold text-brown-800 mb-1.5">{s.title}</h4>
              <p className="text-brown-400 text-sm leading-relaxed whitespace-pre-line">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
