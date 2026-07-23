import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Hero from "./home page/Hero-section/Hero";
import Marque from "./home page/marque/Marque";
import Explore_by_category from "./home page/Explore-by-category/Explore_by_Category";
import WhyChooseUs from "./home page/why_choose_us/WhyChooseUs";
import TopProducts from "./home page/Top-products/TopProducts";
import DelightInEveryHamper from "./home page/Delight-in-every-hamper/DelightInEveryHamper";
import Login from "./components/Login";
import Register from "./components/Register";
import Categories from "./category-page/Categories";
import CategoryProducts from "./category-page/CategoryProducts";
import Products from "./products/Products.jsx";
import ProductDetails from "./products/ProductDetails.jsx";
import Cart from "./cart/Cart.jsx";
import Checkout from "./checkout-page/Checkout.jsx";
import CreateProducts from "./products/CreateProducts.jsx";
import CreateCategories from "./category-page/CreateCategories.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Layout />}>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Marque />
              <Explore_by_category />
              <WhyChooseUs />
              <TopProducts />
              <DelightInEveryHamper />
            </>
          }
        />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProducts />} />
        <Route path="/create-category" element={<CreateCategories />} />
        <Route path="/update-category/:slug" element={<CreateCategories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
        {/* <Route path="/checkout" element={<Checkout />} /> */}
        <Route path="/create-product" element={<CreateProducts />} />
        <Route path="/update-product/:id" element={<CreateProducts />} />
      </Route>
    </Routes>
  );
}

export default App;
