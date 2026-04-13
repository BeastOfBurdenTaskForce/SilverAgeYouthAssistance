'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Order, ToastItem, ToastType } from '../../lib/types';
import { VOLUNTEER_COUNT, VOLUNTEER_NAMES } from '../../lib/data';

import Navbar from './Navbar';
import Hero from './Hero';
import DualTrack from './DualTrack';
import ServicesSection from './ServicesSection';
import FlowSection from './FlowSection';
import CTASection from './CTASection';
import VolunteersSection from './VolunteersSection';
import StatsSection from './StatsSection';
import AboutSection from './AboutSection';
import SiteFooter from './SiteFooter';
import ToastContainer from './ToastContainer';
import OrderModal from './modals/OrderModal';
import OrdersModal from './modals/OrdersModal';
import DetailModal from './modals/DetailModal';
import HotlineModal from './modals/HotlineModal';
import { services } from '../../lib/data';

type ActiveModal = 'order' | 'orders' | 'detail' | 'hotline' | null;

export default function PageClient() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [detailServiceId, setDetailServiceId] = useState<string | null>(null);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [navScrolled, setNavScrolled] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);

  // Load orders from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('yf_orders');
      if (saved) setOrders(JSON.parse(saved));
    } catch (_) { /* ignore */ }
  }, []);

  // Persist orders
  useEffect(() => {
    localStorage.setItem('yf_orders', JSON.stringify(orders));
  }, [orders]);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setNavScrolled(y > 60);
      setShowBackTop(y > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Body scroll lock when modal is open
  useEffect(() => {
    document.body.style.overflow = activeModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeModal]);

  // ESC closes modals
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Toast management
  const showToast = useCallback((type: ToastType, message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Order simulation (for when volunteers exist)
  const simulateOrderProgress = useCallback((orderId: string) => {
    setTimeout(() => {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId && o.status === 0
            ? { ...o, status: 1, volunteer: VOLUNTEER_NAMES[Math.floor(Math.random() * VOLUNTEER_NAMES.length)] }
            : o
        )
      );
      setOrders((prev) => {
        const o = prev.find((x) => x.id === orderId);
        if (o?.status === 1) showToast('info', `志愿者${o.volunteer}已接单`);
        return prev;
      });
    }, 3000);

    setTimeout(() => {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId && o.status === 1 ? { ...o, status: 2 } : o))
      );
      showToast('info', '志愿者已开始提供服务');
    }, 8000);

    setTimeout(() => {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId && o.status === 2 ? { ...o, status: 3 } : o))
      );
      showToast('success', '服务已完成，感谢您的信任');
    }, 15000);
  }, [showToast]);

  // Order submission
  const handleOrderSubmit = useCallback((payload: Omit<Order, 'id' | 'status' | 'createdAt' | 'volunteer'>) => {
    const newOrder: Order = {
      ...payload,
      id: 'YF' + Date.now().toString().slice(-8),
      status: 0,
      createdAt: new Date().toLocaleString('zh-CN'),
      volunteer: null,
    };
    setOrders((prev) => [newOrder, ...prev]);

    if (VOLUNTEER_COUNT === 0) {
      showToast('warn', '订单已提交，当前暂无志愿者，进入等待队列');
    } else {
      showToast('success', '订单提交成功！志愿者将尽快接单');
      simulateOrderProgress(newOrder.id);
    }
  }, [showToast, simulateOrderProgress]);

  // Reorder
  const handleReorder = useCallback((order: Order) => {
    setActiveModal(null);
    setPreselectedServiceId(order.serviceId);
    setTimeout(() => setActiveModal('order'), 350);
  }, []);

  // Delete order
  const handleDeleteOrder = useCallback((orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    showToast('info', '订单已删除');
  }, [showToast]);

  // Open order modal (optionally with preselected service)
  const openOrderModal = useCallback((serviceId?: string | null) => {
    setPreselectedServiceId(serviceId ?? null);
    setActiveModal('order');
  }, []);

  // Open detail modal
  const openDetailModal = useCallback((serviceId: string) => {
    setDetailServiceId(serviceId);
    setActiveModal('detail');
  }, []);

  const activeOrderCount = orders.filter((o) => o.status < 3).length;
  const detailService = services.find((s) => s.id === detailServiceId) ?? null;

  return (
    <>
      <Navbar
        scrolled={navScrolled}
        activeOrderCount={activeOrderCount}
        onOrderClick={() => openOrderModal()}
        onOrdersClick={() => setActiveModal('orders')}
      />

      <main>
        <Hero
          onOrderClick={() => openOrderModal()}
          onHotlineClick={() => setActiveModal('hotline')}
        />
        <DualTrack />
        <ServicesSection onServiceClick={openDetailModal} />
        <FlowSection />
        <CTASection
          onOrderClick={() => openOrderModal()}
          onHotlineClick={() => setActiveModal('hotline')}
        />
        <VolunteersSection />
        <StatsSection />
        <AboutSection />
      </main>

      <SiteFooter />

      {/* Back to top */}
      <button
        className={`back-top ${showBackTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="回到顶部"
      >
        <i className="fas fa-chevron-up" />
      </button>

      {/* Modals */}
      <OrderModal
        isOpen={activeModal === 'order'}
        preselectedServiceId={preselectedServiceId}
        onClose={() => setActiveModal(null)}
        onSubmit={handleOrderSubmit}
      />
      <OrdersModal
        isOpen={activeModal === 'orders'}
        orders={orders}
        onClose={() => setActiveModal(null)}
        onReorder={handleReorder}
        onDelete={handleDeleteOrder}
        onNewOrder={() => openOrderModal()}
      />
      <DetailModal
        isOpen={activeModal === 'detail'}
        service={detailService}
        onClose={() => setActiveModal(null)}
        onOrder={(id) => openOrderModal(id)}
      />
      <HotlineModal
        isOpen={activeModal === 'hotline'}
        onClose={() => setActiveModal(null)}
        onCopied={() => showToast('success', '号码已复制到剪贴板')}
      />

      {/* Toasts */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
