import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  // <------------Constants and States------------>
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adminToken, setAdminToken] = useState(null);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // <------------Handle Side Effects------------>
  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (!adminToken && savedToken) {
      setAdminToken(savedToken);
    }
    if (adminToken) {
      fetchAllOrders();
    }
  }, [adminToken]);

  // <------------App functions------------>
  const logOut = () => {
    localStorage.removeItem("adminToken");
    setAdminToken(null);
    toast.dismiss();
    toast.success("Successfully Logged Out!!", {
      id: "logout",
    });
  };

  const logIn = async (email, password) => {
    try {
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });

      console.log(response);

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

  const fetchAllOrders = async () => {
    if (!adminToken) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token: adminToken } }
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

  console.log(orders);

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
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
