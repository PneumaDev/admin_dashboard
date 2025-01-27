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

const inputClass =
    "w-full px-4 py-2.5 font-imprima rounded-lg border border-[var(--border-color)] bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-standard";
const labelClass =
    "block text-sm font-medium text-[var(--text-color)] font-yantramanav";

export { inputClass, labelClass };