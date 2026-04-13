'use client';

import type { Order } from '../../../lib/types';
import { ORDER_STATUSES } from '../../../lib/data';

interface OrdersModalProps {
  isOpen: boolean;
  orders: Order[];
  onClose: () => void;
  onReorder: (order: Order) => void;
  onDelete: (orderId: string) => void;
  onNewOrder: () => void;
}

function StatusBadge({ status }: { status: Order['status'] }) {
  const cls =
    status === 3 ? 'bg-accent-50 text-accent' :
    status === 2 ? 'bg-primary-50 text-primary' :
    status === 1 ? 'bg-blue-50 text-blue-600' :
                   'bg-amber-50 text-amber-700';
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${cls}`}>
      {ORDER_STATUSES[status]}
    </span>
  );
}

function OrderProgress({ status }: { status: Order['status'] }) {
  return (
    <div className="flex items-center gap-0 mb-3 px-1">
      {([0, 1, 2, 3] as const).map((s, i) => (
        <div key={s} className="flex items-center flex-1 last:flex-none">
          <div className={`o-step-dot ${s < status ? 'done' : s === status ? 'active' : 'wait'}`}>
            {s < status ? <i className="fas fa-check text-[9px]" /> : s + 1}
          </div>
          {i < 3 && <div className={`o-step-bar ${s < status ? 'filled' : ''}`} />}
        </div>
      ))}
    </div>
  );
}

export default function OrdersModal({ isOpen, orders, onClose, onReorder, onDelete, onNewOrder }: OrdersModalProps) {
  return (
    <div
      className={`modal-overlay ${isOpen ? 'active' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-box">
        <div className="sticky top-0 bg-white rounded-t-2xl px-6 py-4 border-b border-warm-300/50 flex items-center justify-between z-10">
          <h3 className="font-serif font-bold text-lg text-brown-800">我的订单</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-warm-100 flex items-center justify-center text-brown-400 hover:text-brown-800 transition-colors"
            aria-label="关闭"
          >
            <i className="fas fa-xmark text-lg" />
          </button>
        </div>
        <div className="px-6 py-5">
          {orders.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-warm-100 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-clipboard-list text-3xl text-brown-300" />
              </div>
              <p className="text-brown-400 mb-5">暂无订单记录</p>
              <button
                onClick={() => { onClose(); setTimeout(onNewOrder, 350); }}
                className="px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all"
              >
                立即下单
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.id} className="bg-warm-50 rounded-2xl p-4 border border-warm-300/40">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                          o.serviceColor === 'primary' ? 'bg-primary-50 text-primary' : 'bg-accent-50 text-accent'
                        }`}
                      >
                        <i className={`fas ${o.serviceIcon} text-sm`} />
                      </div>
                      <div>
                        <div className="font-semibold text-brown-800 text-sm">{o.serviceName}</div>
                        <div className="text-xs text-brown-400">{o.createdAt}</div>
                      </div>
                    </div>
                    <StatusBadge status={o.status} />
                  </div>
                  <OrderProgress status={o.status} />
                  <div className="flex items-center justify-between text-xs text-brown-400">
                    <span>
                      <i className="fas fa-user mr-1" />
                      {o.name} · {o.addr.slice(0, 15)}{o.addr.length > 15 ? '...' : ''}
                    </span>
                    {o.volunteer ? (
                      <span className="text-accent font-medium">
                        <i className="fas fa-user-graduate mr-1" />{o.volunteer}
                      </span>
                    ) : (
                      <span className="text-amber-600 font-medium">
                        <i className="fas fa-hourglass-half mr-1" />暂无志愿者接单
                      </span>
                    )}
                  </div>
                  {o.status === 0 && (
                    <div className="mt-3 pt-3 border-t border-warm-300/50">
                      <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
                        <i className="fas fa-circle-info" />
                        <span>订单等待中，志愿者上线后将自动派单</span>
                      </div>
                    </div>
                  )}
                  {o.status === 3 && (
                    <div className="mt-3 pt-3 border-t border-warm-300/50 flex gap-2">
                      <button
                        onClick={() => onReorder(o)}
                        className="flex-1 py-2 text-xs font-medium text-primary border border-primary/30 rounded-lg hover:bg-primary-50 transition-colors"
                      >
                        再次下单
                      </button>
                      <button
                        onClick={() => onDelete(o.id)}
                        className="py-2 px-3 text-xs font-medium text-brown-400 border border-warm-300 rounded-lg hover:bg-warm-100 transition-colors"
                      >
                        <i className="fas fa-trash-can" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
