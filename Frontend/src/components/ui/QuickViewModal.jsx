import React, { useState, useEffect } from 'react';
import Modal from '../Users/ui/Modal';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../features/cart/cartSlice';
import { useToast } from '../../contexts/ToastContext';

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const { showSuccess } = useToast();
  // Support both `sizes` (array) and `size` (single value)
  const availableSizes = product?.sizes && product.sizes.length > 0 ? product.sizes : (product?.size ? (Array.isArray(product.size) ? product.size : String(product.size).split(',').map(s=>s.trim()).filter(Boolean)) : []);
  const [selectedSize, setSelectedSize] = useState(availableSizes[0] || '');
  // Reset selected size when product changes
  useEffect(() => {
    setSelectedSize(availableSizes[0] || '');
  }, [product?.id, product?._id, (availableSizes || []).join('|')]);
  const [isLoading, setIsLoading] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    // Allow adding when there are no size requirements
    if (availableSizes.length > 0 && !selectedSize) return;
    setIsLoading(true);
    const itemId = product._id || product.id || product.sku || Math.random().toString(36).slice(2,9);
    const price = product.price || product.salePrice || 0;
    dispatch(addToCart({
      id: itemId,
      _id: product._id,
      name: product.name,
      price,
      photos: product.photos || product.images || [],
      image: product.image || (product.photos && product.photos[0]) || null,
      selectedSize,
      quantity: 1,
      totalPrice: price * 1,
    }));
    showSuccess('Product added to cart');
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 w-full max-w-md">
        <img src={product.photos?.[0] || product.image || (product.images && product.images[0])} alt={product.name} className="w-full h-48 object-cover rounded mb-4" />
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">{product.name}</h2>
            <p className="text-gray-600 mb-2 text-sm">{product.description}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">₹{(product.price || 0).toLocaleString('en-IN')}</div>
            {product.onSale && <div className="text-sm text-gray-500 line-through">₹{(product.salePrice || product.price || 0).toLocaleString('en-IN')}</div>}
          </div>
        </div>

        {availableSizes.length > 0 && (
          <div className="mb-5">
            <span className="font-medium block mb-2">Select Size:</span>
            <div className="grid grid-cols-4 gap-3">
              {(availableSizes || []).map((size) => {
                const active = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={active}
                    className={`py-2 px-3 rounded-lg text-center text-sm font-medium transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 ${active ? 'bg-black text-white shadow-md transform scale-100' : 'bg-white text-gray-800 border border-gray-200 hover:shadow-sm hover:scale-[1.02]'}`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          disabled={(availableSizes.length > 0 && !selectedSize) || isLoading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-black/90 to-gray-800 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </Modal>
  );
};

export default QuickViewModal;
