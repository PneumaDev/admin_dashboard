export const fields = [
    {
        label: "Name:",
        placeholder: "Enter product name",
        type: "text",
        name: "name",
        id: "name",
        step: undefined,
    },
    {
        label: "Price (Ksh):",
        placeholder: "Enter product price",
        type: "number",
        name: "price",
        id: "price",
        step: "1",
    },
    {
        label: "Quantity:",
        placeholder: "Enter product quantity",
        type: "number",
        name: "quantity",
        id: "quantity",
        step: undefined,
    },
];

// Mock product data
const mockProducts = [
    {
        id: 1,
        name: "Wireless Headphones",
        status: "In Stock",
        inventory: 45,
        category: "Electronics",
    },
    {
        id: 2,
        name: "Running Shoes",
        status: "Low Stock",
        inventory: 5,
        category: "Apparel",
    },
    {
        id: 3,
        name: "Smart Watch",
        status: "Out of Stock",
        inventory: 0,
        category: "Electronics",
    },
    {
        id: 1,
        name: "Wireless Headphones",
        status: "In Stock",
        inventory: 45,
        category: "Electronics",
    },
    {
        id: 2,
        name: "Running Shoes",
        status: "Low Stock",
        inventory: 5,
        category: "Apparel",
    },
    {
        id: 3,
        name: "Smart Watch",
        status: "Out of Stock",
        inventory: 0,
        category: "Electronics",
    },
    {
        id: 1,
        name: "Wireless Headphones",
        status: "In Stock",
        inventory: 45,
        category: "Electronics",
    },
    {
        id: 2,
        name: "Running Shoes",
        status: "Low Stock",
        inventory: 5,
        category: "Apparel",
    },
    {
        id: 3,
        name: "Smart Watch",
        status: "Out of Stock",
        inventory: 0,
        category: "Electronics",
    },
    {
        id: 1,
        name: "Wireless Headphones",
        status: "In Stock",
        inventory: 45,
        category: "Electronics",
    },
    {
        id: 2,
        name: "Running Shoes",
        status: "Low Stock",
        inventory: 5,
        category: "Apparel",
    },
    {
        id: 3,
        name: "Smart Watch",
        status: "Out of Stock",
        inventory: 0,
        category: "Electronics",
    },
    {
        id: 1,
        name: "Wireless Headphones",
        status: "In Stock",
        inventory: 45,
        category: "Electronics",
    },
    {
        id: 2,
        name: "Running Shoes",
        status: "Low Stock",
        inventory: 5,
        category: "Apparel",
    },
    {
        id: 3,
        name: "Smart Watch",
        status: "Out of Stock",
        inventory: 0,
        category: "Electronics",
    }, {
        id: 1,
        name: "Wireless Headphones",
        status: "In Stock",
        inventory: 45,
        category: "Electronics",
    },
    {
        id: 2,
        name: "Running Shoes",
        status: "Low Stock",
        inventory: 5,
        category: "Apparel",
    },
    {
        id: 3,
        name: "Smart Watch",
        status: "Out of Stock",
        inventory: 0,
        category: "Electronics",
    }, {
        id: 1,
        name: "Wireless Headphones",
        status: "In Stock",
        inventory: 45,
        category: "Electronics",
    },
    {
        id: 2,
        name: "Running Shoes",
        status: "Low Stock",
        inventory: 5,
        category: "Apparel",
    },
    {
        id: 3,
        name: "Smart Watch",
        status: "Out of Stock",
        inventory: 0,
        category: "Electronics",
    },
    // ... add more mock data
];

const inputClass =
    "w-full px-4 py-2.5 font-imprima rounded-lg border border-[var(--border-color)] bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-standard";
const labelClass =
    "block text-sm font-medium text-[var(--text-color)] font-yantramanav";

export { inputClass, labelClass, mockProducts };