import React, { useState } from 'react';
import Modal from '../Users/ui/Modal';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../features/cart/cartSlice';
import { useToast } from '../../contexts/ToastContext';

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const { showSuccess } = useToast();
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [isLoading, setIsLoading] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) return;
    setIsLoading(true);
    dispatch(addToCart({
      ...product,
      selectedSize,
      quantity: 1,
    }));
    showSuccess('Product added to cart');
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 w-full max-w-md">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded mb-4" />
        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <div className="mb-4">
          <span className="font-medium">Select Size:</span>
          <div className="flex gap-2 mt-2">
            {product.sizes?.map(size => (
              <button
                key={size}
                className={`px-3 py-1 rounded border ${selectedSize === size ? 'bg-black text-white' : 'bg-white text-black'} transition-colors`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={!selectedSize || isLoading}
          className="w-full py-2 rounded bg-black text-white font-medium disabled:opacity-50"
        >
          {isLoading ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </Modal>
  );
};

export default QuickViewModal;
