import React, { useEffect, useState } from "react";
import Heading from "../components/reuseable/Heading";

import axios from "axios";
import { apis } from "../apis";
import Button from "../components/reuseable/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategories,
  setCategoriesLoading,
  setCategoryProducts,
} from "../store/slice";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin.data);
  const categories = useSelector((state) => state.categories.data);

  const getProductsByCategory = async ({ slug }) => {
    try {
      navigate(`/category/${slug}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCategoryNavigation = () => {
    navigate("/create-category");
  };

  return (
    <section className="flex flex-col items-start justify-center gap-3 p-10">
      {admin?.token && (
        <Button
          text="Add Category"
          onClick={handleAddCategoryNavigation}
          analyticsEvent="add_product_clicked"
        />
      )}

      <div className="w-full flex flex-col items-center justify-center gap-5">
        <Heading text={"Shop By Categories"} />

        <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {categories.map((item) => (
            <div
              key={item}
              className="relative overflow-hidden rounded-2xl group cursor-pointer"
            >
              <img
                src={item.image.url || item.image}
                alt={`Category ${item}`}
                className="w-full h-60 lg:h-80 object-cover transition duration-500 group-hover:scale-110"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/50 transition" />

              {/* Text */}
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-3xl font-bold">{item.name}</h3>
                <p className="mt-2 opacity-90">{item.description}</p>
              </div>

              {/* Hover Button */}
              <Button
                text={"Explore →"}
                className={
                  "bg-(--bg-cream) top-6 right-6 absolute opacity-0 group-hover:opacity-100 transition-all"
                }
                onClick={() => getProductsByCategory({ slug: item.slug })}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
