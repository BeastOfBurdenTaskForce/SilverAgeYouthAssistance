export default function SiteFooter() {
  return (
    <footer className="bg-brown-900 text-white/60 py-12">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <i className="fas fa-hand-holding-heart text-white text-xs" />
            </div>
            <span className="font-serif font-bold text-white">银发青助</span>
          </div>
          <p className="text-sm text-center">信息系统课程设计 · 用信息技术服务国家发展大局</p>
          <div className="flex items-center gap-4 text-sm">
            <span>
              服务热线：
              <a href="tel:4001234567" className="text-primary-light hover:text-primary transition-colors font-medium">
                110
              </a>
            </span>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-white/30">
          © 2025 银发青助项目组 · 积极应对人口老龄化 · 青年参与 科技赋能 社区受益
        </div>
      </div>
    </footer>
  );
}
