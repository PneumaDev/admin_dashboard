import { useContext, useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import Table from "../components/Table";
import { AdminContext } from "../context/AdminContext";
import ProductActions from "../components/ProductActions";
import InfoMessage from "../components/InfoComponent";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";
import SearchProduct from "../components/SearchProduct";

export default function ProductsPage() {
  const [fetchingProducts, setFetchingProducts] = useState(true);
  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {}, [location.pathname]);

  const {
    products,
    fetchProducts,
    performedSearch,
    setPerformedSearch,
    navigate,
    productAction,
    adminToken,
  } = useContext(AdminContext);

  useEffect(() => {
    const loadProducts = async () => {
      setFetchingProducts(true);

      if (!adminToken) return;

      try {
        await fetchProducts();
      } finally {
        setFetchingProducts(false);
      }
    };

    if (products && products.length === 0) {
      loadProducts();
    } else {
      setFetchingProducts(false);
    }
  }, [adminToken, products]);

  const columnHeader = {
    sn: "SN",
    itemData: "Product",
    status: "Status",
    inventory: "Inventory",
    category: "Category",
    actions: "Date",
  };

  if (fetchingProducts) {
    return <Spinner />;
  }

  console.log(products);

  return (
    <div className="p-6 bg-[var(--card-bg)] rounded-lg">
      <div className="mx-auto">
        {/* Header */}
        <div className="">
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col ">
              <h1 className="text-2xl font-bold text-[var(--text-color)] font-yantramanav">
                Products
              </h1>
            </div>
            <div className="flex space-x-4">
              {products && (
                <button
                  onClick={() => setOpenSearch(true)}
                  className="bg-blue-600 cursor-pointer text-white px-2 md:px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 font-imprima"
                >
                  <Search className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:flex ">Search Product</span>
                </button>
              )}
              <button
                onClick={() => productAction("add")}
                className="bg-blue-600 text-white cursor-pointer px-2 md:px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 font-imprima"
              >
                <Plus className="w-4 h-4 md:mr-2" />
                <span className="hidden md:flex ">Add Product</span>
              </button>
              {performedSearch && (
                <button
                  onClick={async () => {
                    setFetchingProducts(true);
                    try {
                      await fetchProducts();
                      setPerformedSearch(false);
                    } catch (error) {
                      console.log(error);
                    } finally {
                      setFetchingProducts(false);
                    }
                  }}
                  className="text-base text-black bg-green-500 px-2 rounded-md font-yantramanav"
                >
                  RESET
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mb-2">
          {performedSearch && (
            <div className="flex gap-x-3 items-start">
              <h3 className="text-xl text-gray-500 font-imprima line-clamp-1">
                Search results:
              </h3>
            </div>
          )}
        </div>

        {products ? (
          <Table
            columnHeader={columnHeader}
            products={products}
            renderRow={(itemData, index) => (
              <tr
                key={index}
                className="hover: cursor-pointer hover:bg-[var(--border-color)]"
                onClick={() => navigate(`/products/${itemData._id}`)}
              >
                <td className="px-6 py-4 whitespace-nowrap ">
                  <div className="text-sm font-medium font-muktaVaani text-[var(--text-color)] transition-standard">
                    {index + 1}.
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium font-muktaVaani text-[var(--text-color)] transition-standard">
                    {itemData.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs font-muktaVaani leading-5 font-semibold rounded-full ${
                      itemData.quantity === 0
                        ? "bg-red-100 text-red-800"
                        : itemData.quantity <= 10
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {itemData.quantity === 0
                      ? "Out of Stock"
                      : itemData.quantity <= 10
                      ? "Low Stock"
                      : "In Stock"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-muktaVaani text-sm text-[var(--text-color)] transition-standard">
                  {itemData.quantity}
                </td>

                <td className="px-6 py-4 whitespace-nowrap font-muktaVaani text-sm text-[var(--text-color)] transition-standard">
                  {itemData.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-muktaVaani text-sm text-[var(--text-color)] transition-standard">
                  {new Date(itemData.date).toLocaleDateString()}
                </td>
              </tr>
            )}
          />
        ) : (
          <div className="flex justify-center">
            <InfoMessage
              title={"No Products Found"}
              message={"Please add some products!"}
            />
          </div>
        )}

        <Modal
          isOpen={openSearch}
          onClose={() => setOpenSearch(false)}
          title={"Set search criteria"}
        >
          <SearchProduct
            closeModal={setOpenSearch}
            setPerformedSearch={setPerformedSearch}
          />
        </Modal>
        <ProductActions />
      </div>
    </div>
  );
}
