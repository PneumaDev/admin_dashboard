import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
        label: "Discount Price (Ksh):",
        placeholder: "Enter product discount price",
        type: "number",
        name: "discount",
        id: "discount",
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

const initialState = {
    name: "",
    discount: "",
    price: 0,
    quantity: 0,
    category: "Men",
    subCategory: "Topwear",
    description: "",
    sizes: [],
    tags: "",
    color: "#ffffff",
    isOriginal: true,
    image: [],
};


export const onSubmit = async (itemData, adminToken) => {
    const form = new FormData();
    form.append("name", itemData.name);
    form.append("description", itemData.description);
    form.append("quantity", itemData.quantity);
    form.append("price", itemData.price);
    form.append("category", itemData.category);
    form.append("subCategory", itemData.subCategory);
    form.append("bestSeller", itemData.bestSeller);
    form.append("sizes", JSON.stringify(itemData.sizes));
    form.append("sku", generateSKU());
    form.append("brand", itemData.brand);
    if (itemData.tags && itemData.tags.trim() !== "") {
        form.append("tags", JSON.stringify(itemData.tags.split(",")));
    }
    form.append("discount", itemData.discount);
    form.append("isOriginal", itemData.isOriginal);

    console.log(`Processing itemData: ${itemData.name}`);
    console.log(`Product images:`, itemData.image);
    // Create an array of promises for image fetches
    const imagePromises = itemData.image.map((img, index) => {
        console.log(`Appending file directly: ${img.name}`);
        form.append(`image${index + 1}`, img);
        return Promise.resolve();
    });

    // Wait for all images to be processed before continuing
    await Promise.all(imagePromises);

    logFormData(form);

    try {
        const response = await axios.post(backendUrl + "/api/product/add", form, {
            headers: { token: adminToken },
        });

        if (!response.data.success) {
            throw new Error(
                `Failed to add product ${itemData.name}: ${response.data.message}`
            );
        }
        return ({ message: `Successfully added product: ${itemData.name}`, success: true });
    } catch (error) {
        console.log(error);
        throw Error(error);
    }
};

function generateSKU(length = 8) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array)
        .map((byte) => byte.toString(16).padStart(2, '0')) // Convert each byte to a hex string
        .join('')
        .toUpperCase();
}


const logFormData = (formData) => {
    for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }
};

const inputClass =
    "w-full px-4 py-2.5 font-imprima rounded-lg border border-[var(--border-color)] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-standard";
const labelClass =
    "block text-sm font-medium text-[var(--text-color)] font-yantramanav";

export { inputClass, labelClass, generateSKU, logFormData, initialState };