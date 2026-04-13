'use client';

import { useEffect, useRef } from 'react';
import type { ToastItem, ToastType } from '../../lib/types';

interface ToastContainerProps {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}

function getIcon(type: ToastType) {
  if (type === 'success') return 'fa-circle-check';
  if (type === 'warn') return 'fa-triangle-exclamation';
  return 'fa-circle-info';
}

function SingleToast({ toast, onRemove }: { toast: ToastItem; onRemove: (id: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const showRaf = requestAnimationFrame(() => {
      requestAnimationFrame(() => el.classList.add('show'));
    });
    const timer = setTimeout(() => {
      el.classList.remove('show');
      setTimeout(() => onRemove(toast.id), 400);
    }, 3500);
    return () => {
      cancelAnimationFrame(showRaf);
      clearTimeout(timer);
    };
  }, [toast.id, onRemove]);

  return (
    <div ref={ref} className={`toast toast-${toast.type}`}>
      <i className={`fas ${getIcon(toast.type)}`} />
      {toast.message}
    </div>
  );
}

export default function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="toast-wrap">
      {toasts.map((t) => (
        <SingleToast key={t.id} toast={t} onRemove={onRemove} />
      ))}
    </div>
  );
}
