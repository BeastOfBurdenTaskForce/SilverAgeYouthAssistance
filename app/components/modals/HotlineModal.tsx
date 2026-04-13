'use client';

interface HotlineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopied: () => void;
}

export default function HotlineModal({ isOpen, onClose, onCopied }: HotlineModalProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText('4001234567').then(() => {
      onCopied();
      onClose();
    }).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = '4001234567';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      onCopied();
      onClose();
    });
  };

  return (
    <div
      className={`modal-overlay ${isOpen ? 'active' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-box" style={{ maxWidth: 400 }}>
        <div className="px-6 py-8 text-center">
          <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-5 shadow-lg shadow-accent/20 pulse">
            <i className="fas fa-phone-volume text-white text-3xl" />
          </div>
          <h3 className="font-serif font-bold text-xl text-brown-800 mb-2">统一服务热线</h3>
          <p className="text-brown-400 text-sm mb-5">老人无需使用智能手机，拨打下方电话即可获得人工协助</p>
          <div className="bg-accent-50 border border-accent/15 rounded-2xl p-5 mb-5">
            <div className="text-3xl font-bold text-accent tracking-wider font-serif">400-123-4567</div>
            <div className="text-xs text-accent/60 mt-2">服务时间：每天 8:00 - 20:00</div>
          </div>
          <div className="flex gap-3">
            <a
              href="tel:4001234567"
              className="flex-1 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-all flex items-center justify-center gap-2"
            >
              <i className="fas fa-phone" /> 立即拨打
            </a>
            <button
              onClick={handleCopy}
              className="flex-1 py-3 border-2 border-accent text-accent font-semibold rounded-xl hover:bg-accent-50 transition-all flex items-center justify-center gap-2"
            >
              <i className="fas fa-copy" /> 复制号码
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
