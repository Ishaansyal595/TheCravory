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
  image: null, // File
  currentImage: null, // Existing image object
};

const CreateCategories = () => {
  const admin = useSelector((state) => state.admin.data);
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const isEditMode = Boolean(slug);

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files?.[0],
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      setMessage({ type: "", text: "" });

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("slug", formData.slug);

      // Only append image if a new file was selected
      if (formData.image instanceof File) {
        data.append("image", formData.image);
      }

      const endpoint = isEditMode
        ? `${apis.baseCategoriesUrl}${slug}`
        : `${apis.baseCategoriesUrl}${apis.addCategory}`;

      const response = isEditMode
        ? await api.put(endpoint, data)
        : await api.post(endpoint, data);

      setMessage({
        type: "success",
        text: response.data.message,
      });

      if (!isEditMode) {
        setFormData(initialFormState);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchCategory = async () => {
    try {
      const { data } = await api.get(`${apis.baseCategoriesUrl}${slug}`);
      const category = data?.category;
      setFormData({
        name: category.name,
        description: category.description,
        slug: category.slug,
        image: null,
        currentImage: category.image,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isEditMode) {
      setFormData(initialFormState);
      return;
    }
    fetchCategory();
  }, [slug, isEditMode]);

  if (!admin) {
    navigate("/login");
  }

  if (isFetching) {
    return (
      <Modal className="w-[90vw] max-w-5xl max-h-[85vh] overflow-y-auto">
        <div className="w-full py-8 text-center text-(--text-dark-green)">
          Loading category...
        </div>
      </Modal>
    );
  }

  return (
    <Modal className="w-[90vw] max-w-5xl max-h-[85vh] overflow-y-auto">
      <div className="w-full">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-(--text-dark-green)">
            {isEditMode ? "Update Category" : "Add New Category"}
          </h2>
          <p className="text-sm text-(--text-dark-green)/80">
            {isEditMode
              ? "Update the category details below."
              : "Fill in the category details below to create a new listing."}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <Input
            label="Name"
            id="name"
            name="name"
            placeholder="Enter category name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Slug"
            id="slug"
            name="slug"
            placeholder="category-slug"
            value={formData.slug}
            onChange={handleChange}
            required
          />

          <div className="flex flex-col gap-1">
            <label
              htmlFor="categoryImage"
              className="pl-1 text-(--text-dark-green)"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
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

          <div className="md:col-span-2">
            <Textarea
              label="Description"
              id="description"
              name="description"
              placeholder="Detailed category description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </div>

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
                    ? "Update Category"
                    : "Add Category"
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

export default CreateCategories;
