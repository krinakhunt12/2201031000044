import React, { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Edit,
  CreditCard,
  Shield,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const Orders = ({ searchQuery, setSearchQuery, filteredOrders, getStatusColor }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sorting functionality
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

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

  // Sort orders if sortConfig is not null
  const sortedOrders = [...currentItems].sort((a, b) => {
    if (sortConfig.key) {
      const key = sortConfig.key.toLowerCase().replace(' ', '');
      if (a[key] < b[key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Orders Management</h2>
          <p className="text-sm text-gray-500 mt-1">Track and manage customer orders</p>
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
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black w-full transition-all duration-200"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Filter Button */}
          <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white rounded-lg border shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
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
            {sortedOrders.length > 0 ? (
              sortedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                    <div className="text-xs text-gray-500">{order.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ₹{order.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.items}</div>
                    <div className="text-xs text-gray-500">{order.quantity} items</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {order.payment === "Credit Card" && (
                        <CreditCard className="w-4 h-4 mr-2 text-blue-500" />
                      )}
                      {order.payment === "PayPal" && (
                        <Shield className="w-4 h-4 mr-2 text-blue-500" />
                      )}
                      <span className="text-sm text-gray-700">{order.payment}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.date}</div>
                    <div className="text-xs text-gray-500">{order.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-1">
                    <button
                      className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition-colors duration-200"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="text-green-600 hover:text-green-900 p-2 rounded-full hover:bg-green-50 transition-colors duration-200"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <CreditCard className="w-12 h-12 mb-4 text-gray-300" />
                    <p className="text-lg font-medium">No orders found</p>
                    <p className="text-sm mt-1">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredOrders.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-3 bg-white rounded-lg border shadow-sm">
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
};

export default Orders;