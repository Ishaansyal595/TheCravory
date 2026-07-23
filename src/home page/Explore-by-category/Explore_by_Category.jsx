import React, { useEffect } from "react";
import image from "../../assets/category/cat1.png";
import Heading from "../../components/reuseable/Heading";
import Button from "../../components/reuseable/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { apis } from "../../apis";
import { setCategories, setCategoriesLoading } from "../../store/slice";
import { api } from "../../axiosInstance";

const Explore_by_category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToCategory = () => {
    navigate("/categories");
  };
  const categories = useSelector((state) => state.categories.data);
  const loading = useSelector((state) => state.categories.loading);

  const getAllCategories = async () => {
    try {
      const { data } = await api.get(`${apis.baseCategoriesUrl}`);
      dispatch(setCategories(data.categories));
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      dispatch(setCategoriesLoading(false));
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <section className="mt-12 flex flex-col items-center max-w-8xl px-4">
      <Heading text="Explore By Category" />

      {!loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {categories.slice(0, 2).map((item) => (
            <div
              key={item}
              className="relative overflow-hidden rounded-2xl group cursor-pointer"
            >
              <img
                src={item.image}
                alt={`Category ${item}`}
                className="w-full h-80 object-cover transition duration-500 group-hover:scale-110"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/50 transition" />

              {/* Text */}
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-3xl font-bold">{item.name}</h3>
                <p className="mt-2 opacity-90">{item.description}</p>
              </div>

              {/* Hover Button */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition">
                <button className="bg-white text-black px-4 py-2 rounded-full">
                  Explore →
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-(--text-dark-green) text-lg">
          Loading categories...
        </p>
      )}

      <div className="flex justify-center mt-3">
        <Button
          text="View All Categories"
          classname="bg-(--bg-dark-green) text-(--text-cream) px-8 py-3 rounded-lg hover:bg-(--bg-gold) transition"
          onClick={navigateToCategory}
          analyticsEvent="view_all_categories_clicked"
        />
      </div>
    </section>
  );
};

export default Explore_by_category;
