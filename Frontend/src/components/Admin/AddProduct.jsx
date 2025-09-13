import React, { useState, useEffect } from "react";
import { API_BASE_API } from '../../config/api';
import { getTypesForCategory, addCustomType } from '../../utils/productTypes';

const AddProduct = ({ onAdd, onUpdate, onClose, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: "",
    productType: "",
    category: "Male",
    price: "",
    stock: "",
    status: "Active",
    sales: 0,
    size: [], // now an array
    color: [], // now an array
    description: "",
  });
  const [colorInput, setColorInput] = useState("");
  const [editing, setEditing] = useState(Boolean(initialData));
  const [customTypeInput, setCustomTypeInput] = useState('');
  const [availableTypes, setAvailableTypes] = useState([]);

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // If category is changing, reset productType to prevent invalid combinations
    if (name === 'category') {
      setFormData((prev) => ({ 
        ...prev, 
        [name]: value,
        productType: "" // Reset productType when category changes
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePhotoChange = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  const toggleSize = (sizeValue) => {
    setFormData((prev) => {
      const sizes = Array.isArray(prev.size) ? [...prev.size] : [];
      const idx = sizes.indexOf(sizeValue);
      if (idx > -1) sizes.splice(idx, 1);
      else sizes.push(sizeValue);
      return { ...prev, size: sizes };
    });
  };

  const addColor = () => {
    const val = (colorInput || "").trim();
    if (!val) return;
    setFormData((prev) => {
      const colors = Array.isArray(prev.color) ? [...prev.color] : [];
      if (!colors.includes(val)) colors.push(val);
      return { ...prev, color: colors };
    });
    setColorInput("");
  };

  const removeColor = (idx) => {
    setFormData((prev) => {
      const colors = Array.isArray(prev.color) ? [...prev.color] : [];
      colors.splice(idx, 1);
      return { ...prev, color: colors };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!formData.name || !formData.productType || !formData.category || !formData.price) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (!Array.isArray(formData.size) || formData.size.length === 0) {
      setError('Please select at least one size');
      setLoading(false);
      return;
    }

    if (!Array.isArray(formData.color) || formData.color.length === 0) {
      setError('Please add at least one color');
      setLoading(false);
      return;
    }

    // Validate that the product type is valid for the selected category
    // Accept dynamic types (defaults + admin-added types) using the helper.
    try {
      const allowed = getTypesForCategory(formData.category || 'Male').map(t => String(t).trim());
      if (!allowed.includes(String(formData.productType).trim())) {
        setError(`Invalid product type "${formData.productType}" for ${formData.category} category`);
        setLoading(false);
        return;
      }
    } catch (e) {
      // Fallback: if the helper fails, allow the submission (backend accepts arbitrary productType)
      console.warn('product type validation helper failed', e);
    }

    try {
      const form = new FormData();
      for (const key of Object.keys(formData)) {
        const value = formData[key];
        if (Array.isArray(value)) {
          value.forEach((v) => form.append(key, v));
        } else {
          form.append(key, value != null ? value : "");
        }
      }
      photos.forEach((file) => form.append("photos", file));
      let data;
      if (editing && initialData && initialData._id) {
        // update existing product (use PUT with form data)
        const res = await fetch(`${API_BASE_API}/products/update/${initialData._id}`, {
          method: 'PUT',
          body: form
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error('Failed to update product: ' + text);
        }
        data = await res.json();
        setSuccess(true);
        if (onUpdate) onUpdate(data.product || data);
      } else {
        const response = await fetch(`${API_BASE_API}/products/add`, {
          method: "POST",
          body: form,
        });

        if (!response.ok) {
          let errorText = await response.text();
          throw new Error("Failed to add product: " + errorText);
        }

        data = await response.json();
        setSuccess(true);
        setFormData({
          name: "",
          productType: "",
          category: "Male",
          price: "",
          stock: "",
          status: "Active",
          sales: 0,
          size: [],
          color: [],
          description: "",
        });
        setColorInput("");
        setPhotos([]);
        // Notify admin dashboard to refresh data without calling parent's add handler
        // (Products.handleAddProduct itself also posted to the API which caused a duplicate entry)
        try { window.dispatchEvent(new Event('adminDataUpdated')); } catch (e) {}
      }

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1200);
    } catch (error) {
      setError(error.message || "Error adding product");
    } finally {
      setLoading(false);
    }
  };

  // Initialize form when editing
  React.useEffect(() => {
    if (initialData) {
      const copy = {
        name: initialData.name || '',
        productType: initialData.productType || initialData.type || '',
        category: initialData.category || 'Male',
        price: initialData.price || '',
        stock: initialData.stock || '',
        status: initialData.status || 'Active',
        sales: initialData.sales || 0,
        size: Array.isArray(initialData.size) ? initialData.size : (initialData.size ? String(initialData.size).split(',').map(s=>s.trim()).filter(Boolean) : []),
        color: Array.isArray(initialData.color) ? initialData.color : (initialData.color ? String(initialData.color).split(',').map(s=>s.trim()).filter(Boolean) : []),
        description: initialData.description || '',
      };
      setFormData(copy);
      // if initial colors present, ensure colorInput is empty
      setColorInput("");
      setEditing(true);
    }
    // update available types whenever category changes or on mount
    setAvailableTypes(getTypesForCategory(initialData?.category || 'Male'));
  }, [initialData]);

  // update available types when category changes in the form
  useEffect(() => {
    setAvailableTypes(getTypesForCategory(formData.category || 'Male'));
  }, [formData.category]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-emerald-100">
      <div className="flex items-center justify-center w-full h-full">
        <div className="bg-white rounded-2xl p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Add New Product</h2>
          
          {/* Category and Product Type Indicator */}
          {formData.category && formData.productType && (
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">
                    {formData.category === "Male" ? "👨" : formData.category === "Female" ? "👩" : "👶"}
                  </span>
                  <span className="font-semibold text-gray-800">{formData.category}</span>
                </div>
                <span className="text-gray-400">→</span>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">
                    {formData.productType === "T-Shirts" ? "👕" : 
                     formData.productType === "Shirts" ? "👔" :
                     formData.productType === "Jackets" ? "🧥" :
                     formData.productType === "Jeans" ? "👖" :
                     formData.productType === "Shorts" ? "🩳" :
                     formData.productType === "Sweaters" ? "🧶" :
                     formData.productType === "Dresses" ? "👗" :
                     formData.productType === "Tops" ? "👚" :
                     formData.productType === "Skirts" ? "👘" :
                     formData.productType === "Pants" ? "👖" : "👕"}
                  </span>
                  <span className="font-semibold text-gray-800">{formData.productType}</span>
                </div>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Product Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 block w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>

         
           {/* Product Type Dropdown */}
<div>
  <label className="block text-sm font-semibold text-gray-700">
    Product Type
    {formData.category && (
      <span className="ml-2 text-xs text-gray-500">
        ({formData.category} Collection)
      </span>
    )}
  </label>
  <select
    name="productType"
    value={formData.productType}
    onChange={handleChange}
    className={`mt-2 block w-full border rounded-lg px-3 py-2 transition-all duration-200 ${
      formData.category 
        ? 'border-blue-300 bg-blue-50 focus:border-blue-500 focus:ring-blue-500' 
        : 'border-gray-300 focus:border-gray-500 focus:ring-gray-500'
    }`}
    required
    disabled={!formData.category}
  >
    <option value="">
      {formData.category 
        ? `Select ${formData.category} Product Type` 
        : 'Select Category First'
      }
    </option>
    {availableTypes.map((t) => (
      <option key={t} value={t}>{t}</option>
    ))}
  </select>
  {formData.category && !formData.productType && (
    <p className="mt-1 text-xs text-blue-600">
      Choose a product type from the {formData.category} collection
    </p>
  )}
</div>

{/* Inline add custom product type (admin) */}
<div className="mt-3">
  <label className="block text-sm font-semibold text-gray-700">Add Custom Product Type (optional)</label>
  <div className="mt-2 flex gap-2">
    <input
      type="text"
      value={customTypeInput}
      onChange={(e) => setCustomTypeInput(e.target.value)}
      placeholder={`e.g. Ethnic Kurta`}
      className="block w-full border border-gray-300 rounded-lg px-3 py-2"
    />
    <button type="button" onClick={() => {
      const added = addCustomType(formData.category || 'Male', customTypeInput.trim());
      if (added) {
        setAvailableTypes(getTypesForCategory(formData.category || 'Male'));
        setFormData(prev => ({ ...prev, productType: customTypeInput.trim() }));
        setCustomTypeInput('');
      } else {
        // Could show a toast here; keep simple
        setCustomTypeInput('');
      }
    }} className="px-3 py-2 bg-green-600 text-white rounded">Add</button>
  </div>
</div>

              {/* Category Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-2 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                  required
                >
                  <option value="Male">👨 Male</option>
                  <option value="Female">👩 Female</option>
                  <option value="Kids">👶 Kids</option>
                </select>
                {formData.category && (
                  <p className="mt-1 text-xs text-green-600">
                    ✓ {formData.category} category selected
                  </p>
                )}
              </div>

                  {/* Size checkboxes (multiple) */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Sizes (select one or more)</label>
                    <div className="mt-2 grid grid-cols-4 gap-2">
                      {['XXS','XS','S','M','L','XL','2XL','3XL'].map((sz) => (
                        <label key={sz} className="inline-flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={Array.isArray(formData.size) ? formData.size.includes(sz) : false}
                            onChange={() => toggleSize(sz)}
                            className="form-checkbox h-4 w-4 text-blue-600"
                          />
                          <span className="text-sm">{sz}</span>
                        </label>
                      ))}
                    </div>
                  </div>

              {/* Color tags (multiple) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">Colors (add one or more)</label>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addColor(); } }}
                    placeholder="Type color and press Enter"
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                  <button type="button" onClick={addColor} className="px-3 py-2 bg-blue-600 text-white rounded">Add</button>
                </div>
                {Array.isArray(formData.color) && formData.color.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.color.map((c, idx) => (
                      <span key={idx} className="bg-gray-100 px-2 py-1 rounded inline-flex items-center gap-2">
                        <span className="text-xs">{c}</span>
                        <button type="button" onClick={() => removeColor(idx)} className="text-red-500 text-xs">×</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-2 block w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="mt-2 block w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-2 block w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="mt-2 block w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Write product details here..."
                />
              </div>

              {/* Photos */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700">Product Photos</label>
                <input
                  type="file"
                  name="photos"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="mt-2 block w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                {photos.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {photos.map((file, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">{file.name}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Feedback */}
            {loading && <div className="text-blue-600 text-center">Adding product...</div>}
            {error && <div className="text-red-600 text-center">{error}</div>}
            {success && <div className="text-green-600 text-center">Product added successfully!</div>}

        {/* Buttons */}
            <div className="flex justify-end space-x-3 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
          className="px-5 py-2 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-lg font-semibold"
                disabled={loading}
              >
          {editing ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
