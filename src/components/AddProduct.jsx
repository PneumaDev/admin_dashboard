import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import {
  fields,
  initialState,
  inputClass,
  labelClass,
  onSubmit,
} from "../assets/assets";
import { ImagePlus, X } from "lucide-react";
import { AdvancedImage } from "@cloudinary/react";
import { lazyload } from "@cloudinary/react";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { AdminContext } from "../context/AdminContext";
import toast from "react-hot-toast";
import { ColorPicker } from "react-color-palette";
import "react-color-palette/css";

export default function AddProduct({
  formData,
  setFormData,
  color,
  setColor,
  action,
}) {
  // <------------Handle states------------>
  const [openColorModal, setColorModal] = useState(false);
  const [sizes, setSizes] = useState(["XS", "S", "M", "L", "XL", "XXL"]);
  const [loading, setLoading] = useState(false);

  const { adminToken, setOpenModal, setItemData, cloudinary } =
    useContext(AdminContext);

  // <------------Handle Side Effects------------>
  useEffect(() => {
    if (formData.subCategory === "Shoes") {
      setSizes(["5", "6", "7", "8", "9", "10", "11", "12"]);
    } else {
      setSizes(["XS", "S", "M", "L", "XL", "XXL"]);
    }

    setFormData((prevData) => ({
      ...prevData,
      sizes: [],
    }));
  }, [formData.subCategory]);

  console.log(formData.sizes);

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, color: color.hex }));
  }, [color]);

  // Send form data to the DB
  const handleSubmit = async (e) => {
    if (formData.sizes < 1) {
      return toast.error("Please add sizes", { id: "sizes" });
    }

    if (formData.image < 1) {
      return toast.error("Please add an Image", { id: "sizes" });
    }

    try {
      setLoading(true);
      await toast.promise(
        onSubmit(formData, adminToken),
        {
          loading: `${action === "edit" ? "Updating" : "Adding"} Product`,
          success: `Successfully ${
            action === "edit" ? "Updated" : "Added"
          } Product`,
          error: (error) => error.message,
        },
        {
          id: "onSubmit",
        }
      );
      setItemData(initialState);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // <------------Component Functions------------>
  const subcategoryOptions = {
    Men: ["Topwear", "Bottomwear", "Shoes", "Innerwear", "Accessories"],
    Women: ["Dresses", "Skirts", "Tops", "Shoes", "Innerwear", "Accessories"],
    Kids: ["Clothing", "Shoes", "Toys", "Accessories"],
    Unisex: ["Shoes", "Hats", "Scarves", "Jackets"],
  };

  const selectedSizes = [];

  const handleChange = (e) => {
    const { name, files, type, value } = e.target;

    if (name === "image") {
      const selectedFiles = Array.from(files);

      setFormData((prevState) => {
        // Combine previous + newly selected images
        const allImages = [...prevState.image, ...selectedFiles];

        // Remove duplicates (check by file name)
        const uniqueImages = Array.from(
          new Map(allImages.map((file) => [file.name, file])).values()
        );

        // Limit to max 4 images
        return {
          ...prevState,
          image: uniqueImages.slice(0, 4),
        };
      });
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
      }));
    }
  };

  const toggleSize = (size) => {
    if (loading) return;
    setFormData((prevData) => ({
      ...prevData,
      sizes: prevData.sizes.includes(size)
        ? prevData.sizes.filter((s) => s !== size)
        : [...prevData.sizes, size],
    }));
  };

  // Remove an Image
  const removeImage = (index) => {
    setFormData({
      ...formData,
      image: formData.image.filter((_, i) => i !== index),
    });
  };

  return (
    <form className="space-y-6 p-6 rounded-xl">
      <h2 className="text-2xl font-bold text-[var(--text-color)] mb-6 font-muktaVaani">
        {action === "edit" ? "Update Product Details" : "Add New Product"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Name Field */}
        {fields.map(({ label, placeholder, type, name, id, step }) => (
          <div className="space-y-2" key={id}>
            <label htmlFor={id} className={labelClass}>
              {label}
            </label>
            <input
              placeholder={placeholder}
              type={type}
              name={name}
              id={id}
              value={formData[name] ?? ""}
              onChange={handleChange}
              required={name === "discount" ? false : true}
              disabled={loading}
              step={step}
              className={`${inputClass} ${
                loading ? "cursor-not-allowed bg-gray-500" : "bg-transparent"
              }`}
            />
          </div>
        ))}

        {/* Category Field */}
        <div className="space-y-2">
          <label htmlFor="category" className={labelClass}>
            Category:
          </label>
          <select
            name="category"
            id="category"
            required
            disabled={loading}
            value={formData.category}
            onChange={handleChange}
            className={`${inputClass} ${
              loading ? "cursor-not-allowed bg-gray-500" : "bg-transparent"
            }`}
          >
            {["Men", "Women", "Kids", "Unisex"].map((category) => (
              <option
                value="Men"
                key={category}
                className="bg-[var(--bg-color)]"
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory Field */}
        <div className="space-y-2">
          <label htmlFor="subcategory" className={labelClass}>
            Subcategory
          </label>
          <select
            name="subCategory"
            id="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            required
            disabled={loading}
            className={`${inputClass} ${
              loading ? "cursor-not-allowed bg-gray-500" : "bg-transparent"
            }`}
          >
            {subcategoryOptions[formData.category].map((subcategory) => (
              <option
                key={subcategory}
                value={formData.subcategory}
                className="bg-[var(--bg-color)]"
              >
                {subcategory}
              </option>
            ))}
          </select>
        </div>

        {/* Tags Field */}
        <div className="space-y-2">
          <label htmlFor="tags" className={labelClass}>
            Tags
          </label>
          <input
            disabled={loading}
            type="text"
            name="tags"
            onChange={handleChange}
            id="tags"
            placeholder="Comma-separated tags"
            className={`${inputClass} ${
              loading ? "cursor-not-allowed bg-gray-500" : "bg-transparent"
            }`}
          />
        </div>

        {/* Originality Field */}
        <div className="space-y-2">
          <label htmlFor="isOriginal" className={labelClass}>
            Original Product
          </label>
          <select
            onChange={handleChange}
            name="isOriginal"
            id="isOriginal"
            required
            disabled={loading}
            className={`${inputClass} ${
              loading ? "cursor-not-allowed bg-gray-500" : "bg-transparent"
            }`}
          >
            {["Yes", "No"].map((option) => (
              <option
                value={option === "Yes" ? true : false}
                className="bg-[var(--bg-color)]"
                key={option}
              >
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Color Field */}
        <div className="flex items-center">
          <div className="space-y-2 w-full">
            <label htmlFor="color" className={labelClass}>
              Color:
            </label>
            <div className="relative">
              <input
                placeholder="Enter product color"
                type="text"
                name="color"
                id="color"
                value={color.hex}
                readOnly
                required
                disabled={loading}
                className={`${inputClass} ${
                  loading ? "cursor-not-allowed bg-gray-500" : "bg-transparent"
                }`}
              />
              <div
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-md cursor-pointer border border-gray-300 ${
                  loading ? "cursor-not-allowed" : ""
                }`}
                style={{
                  background:
                    "linear-gradient(90deg, #ff0000, #00ff00, #0000ff, #ffff00)",
                }}
                onClick={() => !loading && setColorModal(true)}
              ></div>
              <div
                className="absolute right-12 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-md cursor-pointer border border-gray-300"
                style={{ backgroundColor: color.hex }}
                onClick={() => !loading && setColorModal(true)}
              ></div>

              <Modal
                onSubmitHandler={() => setColorModal(false)}
                isOpen={openColorModal}
                title={"Pick a color"}
                button1={"Set"}
                cancelButton={false}
              >
                <ColorPicker color={color} onChange={setColor} />
              </Modal>
            </div>
          </div>
        </div>

        {/* Description Field */}
        <div className="space-y-2 md:col-span-3">
          <label htmlFor="description" className={labelClass}>
            Description
          </label>
          <textarea
            onChange={handleChange}
            value={formData.description}
            placeholder="Enter product description"
            name="description"
            id="description"
            rows="4"
            required
            disabled={loading}
            className={`${inputClass} ${
              loading ? "cursor-not-allowed bg-gray-500" : "bg-transparent"
            }`}
          />
        </div>

        {/* Image Upload Field */}
        <div className="space-y-4 md:border-r pr-4 border-gray-700">
          {/* Upload Label */}
          <div className="space-y-2">
            <label
              htmlFor="image-upload"
              className="font-medium text-(var(--text-color))"
            >
              Upload Image or Use Camera
            </label>
            <input
              name="image"
              type="file"
              id="image-upload"
              accept="image/*"
              capture="environment"
              multiple
              onChange={handleChange}
              className="hidden"
              disabled={loading}
            />
            <label
              htmlFor="image-upload"
              className={` ${
                loading
                  ? "cursor-not-allowed bg-gray-500"
                  : "bg-[var(--border-color)] cursor-pointer"
              } my-2 flex items-center gap-2 text-(var(--text-color)) bg-[var(--border-color)] font-muktaVaani w-fit px-2 rounded-lg py-2
                `}
            >
              <ImagePlus size={20} />
              Choose Images
            </label>
            <p className="text-xs text-gray-500">
              You can upload up to 4 images. (JPG, PNG, GIF)
            </p>
          </div>
          {/* Image Preview Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => {
              const imageSrc = formData.image[index];

              return (
                <div
                  key={index}
                  className="relative w-full h-32 md:h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden"
                >
                  {imageSrc ? (
                    <>
                      {imageSrc instanceof File ? (
                        <img
                          src={URL.createObjectURL(imageSrc)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover aspect-auto"
                        />
                      ) : (
                        (() => {
                          const publicId = imageSrc
                            .split("/")
                            .slice(-2)
                            .join("/")
                            .split(".")[0];

                          // Create Cloudinary image instance
                          const cldThumb = cloudinary
                            .image(publicId)
                            .resize(scale(75));

                          return (
                            <AdvancedImage
                              key={index}
                              cldImg={cldThumb}
                              className="w-full h-full object-cover rounded-md"
                              plugins={[lazyload()]}
                              alt={`Product ${index}`}
                            />
                          );
                        })()
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          if (!loading) {
                            removeImage(index);
                          }
                        }}
                        className="absolute top-1 cursor-pointer right-1 bg-gray-800 text-white rounded-full p-1"
                      >
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <ImagePlus size={30} className="text-gray-400" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sizes Input */}
        <div className="space-y-2">
          <label htmlFor="sizes" className={labelClass}>
            Sizes:{" "}
            <span className="text-sm text-gray-500">
              ({formData.subCategory})
            </span>
          </label>
          <div className="flex gap-2 flex-wrap">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => {
                  if (!loading) {
                    toggleSize(size);
                  }
                }}
                className={`w-12 h-12 flex items-center justify-center font-medium border rounded-md ${
                  loading ? "cursor-not-allowed" : "cursor-pointer"
                } ${
                  formData.sizes.includes(size)
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-transparent text-[var(--text-color)] border-[var(--border-color)]"
                } transition duration-200`}
              >
                {size}
              </button>
            ))}
          </div>
          <input
            type="hidden"
            name="sizes"
            value={selectedSizes.join(",")}
            id="sizes"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4 space-x-3">
        <button
          type="button"
          onClick={() => {
            if (!loading) {
              setOpenModal(false);
            }
          }}
          className={`bg-red-500 ${
            loading ? "cursor-not-allowed" : " cursor-pointer"
          } text-white px-5 py-2 font-muktaVaani rounded-md hover:bg-red-600 transition duration-200`}
        >
          Close
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            if (!loading) {
              handleSubmit();
            }
          }}
          type="submit"
          className={`bg-green-600 ${
            loading ? "cursor-wait" : " cursor-pointer"
          } text-white px-5 py-2 rounded-md font-muktaVaani hover:bg-green-700 transition duration-200`}
        >
          {action === "edit" && !loading
            ? "Update Product"
            : action === "edit" && loading
            ? "Updating..."
            : "Add Product"}
        </button>
      </div>
    </form>
  );
}
