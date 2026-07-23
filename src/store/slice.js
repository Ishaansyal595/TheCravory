import { createSlice } from "@reduxjs/toolkit";

const adminData = JSON.parse(localStorage.getItem("admin"));
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    data: adminData || null,
  },
  reducers: {
    setAdmin: (state, action) => {
      state.data = action.payload;
      localStorage.setItem("admin", JSON.stringify(action.payload));
    },
    setLogout: (state, action) => {
      state.data = null;
      localStorage.removeItem("admin");
    },
  },
});
export const { setAdmin, setLogout } = adminSlice.actions;
export const adminReducer = adminSlice.reducer;

const productByCategorySlice = createSlice({
  name: "categoryProducts",
  initialState: {
    data: [],
  },
  reducers: {
    setCategoryProducts: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { setCategoryProducts } = productByCategorySlice.actions;
export const categoryProductsReducer = productByCategorySlice.reducer;

const categories = JSON.parse(localStorage.getItem("Categories"));
const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    data: categories || [],
    loading: true,
  },

  reducers: {
    setCategories: (state, action) => {
      state.data = action.payload;
      localStorage.setItem("Categories", JSON.stringify(action.payload));
    },
    setCategoriesLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export const { setCategories, setCategoriesLoading } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;

const allProductsSlice = createSlice({
  name: "allProducts",
  initialState: {
    data: [],
    loading: true,
  },
  reducers: {
    setAllProducts: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export const { setAllProducts, setLoading } = allProductsSlice.actions;
export const allProductsReducer = allProductsSlice.reducer;

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: {
    data: {},
  },
  reducers: {
    setProductDetail: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { setProductDetail } = productDetailSlice.actions;
export const productDetailReducer = productDetailSlice.reducer;

const cartProduct = JSON.parse(localStorage.getItem("cartProduct")) || [];
const saveCart = (cart) => {
  localStorage.setItem("cartProduct", JSON.stringify(cart));
};
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: cartProduct,
  },

  reducers: {
    // Add Product
    addCart: (state, action) => {
      const product = action.payload;

      const existingProduct = state.data.find(
        (item) => item.product._id === product.product._id,
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.data.push({
          ...product,
          quantity: 1,
        });
      }

      saveCart(state.data);
    },

    // Increase Quantity
    increaseQuantity: (state, action) => {
      const id = action.payload;

      const product = state.data.find(
        (item) => (item.product?._id || item.product?.id) === id,
      );

      if (product) {
        product.quantity += 1;
      }

      saveCart(state.data);
    },

    // Decrease Quantity
    decreaseQuantity: (state, action) => {
      const id = action.payload;

      const product = state.data.find(
        (item) => (item.product?._id || item.product?.id) === id,
      );

      if (!product) return;

      if (product.quantity > 1) {
        product.quantity -= 1;
      } else {
        state.data = state.data.filter(
          (item) => (item.product?._id || item.product?.id) !== id,
        );
      }

      saveCart(state.data);
    },

    // Remove Product
    removeFromCart: (state, action) => {
      const id = action.payload;

      state.data = state.data.filter(
        (item) => (item.product?._id || item.product?.id) !== id,
      );

      saveCart(state.data);
    },

    // Clear Cart
    clearCart: (state) => {
      state.data = [];

      saveCart(state.data);
    },
  },
});

export const {
  addCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;
export const cartSliceReducer = cartSlice.reducer;
