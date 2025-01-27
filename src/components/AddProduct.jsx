import React, { useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import Modal from "./Modal";

export default function AddProduct() {
  const [color, setColor] = useColor("#561ecb");
  const [openModal, setOpenModal] = useState(false);
  console.log(color);

  return (
    <form
      className="space-y-6 p-6 rounded-xl"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h2 className="text-2xl font-bold text-[var(--text-color)] mb-6 font-muktaVaani">
        Add New Product
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-[var(--text-color)] font-yantramanav"
          >
            Name
          </label>
          <input
            placeholder="Enter product name"
            type="text"
            name="name"
            id="name"
            required
            className="w-full px-4 py-2.5 font-imprima rounded-lg border border-[var(--border-color)] bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-standard"
          />
        </div>

        {/* Price Field */}
        <div className="space-y-2">
          <label
            htmlFor="color"
            className="block text-sm font-medium text-[var(--text-color)] font-yantramanav"
          >
            Price (Ksh.)
          </label>
          <input
            placeholder="Enter product color"
            type="number"
            name="color"
            id="color"
            required
            step="0.01"
            className="w-full px-4 py-2.5 font-imprima rounded-lg border border-[var(--border-color)] bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-standard"
          />
        </div>

        {/* Quantity Field */}
        <div className="space-y-2">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-[var(--text-color)] font-yantramanav"
          >
            Quantity
          </label>
          <input
            placeholder="Enter product quantity"
            type="number"
            name="quantity"
            id="quantity"
            required
            className="w-full px-4 py-2.5 font-imprima rounded-lg border border-[var(--border-color)] bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-standard"
          />
        </div>

        {/* Category Field */}
        <div className="space-y-2">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-[var(--text-color)] font-yantramanav"
          >
            Category
          </label>
          <select
            name="category"
            id="category"
            required
            className="w-full px-4 py-2.5 font-imprima rounded-lg border border-[var(--border-color)] bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-standard"
          >
            <option value="Men" className="bg-[var(--bg-color)]">
              Men
            </option>
            <option value="Women" className="bg-[var(--bg-color)]">
              Women
            </option>
            <option value="Kids" className="bg-[var(--bg-color)]">
              Kids
            </option>
            <option value="Unisex" className="bg-[var(--bg-color)]">
              Unisex
            </option>
          </select>
        </div>

        {/* Subcategory Field */}
        <div className="space-y-2">
          <label
            htmlFor="subcategory"
            className="block text-sm font-medium text-[var(--text-color)] font-yantramanav"
          >
            Subcategory
          </label>
          <select
            name="subcategory"
            id="subcategory"
            required
            className="w-full px-4 py-2.5 font-imprima rounded-lg border border-[var(--border-color)] bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-standard"
          >
            {/* Men */}
            <option value="Topwear" className="bg-[var(--bg-color)]">
              Topwear
            </option>
            <option value="Bottomwear" className="bg-[var(--bg-color)]">
              Bottomwear
            </option>
            <option value="Shoes" className="bg-[var(--bg-color)]">
              Shoes
            </option>
            <option value="Innerwear" className="bg-[var(--bg-color)]">
              Innerwear
            </option>
            <option value="Accessories" className="bg-[var(--bg-color)]">
              Accessories
            </option>

            {/* Women */}
            <option value="Dresses" className="bg-[var(--bg-color)]">
              Dresses
            </option>
            <option value="Skirts" className="bg-[var(--bg-color)]">
              Skirts
            </option>
            <option value="Tops" className="bg-[var(--bg-color)]">
              Tops
            </option>
            <option value="Shoes" className="bg-[var(--bg-color)]">
              Shoes
            </option>
            <option value="Innerwear" className="bg-[var(--bg-color)]">
              Innerwear
            </option>
            <option value="Accessories" className="bg-[var(--bg-color)]">
              Accessories
            </option>

            {/* Kids */}
            <option value="Clothing" className="bg-[var(--bg-color)]">
              Clothing
            </option>
            <option value="Shoes" className="bg-[var(--bg-color)]">
              Shoes
            </option>
            <option value="Toys" className="bg-[var(--bg-color)]">
              Toys
            </option>
            <option value="Accessories" className="bg-[var(--bg-color)]">
              Accessories
            </option>

            {/* Unisex */}
            <option value="Shoes" className="bg-[var(--bg-color)]">
              Shoes
            </option>
            <option value="Hats" className="bg-[var(--bg-color)]">
              Hats
            </option>
            <option value="Scarves" className="bg-[var(--bg-color)]">
              Scarves
            </option>
            <option value="Jackets" className="bg-[var(--bg-color)]">
              Jackets
            </option>
          </select>
        </div>

        {/* Color Field */}
        <div className="flex items-center">
          <div className="space-y-2 w-full">
            <label
              htmlFor="color"
              className="block text-sm font-medium text-[var(--text-color)] font-yantramanav"
            >
              Color:
            </label>
            <div className="relative">
              <input
                placeholder="Enter product color"
                type="text"
                name="color"
                id="color"
                value={color.hex}
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
        <div className="space-y-2 md:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-[var(--text-color)] font-yantramanav"
          >
            Description
          </label>
          <textarea
            placeholder="Enter product description"
            name="description"
            id="description"
            rows="4"
            required
            className="w-full px-4 py-2.5 font-imprima rounded-lg border border-[var(--border-color)] bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-standard"
          />
        </div>

        {/* Image Upload Field */}
        <div className="space-y-2 md:col-span-2">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-[var(--text-color)] font-yantramanav"
          >
            Upload Image or Use Camera
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            capture="environment"
            multiple
            required
            className="w-full px-4 py-2.5 font-imprima rounded-lg border border-[var(--border-color)] bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-standard placeholder-[var(--border-color)]"
          />
          <p className="text-xs text-gray-500">
            You can upload files or use your camera to capture an image.
            (Accepted formats: JPG, PNG, GIF)
          </p>
        </div>

        {/* Tags Field */}
        <div className="space-y-2">
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-[var(--text-color)]"
          >
            Tags
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            required
            placeholder="Comma-separated tags"
            className="w-full px-4 py-2.5 font-imprima rounded-lg border border-[var(--border-color)] bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-standard placeholder-[var(--border-color)]"
          />
        </div>

        {/* Originality Field */}
        <div className="space-y-2">
          <label
            htmlFor="isOriginal"
            className="block text-sm font-medium text-[var(--text-color)] font-yantramanav"
          >
            Original Product
          </label>
          <select
            name="isOriginal"
            id="isOriginal"
            required
            className="w-full px-4 py-2.5 font-imprima rounded-lg border border-[var(--border-color)] bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-standard"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>
    </form>
  );
}
