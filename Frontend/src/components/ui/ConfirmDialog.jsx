import React from 'react';

const ConfirmDialog = ({ open, title = 'Confirm', message = '', confirmLabel = 'Confirm', cancelLabel = 'Cancel', loading = false, onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-2">{message}</p>
        </div>
        <div className="flex items-center justify-end gap-3 p-4 border-t bg-gray-50">
          <button onClick={onCancel} className="px-4 py-2 rounded-md bg-white border text-gray-700 hover:bg-gray-100 transition">
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'} transition`}
          >
            {loading ? 'Please wait...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
