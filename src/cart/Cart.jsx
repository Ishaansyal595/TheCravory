import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaShoppingBag,
  FaTrash,
} from "react-icons/fa";
import Heading from "../components/reuseable/Heading";
import Button from "../components/reuseable/Button";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../store/slice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increment = (id) => {
    dispatch(increaseQuantity(id));
  };

  const decrement = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const subtotal = cartItems.reduce((total, item) => {
    const price =
      item.product?.productVariant?.price ?? item.product?.price ?? 0;
    return total + Number(price) * Number(item.quantity || 1);
  }, 0);

  const shipping = subtotal > 0 ? 99 : 0;
  const total = subtotal + shipping;
  const itemCount = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity || 1),
    0,
  );

  return (
    <section className="min-h-screen bg-(--bg-cream) px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Heading text="Your Cart" />
            <p className="mt-2 text-(--text-dark-green)">
              {itemCount > 0
                ? `${itemCount} item${itemCount > 1 ? "s" : ""} ready for checkout`
                : "Your cart is empty"}
            </p>
          </div>
          <Button
            onClick={() => navigate("/products")}
            analyticsEvent="continue_shopping_clicked"
            text={
              <span className="flex items-center gap-2">
                <FaArrowLeft /> Continue Shopping
              </span>
            }
            className="rounded-full px-5"
          />
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-(--border-dark-green)/40 bg-white p-10 text-center shadow-sm">
            <div className="mb-4 flex justify-center">
              <FaShoppingBag className="text-5xl text-(--text-gold)" />
            </div>
            <h3 className="text-2xl font-semibold text-(--text-dark-green)">
              Your cart feels a little empty
            </h3>
            <p className="mt-2 text-(--text-dark-green)/80">
              Add a few handcrafted hampers and come back here anytime.
            </p>
            <div className="mt-6 flex justify-center">
              <Button
                onClick={() => navigate("/products")}
                analyticsEvent="browse_products_clicked"
                text="Browse Products"
                className="rounded-full"
              />
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.6fr_0.8fr]">
            <div className="space-y-4">
              {cartItems.map((item, index) => {
                const itemId = item.product?._id || item.product?.id || index;
                const price =
                  item.product?.productVariant?.price ??
                  item.product?.price ??
                  0;
                const image = item.product?.images?.[0] || "";

                return (
                  <div
                    key={itemId}
                    className="flex flex-col gap-4 rounded-2xl border border-(--border-dark-green)/20 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-24 w-24 overflow-hidden rounded-xl bg-(--bg-cream)">
                        <img
                          src={image}
                          alt={item.product?.name || "Cart item"}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-(--text-dark-green)">
                          {item.product?.name || "Product"}
                        </p>
                        <p className="mt-1 text-sm text-(--text-dark-green)/70">
                          {item.product?.shortDescription ||
                            "Handpicked for you"}
                        </p>
                        <p className="mt-2 text-lg font-semibold text-(--text-gold)">
                          ₹{Number(price).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 md:items-end">
                      <div className="flex items-center rounded-full border border-(--border-dark-green)/30 bg-(--bg-cream)">
                        <button
                          onClick={() => decrement(itemId)}
                          className="px-3 py-2 text-xl text-(--text-dark-green)"
                        >
                          −
                        </button>
                        <div className="min-w-10 px-3 text-center font-semibold text-(--text-dark-green)">
                          {item.quantity || 1}
                        </div>
                        <button
                          onClick={() => increment(itemId)}
                          className="px-3 py-2 text-xl text-(--text-dark-green)"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(itemId)}
                        className="flex items-center gap-2 text-sm text-(--text-red) hover:underline"
                      >
                        <FaTrash /> Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="h-fit rounded-2xl border border-(--border-dark-green)/20 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-(--text-dark-green)">
                Order Summary
              </h3>
              <div className="mt-5 space-y-3 text-(--text-dark-green)">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                </div>
                <div className="flex items-center justify-between border-t border-(--border-dark-green)/20 pt-3 text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-(--bg-cream) p-4 text-sm text-(--text-dark-green)">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-(--text-light-green)" />
                  <span>Free shipping on orders above ₹1,000</span>
                </div>
              </div>

              <Button
                onClick={() => navigate("/checkout")}
                analyticsEvent="checkout_started"
                text="Proceed to Checkout"
                className="mt-6 w-full justify-center rounded-full"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
