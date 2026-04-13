'use client';

import { useState } from 'react';

interface NavbarProps {
  scrolled: boolean;
  activeOrderCount: number;
  onOrderClick: () => void;
  onOrdersClick: () => void;
}

export default function Navbar({ scrolled, activeOrderCount, onOrderClick, onOrdersClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-scrolled' : ''}`}
      style={{ background: 'transparent' }}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <i className="fas fa-hand-holding-heart text-white text-sm" />
          </div>
          <span className="font-serif font-bold text-lg text-brown-800">银发青助</span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-brown-600">
          <a href="#services" className="hover:text-primary transition-colors">服务项目</a>
          <a href="#flow" className="hover:text-primary transition-colors">服务流程</a>
          <a href="#volunteers" className="hover:text-primary transition-colors">志愿者</a>
          <a href="#about" className="hover:text-primary transition-colors">关于项目</a>
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={onOrderClick}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors shadow-md shadow-primary/20"
          >
            <i className="fas fa-pen-to-square text-xs" /> 下单
          </button>
          <button
            onClick={onOrdersClick}
            className="relative flex items-center gap-1.5 px-4 py-2 border-2 border-accent text-accent text-sm font-medium rounded-xl hover:bg-accent hover:text-white transition-all"
          >
            <i className="fas fa-clipboard-list text-xs" /> 我的订单
            {activeOrderCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {activeOrderCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-warm-100 transition-colors text-brown-600"
          >
            <i className="fas fa-bars" />
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-warm-300">
          <div className="px-5 py-4 flex flex-col gap-3 text-sm font-medium text-brown-600">
            <a href="#services" onClick={() => setMobileOpen(false)} className="py-2 hover:text-primary">服务项目</a>
            <a href="#flow" onClick={() => setMobileOpen(false)} className="py-2 hover:text-primary">服务流程</a>
            <a href="#volunteers" onClick={() => setMobileOpen(false)} className="py-2 hover:text-primary">志愿者</a>
            <a href="#about" onClick={() => setMobileOpen(false)} className="py-2 hover:text-primary">关于项目</a>
            <button
              onClick={() => { onOrderClick(); setMobileOpen(false); }}
              className="sm:hidden mt-1 py-2.5 bg-primary text-white rounded-xl text-center font-medium"
            >
              立即下单
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
