import { useContext, useState } from "react";
import { inputClass, labelClass } from "../assets/assets";
import toast from "react-hot-toast";
import { AdminContext } from "../context/AdminContext";

const SearchProduct = ({ closeModal, setPerformedSearch }) => {
  const initialFilterState = {
    name: "",
    category: "All",
    subCategory: "All",
    minPrice: "",
    maxPrice: "",
    bestSeller: "",
    inStock: "",
  };

  const [filters, setFilters] = useState(initialFilterState);
  const [loading, setLoading] = useState(false);

  const { fetchProducts } = useContext(AdminContext);

  const subcategoryOptions = {
    All: ["All", "Topwear", "Bottomwear", "Shoes", "Accessories"],
    Men: ["All", "Topwear", "Bottomwear", "Shoes", "Innerwear", "Accessories"],
    Women: [
      "All",
      "Dresses",
      "Skirts",
      "Tops",
      "Shoes",
      "Innerwear",
      "Accessories",
    ],
    Kids: ["All", "Clothing", "Shoes", "Toys", "Accessories"],
    Unisex: ["All", "Shoes", "Hats", "Scarves", "Jackets"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      setFilters({ ...filters, category: value, subCategory: "All" });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  const search = async () => {
    if (JSON.stringify(filters) === JSON.stringify(initialFilterState)) {
      throw new Error("Please enter an option");
    }

    setLoading(true);
    try {
      await fetchProducts(filters);
      setPerformedSearch(true);
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Error fetching products");
    } finally {
      closeModal(false);
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    toast.promise(
      search(),
      {
        loading: "Searching...",
        success: "Search Complete",
        error: "Error performing search",
      },
      { id: "searcherror" }
    );
  };

  return (
    <div className="flex flex-col gap-y-5">
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Search Input */}
        <div className="space-y-2">
          <label htmlFor="name" className={labelClass}>
            Product Name
          </label>
          <input
            type="text"
            name="name"
            required
            id="name"
            placeholder="Product name..."
            value={filters.name}
            onChange={handleChange}
            disabled={loading}
            className={`${inputClass} ${
              loading ? "cursor-not-allowed bg-gray-500" : "bg-transparent"
            }`}
          />
        </div>

        {/* Category Dropdown */}
        <div className="space-y-2">
          <label htmlFor="category" className={labelClass}>
            Category:
          </label>
          <select
            name="category"
            id="category"
            required
            disabled={loading}
            value={filters.category}
            onChange={handleChange}
            className={`${inputClass} ${
              loading ? "cursor-not-allowed bg-gray-500" : "bg-transparent"
            }`}
          >
            {["All", "Men", "Women", "Kids", "Unisex"].map((category) => (
              <option
                key={category}
                value={category}
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
            value={filters.subCategory}
            onChange={handleChange}
            required
            disabled={loading}
            className={`${inputClass} ${
              loading ? "cursor-not-allowed bg-gray-500" : "bg-transparent"
            }`}
          >
            {subcategoryOptions[filters.category].map((subcategory) => (
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

        {/* Price Range */}
        <div className="space-y-2">
          <label className={labelClass}>Price Range</label>
          <div className="flex space-x-2">
            <input
              type="number"
              name="minPrice"
              placeholder="Min"
              min={1}
              value={filters.minPrice}
              onChange={handleChange}
              disabled={loading}
              className={`${inputClass} ${
                loading ? "cursor-not-allowed bg-gray-500" : "bg-transparent"
              }`}
            />
            <input
              type="number"
              name="maxPrice"
              min={1}
              placeholder="Max"
              value={filters.maxPrice}
              onChange={handleChange}
              disabled={loading}
              className={`${inputClass} ${
                loading ? "cursor-not-allowed bg-gray-500" : "bg-transparent"
              }`}
            />
          </div>
        </div>

        {/* Best Seller */}
        <div className="space-y-2">
          <label htmlFor="bestSeller" className={labelClass}>
            Best Seller
          </label>
          <select
            name="bestSeller"
            id="bestSeller"
            value={filters.bestSeller}
            onChange={handleChange}
            disabled={loading}
            className={`${inputClass} ${
              loading ? "cursor-not-allowed bg-gray-500" : "bg-transparent"
            }`}
          >
            <option className="bg-[var(--bg-color)]" value="">
              All
            </option>
            <option className="bg-[var(--bg-color)]" value="true">
              Yes
            </option>
            <option className="bg-[var(--bg-color)]" value="false">
              No
            </option>
          </select>
        </div>

        {/* In Stock */}
        <div className="space-y-2">
          <label htmlFor="inStock" className={labelClass}>
            Availability
          </label>
          <select
            name="inStock"
            id="inStock"
            value={filters.inStock}
            onChange={handleChange}
            disabled={loading}
            className={`${inputClass} ${
              loading ? "cursor-not-allowed bg-gray-500" : "bg-transparent"
            }`}
          >
            <option className="bg-[var(--bg-color)]" value="">
              All
            </option>
            <option className="bg-[var(--bg-color)]" value="true">
              In Stock
            </option>
            <option className="bg-[var(--bg-color)]" value="false">
              Out of Stock
            </option>
          </select>
        </div>
      </form>
      {/* Search & Cancel Buttons */}
      <div className="flex items-end justify-end gap-x-2">
        <button
          type="button"
          onClick={() => closeModal(false)}
          disabled={loading}
          className="px-4 py-2 bg-red-500 text-white rounded-md font-yantramanav hover:bg-red-600 transition disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={(e) => handleSearch(e)}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white font-yantramanav rounded-md hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
};

export default SearchProduct;
