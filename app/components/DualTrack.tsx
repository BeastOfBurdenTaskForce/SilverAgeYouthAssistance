import Reveal from './Reveal';

export default function DualTrack() {
  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-5xl mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-6">
          <Reveal className="p-8 rounded-2xl border-2 border-primary/15 bg-gradient-to-br from-primary-50 to-white hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-5 shadow-md shadow-primary/20">
              <i className="fas fa-mobile-screen text-white text-xl" />
            </div>
            <h3 className="font-serif font-bold text-xl text-brown-800 mb-2">轨道一：子女代下单</h3>
            <p className="text-brown-400 leading-relaxed text-sm">
              通过微信小程序，子女随时随地了解父母需求，一键发起服务订单，实时查看服务进度，让关怀不受时空限制。
            </p>
          </Reveal>
          <Reveal delay={0.2} className="p-8 rounded-2xl border-2 border-accent/15 bg-gradient-to-br from-accent-50 to-white hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-5 shadow-md shadow-accent/20 pulse">
              <i className="fas fa-headset text-white text-xl" />
            </div>
            <h3 className="font-serif font-bold text-xl text-brown-800 mb-2">轨道二：统一服务热线</h3>
            <p className="text-brown-400 leading-relaxed text-sm">
              老人无需使用智能手机，拨打服务热线即可获得人工协助下单。确保不落下任何一位有需要的长者，真正实现普惠包容。
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
