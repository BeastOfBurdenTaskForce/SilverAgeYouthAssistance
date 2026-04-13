'use client';

import { services, VOLUNTEER_COUNT } from '../../../lib/data';
import type { Service } from '../../../lib/types';

interface DetailModalProps {
  isOpen: boolean;
  service: Service | null;
  onClose: () => void;
  onOrder: (serviceId: string) => void;
}

export default function DetailModal({ isOpen, service, onClose, onOrder }: DetailModalProps) {
  if (!service) return null;

  const handleOrder = () => {
    onClose();
    setTimeout(() => onOrder(service.id), 100);
  };

  return (
    <div
      className={`modal-overlay ${isOpen ? 'active' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-box">
        <div className="sticky top-0 bg-white rounded-t-2xl px-6 py-4 border-b border-warm-300/50 flex items-center justify-between z-10">
          <h3 className="font-serif font-bold text-lg text-brown-800">{service.name}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-warm-100 flex items-center justify-center text-brown-400 hover:text-brown-800 transition-colors"
            aria-label="关闭"
          >
            <i className="fas fa-xmark text-lg" />
          </button>
        </div>
        <div className="px-6 py-5">
          <div className="flex items-center gap-3 mb-5">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${
                service.color === 'primary' ? 'bg-primary-50 text-primary' : 'bg-accent-50 text-accent'
              }`}
            >
              <i className={`fas ${service.icon} text-2xl`} />
            </div>
            <div>
              <div className="text-sm text-brown-400">{service.brief}</div>
            </div>
          </div>
          <h4 className="font-semibold text-brown-800 mb-2">服务说明</h4>
          <p className="text-brown-400 text-sm leading-relaxed mb-5">{service.detail}</p>
          {VOLUNTEER_COUNT === 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-3 mb-5">
              <i className="fas fa-triangle-exclamation text-amber-500 mt-0.5 text-sm" />
              <div className="text-xs text-amber-700 leading-relaxed">
                当前暂无注册志愿者，下单后将进入等待队列，志愿者上线后自动派单。
              </div>
            </div>
          )}
          <button
            onClick={handleOrder}
            className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all shadow-md shadow-primary/20"
          >
            <i className="fas fa-pen-to-square mr-2" />立即下单此服务
          </button>
        </div>
      </div>
    </div>
  );
}
