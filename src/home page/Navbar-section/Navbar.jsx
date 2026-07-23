import React, { useMemo, useState } from "react";
import craveryLogo from "../../assets/logo/the-cravery-logo.png";
import TopNavbar from "./TopNavbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/reuseable/Button";
import { setLogout } from "../../store/slice";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const nav = ["Home", "products", "categories", "contact"];
  const [searchTerm, setSearchTerm] = useState("");
  const [showLogout, setShowLogout] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const products = useSelector((state) => state.allProducts?.data || []);
  const categories = useSelector((state) => state.categories?.data || []);
  const admin = useSelector((state) => state.admin?.data || []);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLogout());
    setShowLogout(false);
  };

  const searchResults = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return [];

    const productMatches = products
      .filter((product) => {
        const name = product?.name?.toLowerCase() || "";
        const description = product?.description?.toLowerCase() || "";
        return name.includes(term) || description.includes(term);
      })
      .slice(0, 4)
      .map((product) => ({
        type: "product",
        id: product?._id || product?.id,
        label: product?.name,
        path: `/products/${product?._id || product?.id}`,
      }));

    const categoryMatches = categories
      .filter((category) => {
        const name = category?.name?.toLowerCase() || "";
        const description = category?.description?.toLowerCase() || "";
        return name.includes(term) || description.includes(term);
      })
      .slice(0, 4)
      .map((category) => ({
        type: "category",
        id: category?._id || category?.id,
        label: category?.name,
        path: `/category/${category?.slug}`,
      }));

    return [...productMatches, ...categoryMatches];
  }, [searchTerm, products, categories]);

  const handleSearchSelect = (path) => {
    setSearchTerm("");
    navigate(path);
  };

  return (
    <header>
      <TopNavbar />
      <nav className="  bg-(--bg-dark-green) text-(--text-cream) px-8 lg:px-12 py-4 border-b border-(--bg-gold)">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={craveryLogo}
              alt="The Cravory Logo"
              className="h-14 w-auto object-contain"
            />

            <div>
              <h1 className="font-cursive text-3xl text-(--text-gold)">
                The Cravory
              </h1>
              <p className="text-xs tracking-[2px] uppercase">
                Premium Gifting
              </p>
            </div>
          </div>

          <button
            className="md:hidden text-(--text-cream) text-3xl"
            onClick={() => setIsSidebarOpen(true)}
          >
            <HiMenu />
          </button>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest">
            {nav.map((item) =>
              item === "contact" ? (
                <a
                  key={item}
                  href="#contact"
                  className="hover:text-(--text-gold) transition"
                >
                  {item}
                </a>
              ) : (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="hover:text-(--text-gold) transition"
                >
                  {item}
                </Link>
              ),
            )}
          </div>

          {/* Right Side */}
          <div className="relative hidden md:flex items-center gap-6">
            <div className="relative hidden lg:block">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products or categories"
                className="bg-(--bg-cream) text-(--text-dark-green) px-4 py-2 rounded-full outline-none w-64"
              />

              {searchResults.length > 0 && (
                <div className="absolute left-0 top-full mt-2 w-72 rounded-xl border border-(--bg-gold) bg-white p-2 shadow-lg z-50">
                  {searchResults.map((item) => (
                    <button
                      key={`${item.type}-${item.id}`}
                      onClick={() => handleSearchSelect(item.path)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-(--text-dark-green) hover:bg-(--bg-cream)"
                    >
                      <span>{item.label}</span>
                      <span className="text-xs uppercase text-(--text-gold)">
                        {item.type}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {Object.keys(admin).length > 0 && (
              <div className="relative">
                {/* Avatar */}
                <div
                  className="h-10 w-10 bg-(--bg-cream) flex items-center justify-center rounded-full text-(--text-gold) text-xl font-semibold cursor-pointer border border-(--text-gold)"
                  onClick={() => setShowLogout(!showLogout)}
                >
                  A
                </div>

                {/* Dropdown */}
                <div
                  className={`${!showLogout && "hidden"} absolute top-12 right-0 w-40 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50`}
                >
                  <button
                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-(--bg-dark-green) text-(--text-cream) z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-(--bg-gold)">
          <h2 className="text-(--text-gold) text-2xl font-cursive">
            The Cravery
          </h2>

          <button onClick={() => setIsSidebarOpen(false)} className="text-3xl">
            <HiX />
          </button>
        </div>

        <div className="flex flex-col mt-6">
          {nav.map((item) =>
            item === "contact" ? (
              <a
                key={item}
                href="#contact"
                onClick={() => setIsSidebarOpen(false)}
                className="px-6 py-4 border-b border-white/10 hover:bg-(--bg-cream) hover:text-(--text-dark-green)"
              >
                {item}
              </a>
            ) : (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                onClick={() => setIsSidebarOpen(false)}
                className="px-6 py-4 border-b border-white/10 hover:bg-(--bg-cream) hover:text-(--text-dark-green)"
              >
                {item}
              </Link>
            ),
          )}

          <div className="relative lg:hidden w-full p-5">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products or categories"
              className="bg-(--bg-cream) text-(--text-dark-green) px-4 py-2 rounded-full outline-none w-64"
            />

            {searchResults.length > 0 && (
              <div className="absolute left-0 top-full mt-2 w-72 rounded-xl border border-(--bg-gold) bg-white p-2 shadow-lg z-50">
                {searchResults.map((item) => (
                  <button
                    key={`${item.type}-${item.id}`}
                    onClick={() => handleSearchSelect(item.path)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-(--text-dark-green) hover:bg-(--bg-cream)"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs uppercase text-(--text-gold)">
                      {item.type}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {admin && Object.keys(admin).length > 0 && (
            <div className="px-6 mt-6">
              <Button
                text="Logout"
                className="w-full bg-white text-(--text-red)"
                onClick={handleLogout}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
