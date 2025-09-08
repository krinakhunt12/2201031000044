import React from 'react';
import { motion } from 'framer-motion';

const OrderDetailsModal = ({ selectedOrder, onClose, statusBadgeClass = () => 'bg-gray-100 text-gray-700' }) => {
  if (!selectedOrder) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black bg-opacity-50">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-auto max-h-[90vh]">
        <div className="p-4 border-b flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Order Details</h3>
            <div className="text-sm text-gray-500">#{selectedOrder._id || selectedOrder.id}</div>
          </div>
          <div className="ml-auto text-right">
            <div className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${statusBadgeClass(selectedOrder.status)}`}>
              {selectedOrder.status || 'Pending'}
            </div>
            <div className="text-xs text-gray-500 mt-2">{new Date(selectedOrder.createdAt || selectedOrder.date || selectedOrder.updatedAt).toLocaleString()}</div>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">Close</button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-gray-50 p-4 rounded">
              <h4 className="font-semibold mb-2">Shipping</h4>
              <div className="text-sm text-gray-700">{selectedOrder.shippingAddress?.street}</div>
              <div className="text-sm text-gray-700">{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} {selectedOrder.shippingAddress?.postalCode}</div>
              <div className="text-sm text-gray-700">{selectedOrder.shippingAddress?.country}</div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Items</h4>
              {selectedOrder.products && selectedOrder.products.length > 0 ? (
                <div className="space-y-3">
                  {selectedOrder.products.map((p, idx) => (
                    <div key={idx} className="flex items-center justify-between border rounded p-3">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                          {p.photo ? <img src={p.photo} alt={p.name} className="w-full h-full object-cover" /> : <div className="text-xs text-gray-400">No Image</div>}
                        </div>
                        <div>
                          <div className="font-medium">{p.name}</div>
                          <div className="text-sm text-gray-500">Size: {p.size || 'N/A'} • Color: {p.color || 'N/A'}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">₹{p.price}</div>
                        <div className="text-sm text-gray-500">Qty: {p.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-700">No product details available.</div>
              )}
            </div>
          </div>

          <aside className="bg-white border rounded p-4">
            <h4 className="font-semibold mb-2">Summary</h4>
            <div className="text-sm text-gray-600">Payment: {selectedOrder.payment || '—'}</div>
            {selectedOrder.paymentIntentId && <div className="text-sm text-gray-600">Payment ID: {selectedOrder.paymentIntentId}</div>}
            <div className="mt-4 text-lg font-bold">Total: ₹{Number(selectedOrder.amount || 0).toLocaleString()}</div>
          </aside>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderDetailsModal;
