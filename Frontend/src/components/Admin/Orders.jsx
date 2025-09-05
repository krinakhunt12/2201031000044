import React, { useState } from "react";
import { orderAPI } from "../../services/api";
import {
  Search,
  Filter,
  Eye,
  Edit,
  CreditCard,
  Shield,
  ChevronDown,
  ChevronUp,
  Package,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Calendar,
  User as UserIcon,
} from "lucide-react";
import ConfirmDialog from "../ui/ConfirmDialog";
import { useToast } from '../../contexts/ToastContext';

const Orders = ({ searchQuery, setSearchQuery, filteredOrders, getStatusColor }) => {
  // Sorting and pagination handled in parent (AdminDashboard)
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [editingStatus, setEditingStatus] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTargetId, setConfirmTargetId] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { showSuccess, showError } = useToast();
  const itemsPerPage = 5;

  // Sorting functionality
  // Sorting functionality is handled in parent (AdminDashboard)
  const sortConfig = typeof window !== 'undefined' && window.sortConfig ? window.sortConfig : { key: null, direction: 'asc' };
  const handleSort = () => {};

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // View order details
  const handleViewOrder = async (orderId) => {
    try {
      const response = await orderAPI.getOrderById(orderId);
      setSelectedOrder(response.order);
      setShowOrderDetails(true);
    } catch (error) {
      console.error('Error fetching order details:', error);
      alert('Failed to load order details');
    }
  };

  // Handle status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderAPI.updateOrderStatus(orderId, newStatus);
      setEditingStatus(null);
  try { window.dispatchEvent(new Event('adminDataUpdated')); } catch (e) {}
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    }
  };

  const statusOptions = ['pending', 'Paid', 'Payment Failed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];


  // API: Add Order
  const handleAddOrder = async (orderData) => {
    try {
      // This would require creating an addOrder API endpoint
      console.log('Add order functionality not implemented yet');
  try { window.dispatchEvent(new Event('adminDataUpdated')); } catch (e) {}
    } catch (err) {
      alert('Failed to add order');
    }
  };

  // API: Edit Order Status
  const handleEditOrder = async (id, orderData) => {
    try {
      await orderAPI.updateOrderStatus(id, orderData.status);
  try { window.dispatchEvent(new Event('adminDataUpdated')); } catch (e) {}
    } catch (err) {
      alert('Failed to update order');
    }
  };

  // API: Delete Order
  const handleDeleteOrder = async (id) => {
    // Open confirm dialog
    setConfirmTargetId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!confirmTargetId) return;
    try {
      setConfirmLoading(true);
      await orderAPI.deleteOrder(confirmTargetId);
  setConfirmOpen(false);
  setConfirmTargetId(null);
  showSuccess('Order deleted');
  // notify admin UI to refresh stats/lists
  try { window.dispatchEvent(new Event('adminDataUpdated')); } catch (e) {}
    } catch (err) {
      console.error('Failed to delete order', err);
      showError('Failed to delete order');
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
  <div className="space-y-8 p-8 bg-gradient-to-br from-blue-50 via-white to-emerald-50 rounded-2xl shadow-xl border border-gray-100">
      {/* Header */}
  <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Orders Management</h2>
          <p className="text-sm text-gray-500 mt-2">Track and manage customer orders</p>
        </div>
  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 w-full transition-all duration-200"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Filter Button */}
          <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-blue-50 transition-colors duration-200 shadow-sm">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Orders Table */}
  <div className="overflow-x-auto bg-white rounded-2xl border shadow-lg">
  <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {[
                { label: "Order ID", key: "id" },
                { label: "Customer", key: "customer" },
                { label: "Amount", key: "amount" },
                { label: "Items", key: "items" },
                { label: "Payment", key: "payment" },
                { label: "Status", key: "status" },
                { label: "Date", key: "date" },
              ].map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => handleSort(col.key)}
                >
                  <div className="flex items-center">
                    {col.label}
                    {sortConfig.key === col.key && (
                      sortConfig.direction === 'asc' ? (
                        <ChevronUp className="ml-1 w-4 h-4" />
                      ) : (
                        <ChevronDown className="ml-1 w-4 h-4" />
                      )
                    )}
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.length > 0 ? (
              currentItems.map((order) => {
                const id = order._id || order.id || order.orderId;
                return (
                  <tr key={id} className="hover:bg-blue-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                      <div className="text-xs text-gray-500">{order.email || 'No email'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{Number(order.amount || 0).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.products && order.products.length > 0 ? order.products.slice(0,3).map(p => p.name).join(', ') : order.items || 'Unknown items'}</div>
                      <div className="text-xs text-gray-500">{order.products && order.products.length > 0 ? `${order.products.reduce((sum, p) => sum + (p.quantity||0), 0)} items` : `${order.quantity || 1} items`}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {order.payment === 'Razorpay' ? <CreditCard className="w-4 h-4 mr-2 text-green-500" /> : order.payment ? <CreditCard className="w-4 h-4 mr-2 text-blue-500" /> : null}
                        <span className="text-sm text-gray-700">{order.payment || 'Unknown'}</span>
                      </div>
                      {order.paymentStatus && <div className="text-xs text-gray-500 mt-1">Payment: {order.paymentStatus}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingStatus === id ? (
                        <select className="text-xs border rounded px-2 py-1" defaultValue={order.status} onChange={(e) => handleStatusChange(id, e.target.value)} onBlur={() => setEditingStatus(null)} autoFocus>
                          {statusOptions.map(status => <option key={status} value={status}>{status}</option>)}
                        </select>
                      ) : (
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full cursor-pointer ${getStatusColor(order.status)}`} onClick={() => setEditingStatus(id)} title="Click to edit status">{order.status}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.date || new Date(order.createdAt || '').toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500">{order.time || new Date(order.createdAt || '').toLocaleTimeString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-1">
                      <button className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-100 transition-colors duration-200 shadow" title="View Details" onClick={() => handleViewOrder(id)}><Eye className="w-4 h-4" /></button>
                      <button className="text-green-600 hover:text-green-900 p-2 rounded-full hover:bg-green-100 transition-colors duration-200 shadow" title="Edit Status" onClick={() => setEditingStatus(id)}><Edit className="w-4 h-4" /></button>
                      <button className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-100 transition-colors duration-200 shadow" title="Delete Order" onClick={() => handleDeleteOrder(id)}><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <CreditCard className="w-12 h-12 mb-4 text-gray-300" />
                    <p className="text-lg font-medium">No orders found</p>
                    <p className="text-sm mt-1">Try adjusting your search or filter criteria</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredOrders.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-3 bg-white rounded-2xl border shadow-lg mt-4">
          <div className="text-sm text-gray-500 mb-2 sm:mb-0">
            Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(indexOfLastItem, filteredOrders.length)}
            </span>{" "}
            of <span className="font-medium">{filteredOrders.length}</span>{" "}
            results
          </div>
          <div className="flex space-x-1">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 border rounded-md text-sm font-medium ${
                    currentPage === number
                      ? "text-white bg-black hover:bg-gray-800"
                      : "text-gray-700 bg-white hover:bg-gray-50"
                  } transition-colors duration-200`}
                >
                  {number}
                </button>
              )
            )}
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );

  {showOrderDetails && selectedOrder && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-2xl bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-900">Order Details</h3>
            <button
              onClick={() => setShowOrderDetails(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Order Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Order Information</h4>
                <p className="text-sm text-gray-600">Order ID: #{selectedOrder._id}</p>
                <p className="text-sm text-gray-600">Date: {new Date(selectedOrder.date || selectedOrder.createdAt).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600">Status: 
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </p>
                <p className="text-sm text-gray-600">Payment: {selectedOrder.payment}</p>
                {selectedOrder.paymentIntentId && (
                  <p className="text-sm text-gray-600">Payment ID: {selectedOrder.paymentIntentId}</p>
                )}
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Customer Information</h4>
                <div className="flex items-center mb-1">
                  <UserIcon className="w-4 h-4 mr-2 text-gray-500" />
                  <p className="text-sm text-gray-600">{selectedOrder.customer}</p>
                </div>
                {selectedOrder.email && (
                  <div className="flex items-center mb-1">
                    <Mail className="w-4 h-4 mr-2 text-gray-500" />
                    <p className="text-sm text-gray-600">{selectedOrder.email}</p>
                  </div>
                )}
                {selectedOrder.phoneNumber && (
                  <div className="flex items-center mb-1">
                    <Phone className="w-4 h-4 mr-2 text-gray-500" />
                    <p className="text-sm text-gray-600">{selectedOrder.phoneNumber}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Shipping Address */}
            {selectedOrder.shippingAddress && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  <h4 className="font-semibold text-gray-900">Shipping Address</h4>
                </div>
                <div className="text-sm text-gray-600">
                  <p>{selectedOrder.shippingAddress.street}</p>
                  <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.postalCode}</p>
                  <p>{selectedOrder.shippingAddress.country}</p>
                </div>
              </div>
            )}

            {/* Order Items */}
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center mb-3">
                <Package className="w-5 h-5 mr-2 text-green-600" />
                <h4 className="font-semibold text-gray-900">Order Items</h4>
              </div>
              {selectedOrder.products && selectedOrder.products.length > 0 ? (
                <div className="space-y-2">
                  {selectedOrder.products.map((product, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-green-200 last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">
                          Size: {product.size || 'N/A'} | Color: {product.color || 'N/A'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">₹{product.price}</p>
                        <p className="text-sm text-gray-600">Qty: {product.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No product details available</p>
              )}
            </div>

            {/* Order Total */}
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-gray-900">Total Amount</h4>
                <p className="text-2xl font-bold text-gray-900">₹{selectedOrder.amount.toLocaleString()}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                onClick={() => setEditingStatus(selectedOrder._id)}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Update Status
              </button>
              <button
                onClick={() => setShowOrderDetails(false)}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    {/* Confirmation dialog for delete actions */}
    <ConfirmDialog
      open={confirmOpen}
      title="Delete Order"
      message="Are you sure you want to permanently delete this order? This action cannot be undone."
      confirmLabel="Delete"
      cancelLabel="Cancel"
      loading={confirmLoading}
      onConfirm={handleConfirmDelete}
      onCancel={() => { setConfirmOpen(false); setConfirmTargetId(null); }}
    />
  
};

export default Orders;