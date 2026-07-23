import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { apis } from "../apis";
import axios from "axios";
import { setCategoryProducts } from "../store/slice";
import ProductsCard from "../components/reuseable/ProductsCard";
import Button from "../components/reuseable/Button";
import { api } from "../axiosInstance";

const CategoryProducts = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const products = useSelector((state) => state.productByCategory.data);
  const categories = useSelector((state) => state.categories.data);
  const admin = useSelector((state) => state.admin.data);

  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(true);

  const getProductsByCategory = async () => {
    try {
      const { data } = await api.get(
        `${apis.baseProductsUrl}${apis.productsByCategory}${slug}`,
      );
      dispatch(setCategoryProducts(data.products));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleEditCategory = () => {
    navigate(`/update-category/${slug}`);
  };

  const handleDeleteCategory = async () => {
    console.log("This is the delete category function");
    await api.delete(`${apis.baseCategoriesUrl}${slug}`);
    navigate("/categories");
  };

  useEffect(() => {
    const filtered = categories.filter((category) => category.slug === slug);
    setCategory(filtered[0]);
    getProductsByCategory();
  }, [slug]);

  if (!category) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-2xl text-(--text-dark-green) font-semibold">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <section className="w-full bg-(--bg-cream) min-h-screen">
      {/* Category Banner */}
      <div className="w-full h-[50vh] relative rounded-lg overflow-hidden shadow-lg">
        <img
          src={category.image || category.image.url}
          alt={category.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>

        {/* Text Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
          <h1 className="text-5xl md:text-6xl font-cursive text-(--text-gold) mb-3">
            {category.name}
          </h1>
          <p className="text-lg md:text-xl text-(--text-cream) max-w-2xl">
            {category.description}
          </p>
        </div>
      </div>

      {admin?.token && (
        <div className="w-full flex gap-3 items-center justify-end mt-5 px-5">
          <Button text={"Edit Category"} onClick={handleEditCategory} />
          <Button
            text={"Delete category"}
            onClick={handleDeleteCategory}
            className={"bg-(--bg-red) hover:bg-(--bg-light-red)"}
          />
        </div>
      )}

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-0 pb-10">
        <h2 className="text-4xl font-semibold text-(--text-dark-green) mb-2 font-cursive">
          Our Collection
        </h2>
        <p className="text-(--text-dark-green) mb-10 opacity-75">
          Explore our finest {category.name.toLowerCase()} selection
        </p>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <p className="text-xl text-(--text-dark-green)">
              Loading products...
            </p>
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Fragment key={index}>
                <ProductsCard product={product} />
              </Fragment>
            ))}
          </div>
        ) : (
          <div className="w-full max-w-3xl rounded-3xl border border-(--bg-gold)/30 bg-white p-10 text-center shadow-sm mx-auto">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-(--bg-cream)">
              <span className="text-3xl text-(--text-gold)">✦</span>
            </div>
            <h3 className="text-2xl font-semibold text-(--text-dark-green)">
              No products in this category yet
            </h3>
            <p className="mt-2 text-(--text-dark-green)/80">
              This collection is being curated. Please check back soon for fresh
              picks.
            </p>
            <Button
              text="Back to Categories"
              onClick={() => navigate("/categories")}
              className="mt-6 px-6"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryProducts;
