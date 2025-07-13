import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#18181b] rounded-2xl shadow-xl p-6 relative min-w-[320px] max-w-lg w-full border border-gray-700 text-[#f8f5f0]">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-3xl font-bold bg-transparent border-none shadow-none p-0 m-0"
          style={{ background: 'none', border: 'none', boxShadow: 'none', fontSize: '2.25rem', lineHeight: 1 }}
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal; 