import React from 'react';

const OrderCard = ({ o = {}, onView = () => {} }) => {
  const id = o._id || o.id || o.orderId;
  const when = o.createdAt ? new Date(o.createdAt) : (o.date ? new Date(o.date) : null);
  const total = Number(o.amount || 0).toLocaleString();
  const status = o.status || 'pending';

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
          {o.products && o.products[0] && o.products[0].photo ? (
            <img src={o.products[0].photo} alt={o.products[0].name} className="w-full h-full object-cover" />
          ) : (
            <div className="text-gray-400 text-sm">No Image</div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-500">Order</div>
              <div className="font-medium text-gray-900">#{id}</div>
              <div className="text-xs text-gray-400 mt-1">{when ? when.toLocaleString() : '—'}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-900">₹{total}</div>
              <div className="mt-2">
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${status === 'Delivered' ? 'bg-green-100 text-green-800' : status === 'Shipped' ? 'bg-blue-100 text-blue-800' : status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {status}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 text-sm text-gray-700">
            {o.products && o.products.length > 0 ? (
              <ul className="space-y-1">
                {o.products.slice(0,3).map((p, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span className="truncate max-w-[200px]">{p.name}</span>
                    <span className="text-sm text-gray-600">x{p.quantity} • ₹{p.price}</span>
                  </li>
                ))}
                {o.products.length > 3 && (
                  <li className="text-xs text-gray-500">+{o.products.length - 3} more items</li>
                )}
              </ul>
            ) : (
              <div>Items: {o.items || 'N/A'}</div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-gray-500">Payment: {o.payment || o.paymentMethod || '—'}</div>
            <div className="flex items-center space-x-2">
              <button onClick={() => onView(id)} className="px-3 py-1 text-sm bg-black text-white rounded">View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
