import React, { useState } from "react";
import { productAPI } from "../../services/api";
import {
  Search,
  Plus,
  Filter,
  Download,
  ChevronUp,
  ChevronDown,
  Package,
  Eye,
  Edit,
  Trash2,
  X,
} from "lucide-react";
import AddProduct from "./AddProduct";
import ConfirmDialog from '../ui/ConfirmDialog';
import { useToast } from '../../contexts/ToastContext';

const Products = ({
  searchQuery,
  setSearchQuery,
  filteredProducts,
  sortConfig,
  handleSort,
  getStatusColor,
}) => {
  // Helper to coerce a possibly-string or missing value into an array
  const toArray = (val) => {
    if (Array.isArray(val)) return val;
    if (val === undefined || val === null) return [];
    // If it's an object with keys (unlikely for sizes/colors), return empty
    if (typeof val === 'object') return [];
    // If it's a string, split on comma
    return String(val).split(',').map(s => s.trim()).filter(Boolean);
  };
  // Products state is managed in AdminDashboard and passed as props
  const [showAddForm, setShowAddForm] = useState(false);
  const [editProductData, setEditProductData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [activeFilter, setActiveFilter] = useState("all");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  // API: Add Product
  const handleAddProduct = async (productData) => {
    try {
      await productAPI.addProduct(productData);
      setShowAddForm(false);
      try { window.dispatchEvent(new Event('adminDataUpdated')); } catch (e) {}
    } catch (err) {
      console.error('Failed to add product', err);
      showError('Failed to add product');
    }
  };

  // API: Edit Product
  const handleEditProduct = async (id, productData) => {
  // open edit modal with product data
  setEditProductData(productData);
  setShowAddForm(true);
  };

  // API: Delete Product
  const handleDeleteProduct = async (id) => {
    // open confirm dialog instead
    setDeleteTarget(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDeleteProduct = async () => {
    if (!deleteTarget) return;
    try {
      setDeleteLoading(true);
      await productAPI.deleteProduct(deleteTarget);
  setDeleteConfirmOpen(false);
  setDeleteTarget(null);
  showSuccess('Product deleted');
  try { window.dispatchEvent(new Event('adminDataUpdated')); } catch (e) {}
    } catch (err) {
      console.error('Failed to delete product', err);
      showError('Failed to delete product');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Apply status filter to the incoming filteredProducts prop
  const filteredByStatus = filteredProducts.filter((product) => {
    if (!activeFilter || activeFilter === 'all') return true;
    try {
      return (product.status || '').toString().toLowerCase() === activeFilter.toString().toLowerCase();
    } catch (e) {
      return false;
    }
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredByStatus.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredByStatus.length / itemsPerPage);

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

  // Status filter options
  const statusFilters = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "draft", label: "Draft" },
    { id: "archived", label: "Archived" },
  ];

  return (
    <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Products Management</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your product inventory and details
          </p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {filteredByStatus.length} {filteredByStatus.length === 1 ? "product" : "products"} found
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black w-full transition-all duration-200"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>

          {/* Add Product Button */}
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center justify-center space-x-2 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {statusFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
              activeFilter === filter.id
                ? "bg-black text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Filters & Export */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-lg border">
        <div className="flex space-x-2 mb-2 sm:mb-0">
          <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 border rounded-md bg-white hover:bg-gray-50 transition-colors duration-200">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 border rounded-md bg-white hover:bg-gray-50 transition-colors duration-200">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
        <div className="text-sm text-gray-500">
          {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg border shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["name", "category", "price", "stock", "status", "sales"].map(
                (key) => (
                  <th
                    key={key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => handleSort(key)}
                  >
                    <div className="flex items-center capitalize">
                      {key}
                      {sortConfig.key === key &&
                        (sortConfig.direction === "asc" ? (
                          <ChevronUp className="ml-1 w-4 h-4" />
                        ) : (
                          <ChevronDown className="ml-1 w-4 h-4" />
                        ))}
                    </div>
                  </th>
                )
              )}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.length > 0 ? (
              currentItems.map((product) => (
                <tr key={product._id || product.id || Math.random()} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                        {product.photos && product.photos[0] ? (
                          <img
                            src={product.photos[0]}
                            alt={product.name}
                            className="h-full w-full object-cover rounded-md"
                          />
                        ) : (
                          <Package className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          SKU: {(product.id ? product.id.toString().padStart(4, "0") : product._id || "N/A")}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded-full inline-block">
                        {product.category}
                      </span>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {toArray(product.size).slice(0,6).map((s, i) => (
                          <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">{s}</span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ₹{product.price ? product.price.toLocaleString() : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`h-2 w-2 rounded-full mr-2 ${
                          product.stock > 10 ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                      <span className="text-sm text-gray-700">
                        {product.stock} in stock
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        product.status
                      )}`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.sales ? product.sales.toLocaleString() : "0"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {toArray(product.color).map((c, i) => (
                        <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">{c}</span>
                      ))}
                    </div>
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
                      onClick={() => handleEditProduct(product._id, product)}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
                      title="Delete"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <Package className="w-12 h-12 mb-4 text-gray-300" />
                    <p className="text-lg font-medium">No products found</p>
                    <p className="text-sm mt-1">
                      Try adjusting your search or filter criteria
                    </p>
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="mt-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center justify-center space-x-2 transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Product</span>
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-3 bg-white rounded-lg border shadow-sm">
          <div className="text-sm text-gray-500 mb-2 sm:mb-0">
            Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(indexOfLastItem, filteredProducts.length)}
            </span>{" "}
            of <span className="font-medium">{filteredProducts.length}</span>{" "}
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

      {/* Add Product Modal */}
      {showAddForm && (
        <AddProduct
          onAdd={handleAddProduct}
          onUpdate={() => { try { window.dispatchEvent(new Event('adminDataUpdated')); } catch(e){} }}
          initialData={editProductData}
          onClose={() => { setShowAddForm(false); setEditProductData(null); }}
        />
      )}
      <ConfirmDialog
        open={deleteConfirmOpen}
        title="Delete Product"
        message="Are you sure you want to permanently delete this product? This cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        loading={deleteLoading}
        onConfirm={confirmDeleteProduct}
        onCancel={() => { setDeleteConfirmOpen(false); setDeleteTarget(null); }}
      />
    </div>
  );
};

export default Products;