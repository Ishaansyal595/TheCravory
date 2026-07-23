import React, { useEffect, useState } from "react";
import Heading from "../../components/reuseable/Heading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import banner1 from "../../assets/banner/banner 1.png";
import banner2 from "../../assets/banner/banner 2.png";
import ProductsCard from "../../components/reuseable/ProductsCard";
import { useDispatch, useSelector } from "react-redux";
import { setAllProducts, setLoading } from "../../store/slice";
import axios from "axios";
import { apis } from "../../apis";
import { api } from "../../axiosInstance";

const TopProducts = () => {
  const products = useSelector((state) => state.allProducts?.data || []);
  const loading = useSelector((state) => state.allProducts?.loading);
  const dispatch = useDispatch();

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

  return (
    <section className="mt-8 mx-auto w-full flex flex-col gap-3 justify-center items-center">
      <Heading text="Top Products" />

      <div className="max-w-8xl mx-auto p-4 mt-4 ">
        {loading ? (
          <p className="text-(--text-dark-green) text-lg">
            Loading products...
          </p>
        ) : products.length > 0 ? (
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={"auto"}
            spaceBetween={30}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="pb-12"
          >
            {products.map((product, index) => (
              <SwiperSlide key={index} className="w-74!">
                <ProductsCard product={product} index={index} s />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-(--text-dark-green)">
            No products available right now.
          </p>
        )}
      </div>
    </section>
  );
};

export default TopProducts;
