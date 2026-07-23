import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCreditCard, FaLock, FaTruck } from "react-icons/fa";
import Heading from "../components/reuseable/Heading";
import Button from "../components/reuseable/Button";
import Input from "../components/reuseable/Input";
import Textarea from "../components/reuseable/Textarea";

const Checkout = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.data);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const subtotal = cartItems.reduce((total, item) => {
    const price =
      item.product?.productVariant?.price ?? item.product?.price ?? 0;
    return total + Number(price) * Number(item.quantity || 1);
  }, 0);

  const shipping = subtotal > 1000 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <section className="min-h-screen bg-(--bg-cream) px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Heading text="Checkout" />
            <p className="mt-2 text-(--text-dark-green)">
              Secure checkout for your handcrafted hamper selection.
            </p>
          </div>
          <Button
            onClick={() => navigate("/cart")}
            text={
              <span className="flex items-center gap-2">
                <FaArrowLeft /> Back to Cart
              </span>
            }
            className="rounded-full px-5"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-(--border-dark-green)/20 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <FaTruck className="text-(--text-gold)" />
                <h3 className="text-xl font-semibold text-(--text-dark-green)">
                  Delivery Details
                </h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Full Name"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                />
                <Input
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                />
                <Input
                  label="Phone"
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone"
                  value={form.phone}
                  onChange={handleChange}
                />
                <Input
                  label="Postal Code"
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  placeholder="Enter postal code"
                  value={form.postalCode}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-4 space-y-4">
                <Textarea
                  label="Delivery Address"
                  id="address"
                  name="address"
                  placeholder="Enter your full address"
                  value={form.address}
                  onChange={handleChange}
                  rows={3}
                />
                <Input
                  label="City"
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Enter your city"
                  value={form.city}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-(--border-dark-green)/20 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <FaCreditCard className="text-(--text-gold)" />
                <h3 className="text-xl font-semibold text-(--text-dark-green)">
                  Payment Method
                </h3>
              </div>
              <div className="space-y-3">
                {[
                  "Cash on Delivery",
                  "Debit / Credit Card",
                  "UPI / Wallet",
                ].map((option) => (
                  <label
                    key={option}
                    className="flex cursor-pointer items-center justify-between rounded-xl border border-(--border-dark-green)/20 bg-(--bg-cream) px-4 py-3"
                  >
                    <span className="font-medium text-(--text-dark-green)">
                      {option}
                    </span>
                    <input
                      type="radio"
                      name="payment"
                      defaultChecked={option === "Cash on Delivery"}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-(--border-dark-green)/20 bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold text-(--text-dark-green)">
                Add a note
              </h3>
              <Textarea
                label="Delivery Note"
                id="note"
                name="note"
                placeholder="Any special delivery instructions?"
                value={form.note}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-(--border-dark-green)/20 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-(--text-dark-green)">
                  Order Summary
                </h3>
                <span className="rounded-full bg-(--bg-cream) px-3 py-1 text-sm font-medium text-(--text-dark-green)">
                  {cartItems.length} items
                </span>
              </div>

              <div className="space-y-3">
                {cartItems.length === 0 ? (
                  <p className="text-sm text-(--text-dark-green)/70">
                    Your cart is empty. Add some hampers to continue.
                  </p>
                ) : (
                  cartItems.map((item, index) => {
                    const itemId =
                      item.product?._id || item.product?.id || index;
                    const price =
                      item.product?.productVariant?.price ??
                      item.product?.price ??
                      0;
                    return (
                      <div
                        key={itemId}
                        className="flex items-center justify-between rounded-xl bg-(--bg-cream) p-3"
                      >
                        <div>
                          <p className="font-medium text-(--text-dark-green)">
                            {item.product?.name || "Product"}
                          </p>
                          <p className="text-sm text-(--text-dark-green)/70">
                            Qty {item.quantity || 1}
                          </p>
                        </div>
                        <p className="font-semibold text-(--text-gold)">
                          ₹
                          {(
                            Number(price) * Number(item.quantity || 1)
                          ).toLocaleString("en-IN")}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="mt-5 space-y-3 border-t border-(--border-dark-green)/20 pt-4 text-(--text-dark-green)">
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
            </div>

            <div className="rounded-2xl border border-(--border-dark-green)/20 bg-(--bg-dark-green) p-6 text-(--text-cream) shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <FaLock />
                <h3 className="text-lg font-semibold">Safe & secure</h3>
              </div>
              <p className="text-sm text-(--text-cream)/80">
                Your details are protected and your order will be confirmed
                instantly.
              </p>
              <Button
                text="Place Order"
                className="mt-5 w-full justify-center rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
