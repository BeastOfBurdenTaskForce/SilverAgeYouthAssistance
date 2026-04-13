import Reveal from './Reveal';
import { volunteers, VOLUNTEER_COUNT } from '../../lib/data';

export default function VolunteersSection() {
  return (
    <section id="volunteers" className="py-20 bg-warm-50">
      <div className="max-w-6xl mx-auto px-5">
        <Reveal className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-accent-50 text-accent text-xs font-semibold rounded-full mb-4">
            青年力量
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-brown-800 mb-3">志愿者风采</h2>
          <p className="text-brown-400 max-w-md mx-auto">来自各大高校的热心青年，用专业和热情守护社区长者</p>
        </Reveal>

        {VOLUNTEER_COUNT === 0 ? (
          <Reveal>
            <div className="no-volunteer-banner max-w-md mx-auto">
              <i className="fas fa-user-group block text-[2rem] text-[#F57C00] mb-2" />
              <h4 className="font-serif font-bold text-lg text-brown-800 mb-2">暂无注册志愿者</h4>
              <p className="text-sm text-brown-400 leading-relaxed">
                平台正在招募中，欢迎高校青年加入我们的志愿者队伍。有志愿者注册后，您提交的订单即可被接单处理。
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-amber-700 bg-amber-50 px-4 py-2 rounded-full inline-flex">
                <i className="fas fa-circle-info" />
                <span>当前下单将进入等待队列，志愿者上线后自动派单</span>
              </div>
            </div>
          </Reveal>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {volunteers.slice(0, VOLUNTEER_COUNT).map((v, i) => (
              <Reveal key={v.name} delay={Math.min(i + 1, 4) * 0.1}>
                <div className="vol-card bg-white rounded-2xl p-6 border border-warm-300/40 shadow-sm text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://picsum.photos/seed/${v.seed}/200/200.jpg`}
                    alt={v.name}
                    className="vol-avatar w-20 h-20 rounded-full mx-auto mb-4 object-cover border-[3px] border-white shadow-md"
                    loading="lazy"
                  />
                  <h4 className="font-semibold text-brown-800 mb-0.5">{v.name}</h4>
                  <div className="text-xs text-brown-400 mb-2">{v.school} · {v.major}</div>
                  <span className="inline-block px-3 py-0.5 bg-accent-50 text-accent text-xs font-medium rounded-full mb-3">{v.tag}</span>
                  <div className="text-sm text-brown-600 font-medium">
                    已服务 <span className="text-primary font-bold">{v.count}</span> 次
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
