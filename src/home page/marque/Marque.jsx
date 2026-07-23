import React from "react";
import { FaTruck } from "react-icons/fa";

const Marque = () => {
  return (
    <div className="my-8 mx-auto w-full  bg-(--bg-light-green) py-5">
      <marquee
        behavior="scroll"
        direction="left"
        className="text-(--text-cream) text-3xl flex items-center justify-center gap-2"
      >
        <span className=" flex justify-center items-center gap-1">
          <FaTruck className="text-4xl" />
          <h2>Free shipping on all orders above ₹500!</h2>
          <span className="text-xl">
            - No coupons needed, just head out for checkout!
          </span>
        </span>
      </marquee>
    </div>
  );
};

export default Marque;
