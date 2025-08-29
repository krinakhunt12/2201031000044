import React, { useState } from "react";

const AddProduct = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    productType: "",
    category: "Male",
    price: "",
    stock: "",
    status: "Active",
    sales: 0,
    size: "",
    color: "",
    description: "",
  });

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

    // Validate that the product type is valid for the selected category
    const validProductTypes = {
      Male: ["T-Shirts", "Shirts", "Jackets", "Jeans", "Shorts", "Sweaters"],
      Female: ["Dresses", "Tops", "Skirts", "Jeans", "Jackets", "Sweaters"],
      Kids: ["T-Shirts", "Dresses", "Pants", "Jackets", "Sweaters", "Shorts"]
    };

    if (!validProductTypes[formData.category].includes(formData.productType)) {
      setError(`Invalid product type "${formData.productType}" for ${formData.category} category`);
      setLoading(false);
      return;
    }

    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => form.append(key, formData[key]));
      photos.forEach((file) => form.append("photos", file));

      const response = await fetch("http://localhost:5000/api/products/add", {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        let errorText = await response.text();
        throw new Error("Failed to add product: " + errorText);
      }

      const data = await response.json();
      setSuccess(true);
      setFormData({
        name: "",
        productType: "",
        category: "Male",
        price: "",
        stock: "",
        status: "Active",
        sales: 0,
        size: "",
        color: "",
        description: "",
      });
      setPhotos([]);

      if (onAdd) onAdd(data.product);
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
    {formData.category === "Male" && (
      <>
        <option value="T-Shirts" className="flex items-center">
          👕 T-Shirts
        </option>
        <option value="Shirts">
          👔 Shirts
        </option>
        <option value="Jackets">
          🧥 Jackets
        </option>
        <option value="Jeans">
          👖 Jeans
        </option>
        <option value="Shorts">
          🩳 Shorts
        </option>
        <option value="Sweaters">
          🧶 Sweaters
        </option>
      </>
    )}
    {formData.category === "Female" && (
      <>
        <option value="Dresses">
          👗 Dresses
        </option>
        <option value="Tops">
          👚 Tops
        </option>
        <option value="Skirts">
          👘 Skirts
        </option>
        <option value="Jeans">
          👖 Jeans
        </option>
        <option value="Jackets">
          🧥 Jackets
        </option>
        <option value="Sweaters">
          🧶 Sweaters
        </option>
      </>
    )}
    {formData.category === "Kids" && (
      <>
        <option value="T-Shirts">
          👕 T-Shirts
        </option>
        <option value="Dresses">
          👗 Dresses
        </option>
        <option value="Pants">
          👖 Pants
        </option>
        <option value="Jackets">
          🧥 Jackets
        </option>
        <option value="Sweaters">
          🧶 Sweaters
        </option>
        <option value="Shorts">
          🩳 Shorts
        </option>
      </>
    )}
  </select>
  {formData.category && !formData.productType && (
    <p className="mt-1 text-xs text-blue-600">
      Choose a product type from the {formData.category} collection
    </p>
  )}
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

              {/* Size Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">Size</label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="mt-2 block w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                >
                  <option value="">Select Size</option>
                  <option value="XXS">XXS</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="2XL">2XL</option>
                  <option value="3XL">3XL</option>
                </select>
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">Color</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="mt-2 block w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
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
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
