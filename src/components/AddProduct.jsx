import React, { useEffect, useState } from "react";
import { ColorPicker } from "react-color-palette";
import "react-color-palette/css";
import Modal from "./Modal";
import { fields, inputClass, labelClass } from "../assets/assets";

export default function AddProduct({
  formData,
  setFormData,
  color,
  setColor,
  setParentModal,
  onSubmitHandler,
}) {
  // <------------Handle states------------>
  const [openModal, setOpenModal] = useState(false);
  const [sizes, setSizes] = useState(["XS", "S", "M", "L", "XL", "XXL"]);

  // <------------Handle Side Effects------------>
  useEffect(() => {
    console.log("Called");
    if (formData.subcategory === "Shoes") {
      setSizes(["5", "6", "7", "8", "9", "10", "11", "12"]);
    } else {
      setSizes(["XS", "S", "M", "L", "XL", "XXL"]);
    }
  }, [formData]);

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, color: color.hex }));
  }, [color]);

  // <------------Component Functions------------>
  const subcategoryOptions = {
    Men: ["Topwear", "Bottomwear", "Shoes", "Innerwear", "Accessories"],
    Women: ["Dresses", "Skirts", "Tops", "Shoes", "Innerwear", "Accessories"],
    Kids: ["Clothing", "Shoes", "Toys", "Accessories"],
    Unisex: ["Shoes", "Hats", "Scarves", "Jackets"],
  };

  const selectedSizes = [];

  const handleChange = (e) => {
    const { name, files } = e.target;

    if (name === "images") {
      const selectedFiles = Array.from(files);
      setFormData((prevState) => ({
        ...prevState,
        images: [...prevState.images, ...selectedFiles],
      }));
    } else {
      setFormData({ ...formData, [name]: e.target.value });
    }
  };

  const toggleSize = (size) => {
    setFormData((prevData) => ({
      ...prevData,
      sizes: prevData.sizes.includes(size)
        ? prevData.sizes.filter((s) => s !== size)
        : [...prevData.sizes, size],
    }));
  };

  const handlesSubmit = (e) => {
    e.preventDefault();
    onSubmitHandler();
  };

  return (
    <form className="space-y-6 p-6 rounded-xl" onSubmit={handlesSubmit}>
      <h2 className="text-2xl font-bold text-[var(--text-color)] mb-6 font-muktaVaani">
        Add New Product
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
              value={formData[name]}
              onChange={handleChange}
              required
              step={step}
              className={inputClass}
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
            value={formData.category}
            onChange={handleChange}
            className={inputClass}
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
            name="subcategory"
            id="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
            required
            className={inputClass}
          >
            {subcategoryOptions[formData.category].map((subcategory) => (
              <option
                key={subcategory}
                value={subcategory}
                className="bg-[var(--bg-color)]"
              >
                {subcategory}
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
                className="w-full px-4 py-2.5 pr-14 font-imprima rounded-lg border border-[var(--border-color)] bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-standard"
              />
              <div
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-md cursor-pointer border border-gray-300"
                style={{
                  background:
                    "linear-gradient(90deg, #ff0000, #00ff00, #0000ff, #ffff00)",
                }}
                onClick={() => setOpenModal(true)}
              ></div>
              <div
                className="absolute right-12 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-md cursor-pointer border border-gray-300"
                style={{ backgroundColor: color.hex }}
                onClick={() => setOpenModal(true)}
              ></div>

              <Modal
                onSubmitHandler={() => setOpenModal(false)}
                isOpen={openModal}
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
            className={inputClass}
          />
        </div>

        {/* Image Upload Field */}
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="images" className={labelClass}>
            Upload Image or Use Camera
          </label>
          <input
            type="file"
            name="images"
            id="images"
            onChange={handleChange}
            accept="image/*"
            capture="environment"
            multiple
            required
            className="w-full px-4 py-2.5 font-imprima rounded-lg border border-[var(--border-color)] bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-standard placeholder-[var(--border-color)]"
          />
          <p className="text-xs text-gray-500">
            You can upload files or use your camera to capture images. (Accepted
            formats: JPG, PNG, GIF)
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="sizes" className={labelClass}>
            Sizes
          </label>
          <div className="flex gap-2 flex-wrap">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`w-12 h-12 flex items-center justify-center font-medium border rounded-md cursor-pointer ${
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

        {/* Tags Field */}
        <div className="space-y-2">
          <label htmlFor="tags" className={labelClass}>
            Tags
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            placeholder="Comma-separated tags"
            className="w-full px-4 py-2.5 font-imprima rounded-lg border border-[var(--border-color)] bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-standard placeholder-[var(--border-color)]"
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
            className={inputClass}
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
      </div>

      <div className="flex justify-end pt-4 space-x-3">
        <button
          onClick={() => setParentModal(false)}
          className="bg-red-500 text-white px-5 py-2 font-muktaVaani rounded-md hover:bg-red-600 transition duration-200"
        >
          Close
        </button>

        <button
          type="submit"
          className="bg-green-600 text-white px-5 py-2 rounded-md font-muktaVaani hover:bg-green-700 transition duration-200"
        >
          Add Product
        </button>
      </div>
    </form>
  );
}
