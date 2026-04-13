import Reveal from './Reveal';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-warm-50">
      <div className="max-w-4xl mx-auto px-5">
        <Reveal className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-warm-300/50">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shadow-primary/20">
                <i className="fas fa-hand-holding-heart text-white text-3xl" />
              </div>
            </div>
            <div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-brown-800 mb-4">关于银发青助</h2>
              <p className="text-brown-400 leading-relaxed mb-4">
                "银发青助"是一个以代际融合为特色、以服务电商为模式的社会创新项目。我们将国家"老有所养"的顶层设计与"青年有为"的蓬勃力量，在社区这个最小单元里切实结合。
              </p>
              <p className="text-brown-400 leading-relaxed mb-6">
                项目源于一项深刻的社会洞察：老年人被困在智能设备之外，而大学生有热情、有技能却缺乏有效的参与渠道。我们用技术搭建桥梁，让善意安全、可靠地流动。
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 bg-primary-50 text-primary text-xs font-semibold rounded-full">智慧养老</span>
                <span className="px-4 py-1.5 bg-accent-50 text-accent text-xs font-semibold rounded-full">代际融合</span>
                <span className="px-4 py-1.5 bg-primary-50 text-primary text-xs font-semibold rounded-full">社会实践</span>
                <span className="px-4 py-1.5 bg-accent-50 text-accent text-xs font-semibold rounded-full">共同富裕</span>
                <span className="px-4 py-1.5 bg-primary-50 text-primary text-xs font-semibold rounded-full">思政教育</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
