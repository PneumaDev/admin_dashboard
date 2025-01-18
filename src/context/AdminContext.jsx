import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adminToken, setAdminToken] = useState(null);

  const fetchAllOrders = async () => {
    if (!adminToken) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { adminToken } }
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (!adminToken && savedToken) {
      setAdminToken(savedToken);
    }
  }, [adminToken]);

  useEffect(() => {
    fetchAllOrders();
  }, [adminToken]);

  const value = {
    backendUrl,
    orders,
    loading,
    adminToken,
    fetchAllOrders,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
