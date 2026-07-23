import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apis } from "../apis";
import { setAllProducts, setLoading } from "../store/slice";
import Heading from "../components/reuseable/Heading";
import ProductsCard from "../components/reuseable/ProductsCard";
import { useNavigate } from "react-router-dom";
import Button from "../components/reuseable/Button";
import { api } from "../axiosInstance";

const products = () => {
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin.data);

  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts.data);
  const loading = useSelector((state) => state.allProducts.loading);

  const getAllProducts = async () => {
    try {
      const { data } = await api.get(
        `${apis.baseProductsUrl}${apis.allProducts}`,
      );
      dispatch(setAllProducts(data.products));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleAddProductNavigation = () => {
    navigate("/create-product");
  };

  return (
    <section className="flex flex-col items-start justify-center gap-3 py-10">
      {admin?.token && (
        <Button
          text="Add Product"
          className={"ml-10"}
          onClick={handleAddProductNavigation}
          analyticsEvent="add_product_clicked"
        />
      )}
      <div className="flex flex-col items-center justify-center gap-5 px-10 py-4">
        <Heading text={"Our Products"} />

        {loading ? (
          <p className="text-(--text-dark-green) text-lg">
            Loading products...
          </p>
        ) : allProducts && allProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-10 gap-5">
            {allProducts.map((product, index) => (
              <ProductsCard key={product.id || index} product={product} />
            ))}
          </div>
        ) : (
          <div className="w-full max-w-3xl rounded-3xl border border-(--bg-gold)/30 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-(--bg-cream)">
              <span className="text-3xl text-(--text-gold)">✦</span>
            </div>
            <h3 className="text-2xl font-semibold text-(--text-dark-green)">
              No products yet
            </h3>
            <p className="mt-2 text-(--text-dark-green)/80">
              Fresh hampers and gifts are on the way. Please check back soon.
            </p>
            <Button
              text="Back to Home"
              onClick={() => navigate("/")}
              className="mt-6 px-6"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default products;
