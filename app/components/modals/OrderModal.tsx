'use client';

import { useState, useEffect, Fragment } from 'react';
import { services, VOLUNTEER_COUNT } from '../../../lib/data';
import type { Service, Order } from '../../../lib/types';

type OrderPayload = Omit<Order, 'id' | 'status' | 'createdAt' | 'volunteer'>;

interface OrderModalProps {
  isOpen: boolean;
  preselectedServiceId?: string | null;
  onClose: () => void;
  onSubmit: (payload: OrderPayload) => void;
}

interface FormData {
  name: string;
  phone: string;
  addr: string;
  time: string;
  note: string;
}

const TIME_OPTIONS = [
  { value: '尽快', label: '尽快（优先派单）' },
  { value: '今天上午', label: '今天上午（9:00-12:00）' },
  { value: '今天下午', label: '今天下午（14:00-17:00）' },
  { value: '明天上午', label: '明天上午（9:00-12:00）' },
  { value: '明天下午', label: '明天下午（14:00-17:00）' },
];

function StepIndicator({ current }: { current: number }) {
  const steps = ['选择服务', '填写信息', '确认提交'];
  return (
    <div className="flex items-center gap-1 mb-6">
      {steps.map((label, i) => {
        const n = i + 1;
        const isDone = n < current;
        const isActive = n === current;
        return (
          <Fragment key={n}>
            <div className={`flex items-center gap-1.5 text-xs font-semibold ${isActive ? 'text-primary' : isDone ? 'text-accent' : 'text-brown-300'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${isActive ? 'bg-primary text-white' : isDone ? 'bg-accent text-white' : 'bg-warm-200 text-brown-400'}`}>
                {isDone ? <i className="fas fa-check text-[8px]" /> : n}
              </span>
              {label}
            </div>
            {i < 2 && <div className="flex-1 h-0.5 bg-warm-200 mx-2 rounded" />}
          </Fragment>
        );
      })}
    </div>
  );
}

export default function OrderModal({ isOpen, preselectedServiceId, onClose, onSubmit }: OrderModalProps) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [form, setForm] = useState<FormData>({ name: '', phone: '', addr: '', time: '尽快', note: '' });
  const [dynFields, setDynFields] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      const pre = preselectedServiceId ? (services.find((s) => s.id === preselectedServiceId) ?? null) : null;
      setSelectedService(pre);
      setForm({ name: '', phone: '', addr: '', time: '尽快', note: '' });
      setDynFields({});
      setErrors({});
    }
  }, [isOpen, preselectedServiceId]);

  const validate = (): boolean => {
    const errs: Record<string, boolean> = {};
    if (!form.name.trim()) errs.name = true;
    if (!/^1\d{10}$/.test(form.phone.trim())) errs.phone = true;
    if (!form.addr.trim()) errs.addr = true;
    if (selectedService) {
      selectedService.fields.forEach((f) => {
        if (!dynFields[f.key]?.trim()) errs[`dyn_${f.key}`] = true;
      });
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const goToStep = (target: number) => {
    if (target === 2 && !selectedService) return;
    if (target === 3 && !validate()) return;
    setStep(target);
  };

  const handleSubmit = () => {
    if (!selectedService) return;
    const details: Record<string, string> = {};
    selectedService.fields.forEach((f) => { details[f.label] = dynFields[f.key] ?? ''; });
    onSubmit({
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      serviceIcon: selectedService.icon,
      serviceColor: selectedService.color,
      name: form.name.trim(),
      phone: form.phone.trim(),
      addr: form.addr.trim(),
      time: form.time,
      note: form.note.trim(),
      details,
    });
    onClose();
  };

  const inputCls = (key: string) => `form-input${errors[key] ? ' error' : ''}`;

  return (
    <div
      className={`modal-overlay ${isOpen ? 'active' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-box">
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-2xl px-6 py-4 border-b border-warm-300/50 flex items-center justify-between z-10">
          <h3 className="font-serif font-bold text-lg text-brown-800">为父母下单</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-warm-100 flex items-center justify-center text-brown-400 hover:text-brown-800 transition-colors" aria-label="关闭">
            <i className="fas fa-xmark text-lg" />
          </button>
        </div>
        <div className="px-6 py-5">
          {/* No volunteer warning */}
          {VOLUNTEER_COUNT === 0 && (
            <div className="mb-5 bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3">
              <i className="fas fa-triangle-exclamation text-amber-500 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-amber-800">当前暂无在线志愿者</div>
                <div className="text-xs text-amber-600 mt-0.5">您的订单将进入等待队列，志愿者注册上线后会自动派单通知。</div>
              </div>
            </div>
          )}

          <StepIndicator current={step} />

          {/* Step 1: Service Selection */}
          {step === 1 && (
            <div>
              <p className="text-sm text-brown-400 mb-4">请选择需要的服务类型</p>
              <div className="grid grid-cols-3 gap-2.5">
                {services.map((s) => (
                  <div
                    key={s.id}
                    className={`svc-pick${selectedService?.id === s.id ? ' selected' : ''}`}
                    onClick={() => setSelectedService(s)}
                  >
                    <i className={`fas ${s.icon} text-lg mb-1.5 block ${s.color === 'primary' ? 'text-primary' : 'text-accent'}`} />
                    <div className="text-xs font-semibold text-brown-800">{s.name}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => goToStep(2)}
                disabled={!selectedService}
                className="w-full mt-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                下一步
              </button>
            </div>
          )}

          {/* Step 2: Fill Info */}
          {step === 2 && (
            <div>
              <p className="text-sm text-brown-400 mb-4">请填写老人信息和服务详情</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-brown-800 mb-1">老人姓名 <span className="text-red-400">*</span></label>
                  <input type="text" className={inputCls('name')} placeholder="请输入老人姓名" maxLength={20} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                  {errors.name && <div className="text-xs text-red-500 mt-1">请填写老人姓名</div>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-800 mb-1">联系电话 <span className="text-red-400">*</span></label>
                  <input type="tel" className={inputCls('phone')} placeholder="老人或子女的联系电话" maxLength={11} value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
                  {errors.phone && <div className="text-xs text-red-500 mt-1">请填写正确的手机号码</div>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-800 mb-1">服务地址 <span className="text-red-400">*</span></label>
                  <input type="text" className={inputCls('addr')} placeholder="请输入详细地址（小区名+楼栋+门牌号）" maxLength={100} value={form.addr} onChange={(e) => setForm((f) => ({ ...f, addr: e.target.value }))} />
                  {errors.addr && <div className="text-xs text-red-500 mt-1">请填写服务地址</div>}
                </div>
                {selectedService?.fields.map((f) => (
                  <div key={f.key}>
                    <label className="block text-sm font-medium text-brown-800 mb-1">{f.label} <span className="text-red-400">*</span></label>
                    <input type="text" className={inputCls(`dyn_${f.key}`)} placeholder={f.ph} maxLength={100} value={dynFields[f.key] ?? ''} onChange={(e) => setDynFields((d) => ({ ...d, [f.key]: e.target.value }))} />
                    {errors[`dyn_${f.key}`] && <div className="text-xs text-red-500 mt-1">请填写{f.label}</div>}
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-brown-800 mb-1">期望服务时间</label>
                  <select className="form-input" value={form.time} onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}>
                    {TIME_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-800 mb-1">备注说明</label>
                  <textarea className="form-input" rows={2} placeholder="其他需要说明的事项（选填）" maxLength={200} value={form.note} onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))} />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => goToStep(1)} className="flex-1 py-3 border-2 border-warm-300 text-brown-600 font-semibold rounded-xl hover:bg-warm-100 transition-all">上一步</button>
                <button onClick={() => goToStep(3)} className="flex-1 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all">下一步</button>
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && selectedService && (
            <div>
              <p className="text-sm text-brown-400 mb-4">请确认订单信息</p>
              <div className="bg-warm-50 rounded-2xl p-5 space-y-3 border border-warm-300/50">
                <div className="flex items-center gap-3 pb-3 border-b border-warm-300/50">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedService.color === 'primary' ? 'bg-primary-50 text-primary' : 'bg-accent-50 text-accent'}`}>
                    <i className={`fas ${selectedService.icon}`} />
                  </div>
                  <div>
                    <div className="font-semibold text-brown-800">{selectedService.name}</div>
                    <div className="text-xs text-brown-400">{selectedService.brief}</div>
                  </div>
                </div>
                {[
                  ['老人姓名', form.name],
                  ['联系电话', form.phone],
                  ['服务地址', form.addr],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-brown-400 text-sm">{label}</span>
                    <span className="text-brown-800 text-sm font-medium text-right max-w-[60%]">{val}</span>
                  </div>
                ))}
                {selectedService.fields.map((f) => (
                  <div key={f.key} className="flex justify-between">
                    <span className="text-brown-400 text-sm">{f.label}</span>
                    <span className="text-brown-800 text-sm font-medium">{dynFields[f.key] ?? ''}</span>
                  </div>
                ))}
                <div className="flex justify-between">
                  <span className="text-brown-400 text-sm">期望时间</span>
                  <span className="text-brown-800 text-sm font-medium">{form.time}</span>
                </div>
                {form.note && (
                  <div className="flex justify-between">
                    <span className="text-brown-400 text-sm">备注</span>
                    <span className="text-brown-800 text-sm font-medium text-right max-w-[60%]">{form.note}</span>
                  </div>
                )}
              </div>
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-3">
                <i className="fas fa-clock text-amber-500 mt-0.5 text-sm" />
                <div className="text-xs text-amber-700 leading-relaxed">
                  提交后订单将进入等待队列，当前暂无可用志愿者。志愿者注册上线后系统将自动派单，届时会通过短信通知您。
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => goToStep(2)} className="flex-1 py-3 border-2 border-warm-300 text-brown-600 font-semibold rounded-xl hover:bg-warm-100 transition-all">返回修改</button>
                <button onClick={handleSubmit} className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-md shadow-primary/20">确认提交</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
