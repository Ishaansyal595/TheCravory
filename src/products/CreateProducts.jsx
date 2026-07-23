import axios from "axios";
import React, { useEffect, useState } from "react";
import { apis } from "../apis";
import Button from "../components/reuseable/Button";
import Input from "../components/reuseable/Input";
import Modal from "../components/reuseable/Modal";
import Textarea from "../components/reuseable/Textarea";
import { useDispatch, useSelector } from "react-redux";
import { setAllProducts } from "../store/slice";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../axiosInstance";

const initialFormState = {
  name: "",
  description: "",
  slug: "",
  shortDescription: "",
  categoryName: "",
  categoryImage: "",
  categoryDescription: "",
  categorySlug: "",
  images: [],
  size: "",
  weight: "",
  price: "",
  stock: "",
  isFeatured: false,
  isBestSeller: false,
  isNewArrival: false,
};

const CreateProducts = () => {
  const admin = useSelector((state) => state?.admin?.data);
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const allProducts = useSelector((state) => state.allProducts?.data || []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      if (name === "images") {
        setFormData((prev) => ({
          ...prev,
          images: Array.from(files),
        }));
        console.log("This is the formData: ", formData);
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: files[0],
        }));
      }
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const payload = new FormData();

      payload.append("name", formData.name);
      payload.append("description", formData.description);
      payload.append("slug", formData.slug);
      payload.append("shortDescription", formData.shortDescription);

      payload.append("categoryName", formData.categoryName);
      payload.append("categorySlug", formData.categorySlug);
      payload.append("categoryDescription", formData.categoryDescription);

      payload.append("size", formData.size);
      payload.append("weight", formData.weight);
      payload.append("price", Number(formData.price));
      payload.append("stock", Number(formData.stock));

      payload.append("isFeatured", formData.isFeatured);
      payload.append("isBestSeller", formData.isBestSeller);
      payload.append("isNewArrival", formData.isNewArrival);

      if (formData.categoryImage) {
        payload.append("categoryImage", formData.categoryImage);
      }

      formData.images.forEach((image) => {
        payload.append("images", image);
      });

      const endpoint = isEditMode
        ? `${apis.baseProductsUrl}${id}`
        : `${apis.baseProductsUrl}${apis.addProduct}`;

      const { data } = isEditMode
        ? await api.put(endpoint, payload, {
            headers: { "Content-Type": "multipart/form" },
          })
        : await api.post(endpoint, payload, {
            headers: { "Content-Type": "multipart/form" },
          });

      setMessage({
        type: "success",
        text:
          data.message ||
          (isEditMode
            ? "Product updated successfully"
            : "Product added successfully"),
      });

      setFormData(initialFormState);

      if (data.product) {
        const updatedProducts = isEditMode
          ? allProducts.map((item) =>
              item._id === data.product._id ? data.product : item,
            )
          : [...allProducts, data.product];

        dispatch(setAllProducts(updatedProducts));
      }

      navigate("/products");
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to save product",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!isEditMode) {
      setFormData(initialFormState);
      return;
    }

    const fetchProduct = async () => {
      try {
        setIsFetching(true);
        const { data } = await api.get(`${apis.baseProductsUrl}${id}`);
        const product = data?.product;

        if (product) {
          setFormData({
            name: product.name || "",
            description: product.description || "",
            slug: product.slug || "",
            shortDescription: product.shortDescription || "",
            categoryName: product.category?.name || "",
            categoryImage: product.category?.image || "",
            categoryDescription: product.category?.description || "",
            categorySlug: product.category?.slug || "",
            images: Array.isArray(product.images) ? product.images : [],
            size: product.productVariant?.size || "",
            weight: product.productVariant?.weight || "",
            price: product.productVariant?.price ?? "",
            stock: product.productVariant?.stock ?? "",
            isFeatured: Boolean(product.isFeatured),
            isBestSeller: Boolean(product.isBestSeller),
            isNewArrival: Boolean(product.isNewArrival),
          });
        }
      } catch (error) {
        setMessage({
          type: "error",
          text: error?.response?.data?.message || "Failed to load product",
        });
      } finally {
        setIsFetching(false);
      }
    };

    fetchProduct();
  }, [id, isEditMode]);

  if (!admin) {
    navigate("/login");
  }

  if (isFetching) {
    return (
      <Modal className="w-[90vw] max-w-5xl max-h-[85vh] overflow-y-auto">
        <div className="w-full py-8 text-center text-(--text-dark-green)">
          Loading product...
        </div>
      </Modal>
    );
  }

  return (
    <Modal className="w-[90vw] max-w-5xl max-h-[85vh] overflow-y-auto">
      <div className="w-full">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-(--text-dark-green)">
            {isEditMode ? "Update Product" : "Add New Product"}
          </h2>
          <p className="text-sm text-(--text-dark-green)/80">
            {isEditMode
              ? "Update the product details below."
              : "Fill in the product details below to create a new listing."}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <Input
            label="Product Name"
            id="name"
            name="name"
            placeholder="Enter product name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Slug"
            id="slug"
            name="slug"
            placeholder="product-slug"
            value={formData.slug}
            onChange={handleChange}
            required
          />

          <Input
            label="Category Name"
            id="categoryName"
            name="categoryName"
            placeholder="Enter category name"
            value={formData.categoryName}
            onChange={handleChange}
            required
          />

          <Input
            label="Category Slug"
            id="categorySlug"
            name="categorySlug"
            placeholder="category-slug"
            value={formData.categorySlug}
            onChange={handleChange}
            required
          />

          <div className="flex flex-col gap-1">
            <label
              htmlFor="categoryImage"
              className="pl-1 text-(--text-dark-green)"
            >
              Category Image
            </label>
            <input
              type="file"
              id="categoryImage"
              name="categoryImage"
              accept="image/*"
              onChange={handleChange}
              className="rounded-full border border-(--bg-gold) p-2 file:mr-3 file:rounded-full file:border-0 file:bg-(--bg-gold) file:px-4 file:py-2 file:text-(--text-cream)"
            />
            {isEditMode && (
              <span className="text-xs text-(--text-dark-green)/70">
                Leave empty to keep the current image.
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="images" className="pl-1 text-(--text-dark-green)">
              Product Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="rounded-full border border-(--bg-gold) p-2 file:mr-3 file:rounded-full file:border-0 file:bg-(--bg-gold) file:px-4 file:py-2 file:text-(--text-cream)"
            />
            {isEditMode && (
              <span className="text-xs text-(--text-dark-green)/70">
                Leave empty to keep the current images.
              </span>
            )}
          </div>

          <Input
            label="Size"
            id="size"
            name="size"
            placeholder="S, M, L"
            value={formData.size}
            onChange={handleChange}
            required
          />

          <Input
            label="Weight"
            id="weight"
            name="weight"
            placeholder="500g"
            value={formData.weight}
            onChange={handleChange}
            required
          />

          <Input
            label="Price"
            id="price"
            name="price"
            type="number"
            placeholder="0"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <Input
            label="Stock"
            id="stock"
            name="stock"
            type="number"
            placeholder="0"
            value={formData.stock}
            onChange={handleChange}
            required
          />

          <div className="md:col-span-2">
            <Textarea
              label="Short Description"
              id="shortDescription"
              name="shortDescription"
              placeholder="Short product summary"
              rows={3}
              value={formData.shortDescription}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <Textarea
              label="Description"
              id="description"
              name="description"
              placeholder="Detailed product description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <Textarea
              label="Category Description"
              id="categoryDescription"
              name="categoryDescription"
              placeholder="Describe the category"
              rows={3}
              value={formData.categoryDescription}
              onChange={handleChange}
            />
          </div>

          <label className="flex items-center gap-2 text-(--text-dark-green)">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
            />
            Featured
          </label>

          <label className="flex items-center gap-2 text-(--text-dark-green)">
            <input
              type="checkbox"
              name="isBestSeller"
              checked={formData.isBestSeller}
              onChange={handleChange}
            />
            Best Seller
          </label>

          <label className="flex items-center gap-2 text-(--text-dark-green)">
            <input
              type="checkbox"
              name="isNewArrival"
              checked={formData.isNewArrival}
              onChange={handleChange}
            />
            New Arrival
          </label>

          <div className="md:col-span-2 flex flex-col items-start gap-2">
            {message.text ? (
              <p
                className={`text-sm ${
                  message.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {message.text}
              </p>
            ) : null}

            <Button
              text={
                loading
                  ? isEditMode
                    ? "Updating..."
                    : "Adding..."
                  : isEditMode
                    ? "Update Product"
                    : "Add Product"
              }
              type="submit"
              className="px-8"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateProducts;
