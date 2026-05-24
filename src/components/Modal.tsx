"use client";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showClose?: boolean;
}

export default function Modal({ open, onClose, children, showClose = true }: ModalProps) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-pop-in" onClick={(e) => e.stopPropagation()}>
        {children}
        {showClose && (
          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 rounded-full bg-gray-200 font-bold text-gray-600 hover:bg-gray-300 transition"
          >
            Fermer
          </button>
        )}
      </div>
    </div>
  );
}
