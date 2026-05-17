function Modal({ isOpen, title, message, confirmText = "Confirmar", cancelText = "Cancelar", onConfirm, onCancel, isDestructive = false, isLoading = false }) {
  if (!isOpen) return null;

  return (
    <section className="modal-backdrop fixed inset-0 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <section className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 transform transition-all scale-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        
        <section className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className={`px-5 py-2.5 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors font-medium ${isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-5 py-2.5 rounded-md text-white transition-colors font-medium flex items-center justify-center gap-2 ${
              isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
            } ${
              isDestructive 
                ? "bg-red-600 hover:bg-red-700" 
                : "primary-bg-color primary-color-hover"
            }`}
          >
            {isLoading && (
              <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
            )}
            {isLoading ? "Cargando..." : confirmText}
          </button>
        </section>
      </section>
    </section>
  );
}

export default Modal;
