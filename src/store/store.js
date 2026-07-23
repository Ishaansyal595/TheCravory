import { configureStore } from "@reduxjs/toolkit";
import {
  adminReducer,
  allProductsReducer,
  cartSliceReducer,
  categoriesReducer,
  categoryProductsReducer,
  productDetailReducer,
} from "./slice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    productByCategory: categoryProductsReducer,
    allProducts: allProductsReducer,
    productDetail: productDetailReducer,
    cart: cartSliceReducer,
    admin: adminReducer,
  },
});
