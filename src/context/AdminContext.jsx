import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
import { initialState } from "../assets/assets";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  // <------------Constants and States------------>
  const [action, setAction] = useState("");
  const [itemData, setItemData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminToken, setAdminToken] = useState(null);
  const [counts, setCounts] = useState([]);

  const [performedSearch, setPerformedSearch] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const cloudinary = new Cloudinary({
    cloud: { cloudName: "ds5lreojp" },
  });

  // <------------Handle Side Effects------------>
  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (!adminToken && savedToken) {
      setAdminToken(savedToken);
    }
  }, [adminToken]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // <------------App functions------------>
  const logOut = () => {
    localStorage.removeItem("adminToken");
    setAdminToken(null);
    toast.dismiss();
    toast.success("Successfully Logged Out!!", {
      id: "logout",
    });
  };

  const productAction = (action, item) => {
    if (action === "add") {
      setAction("add");
      setItemData(initialState);
      setOpenModal(true);
    } else {
      setAction("edit");
      setItemData((prevData) => ({ ...prevData, ...item }));
      setOpenModal(true);
    }
  };

  const fetchProducts = async (filters, field, loadMore) => {
    if (!adminToken) return;

    try {
      let queryParams = new URLSearchParams(filters).toString();
      let fields;
      if (!field) {
        fields = "name,createdAt,quantity,category";
      } else {
        fields = field;
      }
      queryParams += `&fields=${fields}`;

      const response = await axios.post(
        `${backendUrl}/api/product/list?${queryParams}`
      );

      if (response.data.success) {
        if (response.data.products.length < 1) {
        } else if (loadMore) {
          setProducts((prevProducts) => [
            ...prevProducts,
            ...response.data.products,
          ]);
        } else {
          setProducts(response.data.products);
        }
      } else {
        toast.error(response.data.message, { id: "products_error" });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, { id: "products_error" });
    }
  };

  const logIn = async (email, password) => {
    try {
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });

      if (response.data.success) {
        setAdminToken(response.data.token);
        localStorage.setItem("adminToken", response.data.token);
        navigate("/");
      } else {
        console.log(response.data.message);
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const fetchCustomers = async () => {
    setLoading(true);
    if (!adminToken) return setLoading(false);
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/list`,
        {},
        { headers: { token: adminToken } }
      );
      setCustomers(response.data.users);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, { id: "customers_error" });
    } finally {
      setLoading(false);
    }
  };

  const fetchAllOrders = async (filters) => {
    if (!adminToken) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token: adminToken } }
      );
      if (response.data.success) {
        if (response.data.orders.length < 1) {
          setOrders(null);
        } else {
          setOrders(response.data.orders);
        }
        setLoading(false);
      } else {
        toast.error(response.data.message, { id: "order_error" });
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error("Failed to fetch orders.", { id: "order_error" });
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () =>
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));

  const value = {
    backendUrl,
    orders,
    loading,
    adminToken,
    setAdminToken,
    fetchAllOrders,
    navigate,
    logOut,
    logIn,
    cloudinary,
    theme,
    toggleTheme,
    products,
    setProducts,
    fetchProducts,
    productAction,
    action,
    itemData,
    openModal,
    setItemData,
    setOpenModal,
    performedSearch,
    setPerformedSearch,
    customers,
    fetchCustomers,
    counts,
    setCounts,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
