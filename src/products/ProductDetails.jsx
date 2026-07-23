import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { apis } from "../apis";
import { useDispatch, useSelector } from "react-redux";
import {
  addCart,
  decreaseQuantity,
  increaseQuantity,
  setProductDetail,
} from "../store/slice";
import { FaStar, FaShoppingCart, FaCheck, FaWhatsapp } from "react-icons/fa";
import Button from "../components/reuseable/Button";
import { api } from "../axiosInstance";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((s) => s.productDetail.data);
  const admin = useSelector((state) => state?.admin?.data);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await api.get(`${apis.baseProductsUrl}${id}`);
        dispatch(setProductDetail(data.product));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id, dispatch]);

  const details = [
    { label: "Category", value: product.category?.name },
    { label: "Size", value: product.productVariant?.size },
    { label: "Weight", value: `${product.productVariant?.weight} g` },
    { label: "Stock", value: product.productVariant?.stock },
    { label: "Featured", value: product.isFeatured ? "Yes" : "No" },
    { label: "Best Seller", value: product.isBestSeller ? "Yes" : "No" },
    { label: "New Arrival", value: product.isNewArrival ? "Yes" : "No" },
  ];

  useEffect(() => {
    if (product && product.images && product.images.length)
      setMainImage(product.images[0]);
    else setMainImage(null);
    setSelectedVariant(0);
  }, [product]);

  const increment = () => {
    setQuantity((q) => q + 1);
    dispatch(increaseQuantity(product?.id));
  };
  const decrement = () => {
    setQuantity((q) => Math.max(1, q - 1));
    dispatch(decreaseQuantity(product?.id));
  };

  // const addToCart = () => {
  //   console.log("This is the quantity: ", quantity);
  //   console.log("Add to cart", {
  //     product: product,
  //     variant: selectedVariant,
  //     quantity,
  //   });
  //   const cartProduct = {
  //     product: product,
  //     variant: selectedVariant,
  //     quantity,
  //   };
  //   dispatch(addCart(cartProduct));

  //   navigate(`/cart`);
  // };

  const handleEditProduct = () => {
    navigate(`/update-product/${product._id}`);
  };

  const handleDeleteProduct = async () => {
    console.log("This is the delete product function");
    await api.delete(`${apis.baseProductsUrl}${product?._id}`);
    navigate("/products");
  };

  const handleWhatsAppInquiry = () => {
    const phoneNumber = "917710274988";
    const message = encodeURIComponent(
      `Hello! I would like to inquire about this product.

Product: ${product?.name || ""}
Price: ₹${product?.productVariant?.price || 0}
Category: ${product?.category?.name || ""}
Link: ${window.location.href}`,
    );

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${message}`;

      // Fallback if WhatsApp isn't installed
      setTimeout(() => {
        window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
      }, 1000);
    } else {
      window.open(
        `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`,
        "_blank",
      );
    }
  };

  if (loading)
    return <div className="py-24 text-center">Loading product...</div>;
  if (!product)
    return <div className="py-24 text-center">Product not found.</div>;

  const images = product.images || [];
  const variants = product.variants || [];
  const price = variants[selectedVariant]?.price ?? product.price ?? 0;

  return (
    <section className="w-full bg-(--bg-cream) py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between w-full">
          <div className="mb-6 text-sm text-(--text-dark-green)">
            <Link to="/" className="hover:text-(--text-gold)">
              Home
            </Link>{" "}
            /{" "}
            <Link to="/products" className="hover:text-(--text-gold)">
              Products
            </Link>{" "}
            / <span className="text-(--text-gold)">{product.name}</span>
          </div>

          {admin?.token && (
            <div className="flex gap-3 mb-5 items-center">
              <Button text={"Edit Product"} onClick={handleEditProduct} />
              <Button
                text={"Delete Product"}
                onClick={handleDeleteProduct}
                className={"bg-(--bg-red) hover:bg-(--bg-light-red)"}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-3 w-20">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImage(img)}
                    className="border rounded overflow-hidden"
                  >
                    <img
                      src={img}
                      alt={`thumb-${i}`}
                      className="w-20 h-20 object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="flex-1 bg-white rounded-lg overflow-hidden shadow-md">
                {mainImage ? (
                  <img
                    src={mainImage}
                    alt={product.name}
                    className="w-full h-96 object-cover"
                  />
                ) : (
                  <div className="h-96 flex items-center justify-center text-(--text-dark-green)">
                    No image
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-cursive text-(--text-dark-green) mb-3">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < Math.floor(product.rating || 0)
                        ? "text-(--text-gold)"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <div className="text-(--text-dark-green)">
                {product.rating ?? 0} ({product.reviews ?? 0} reviews)
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-(--border-dark-green) mb-4">
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-(--text-gold)">
                  ₹{product?.productVariant?.price}
                </div>
                {product.originalPrice > price && (
                  <div className="line-through text-(--text-dark-green) opacity-50">
                    ₹{product.originalPrice}
                  </div>
                )}
              </div>
              <div
                className={`text-sm ${product?.productVariant?.stock > 0 ? "text-(--text-light-green)" : "text-(--text-red)"}  mt-2`}
              >
                {product?.productVariant?.stock > 0
                  ? "In stock"
                  : "Out of stock"}
              </div>
            </div>

            {/* {variants.length > 0 && (
              <div className="mb-4">
                <div className="text-sm font-semibold text-(--text-dark-green) mb-2">
                  Variants
                </div>
                <div className="flex gap-2">
                  {variants.map((v, idx) => (
                    <button
                      key={v.id || idx}
                      onClick={() => setSelectedVariant(idx)}
                      className={`px-4 py-2 rounded border ${selectedVariant === idx ? "bg-(--bg-dark-green) text-(--text-cream)" : "bg-white text-(--text-dark-green)"}`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )} */}

            <div className="flex flex-wrap items-center gap-4 mb-6 ">
              {/* <div className="flex items-center border rounded py-2">
                <button onClick={decrement} className="px-4">
                  −
                </button>
                <div className="px-6 font-semibold">{quantity}</div>
                <button onClick={increment} className="px-4">
                  +
                </button>
              </div>

              <Button
                onClick={addToCart}
                text={
                  <>
                    <FaShoppingCart /> Add to Cart
                  </>
                }
                className={"rounded-md flex items-center justify-center gap-2"}
              /> */}

              <Button
                onClick={handleWhatsAppInquiry}
                text={
                  <>
                    <FaWhatsapp /> Inquiry on WhatsApp
                  </>
                }
                className={
                  "rounded-md flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700"
                }
              />
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-(--text-dark-green) mb-2">
                Product Details
              </h3>
              <p className="text-(--text-dark-green) leading-relaxed">
                {product?.shortDescription}
              </p>
            </div>

            <div className="bg-white rounded shadow p-4">
              <div className="flex gap-4">
                <Button
                  onClick={() => setActiveTab("description")}
                  className={`px-4 py-2 bg-transparent ${activeTab === "description" ? "text-(--text-gold) border-b-2 border-(--text-gold)" : "text-(--text-dark-green)"}`}
                  text={"Description"}
                />
                <Button
                  onClick={() => setActiveTab("details")}
                  className={`px-4 py-2 bg-transparent ${activeTab === "details" ? "text-(--text-gold) border-b-2 border-(--text-gold)" : "text-(--text-dark-green)"}`}
                  text={"Details"}
                />
                <Button
                  onClick={() => setActiveTab("reviews")}
                  className={`px-4 py-2 bg-transparent ${activeTab === "reviews" ? "text-(--text-gold) border-b-2 border-(--text-gold)" : "text-(--text-dark-green)"}`}
                  text={"Reviews"}
                />
              </div>

              <div className="mt-4 text-(--text-dark-green)">
                {activeTab === "description" && (
                  <p>{product.fullDescription || product.description}</p>
                )}
                {activeTab === "details" && (
                  <div className="grid grid-cols-2 gap-5">
                    {details.map((item) => (
                      <div key={item.label}>
                        <p className="text-sm text-gray-500">{item.label}</p>
                        <p className="font-semibold">{item.value}</p>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === "reviews" && <div>No reviews yet.</div>}
              </div>
            </div>
          </div>
        </div>

        {/* {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-cursive text-(--text-dark-green) mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {product.relatedProducts.map((r) => (
                <div
                  key={r.id}
                  className="bg-white rounded shadow overflow-hidden"
                >
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-4">
                    <div className="font-semibold text-(--text-dark-green)">
                      {r.name}
                    </div>
                    <div className="text-(--text-gold) font-bold">
                      ₹{r.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )} */}
      </div>
    </section>
  );
};

export default ProductDetails;
