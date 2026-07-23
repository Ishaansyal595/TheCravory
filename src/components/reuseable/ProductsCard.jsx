import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const ProductsCard = ({ product, index }) => {
  const navigate = useNavigate();

  const handleNavigate = (product) => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group bg-white">
      <div className="w-full h-50 relative flex items-center justify-center overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-(--bg-gold) flex items-center justify-center">
            <span className="text-(--text-dark-green) text-sm">No image</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-(--text-dark-green)">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between my-2">
          <span className="text-2xl font-bold text-(--text-gold)">
            ₹{product?.productVariant?.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-(--text-dark-green) line-through opacity-50">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        <Button
          text={"View Product"}
          onClick={() => handleNavigate(product)}
          analyticsEvent="view_product_clicked"
          className="mt-4 w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition"
        />
      </div>
    </div>
  );
};

export default ProductsCard;
