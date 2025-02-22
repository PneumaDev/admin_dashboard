import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import InfoMessage from "./InfoComponent";

export default function VerifyPayments({ order }) {
  const [loading, setLoading] = useState(true);

  const { backendUrl, adminToken, verifiedOrder, setVerifiedOrder } =
    useContext(AdminContext);

  const confirmPayment = async () => {
    if (verifiedOrder.orderId === order._id) return setLoading(false);
    try {
      const response = await axios.post(
        backendUrl + "/api/order/confirmPayment",
        { order, admin: true },
        { headers: { token: adminToken } }
      );

      setVerifiedOrder(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    confirmPayment();
  }, [order]);

  console.log(verifiedOrder);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-24">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col">
        <div className="font-muktaVaani font-bold flex gap-x-2">
          Order ID:{" "}
          <span className="font-yantramanav font-thin">{order._id}</span>
        </div>
        <div className="font-muktaVaani font-bold flex gap-x-2">
          Checkout ID:{" "}
          <span className="font-yantramanav font-thin">
            {order.checkoutRequestId.slice(0, 20)}...
          </span>
        </div>
        <div className="font-muktaVaani font-bold flex gap-x-2">
          Phone Number:{" "}
          <span className="font-yantramanav font-thin">
            {order.address.phone}
          </span>
        </div>
        <div className="font-muktaVaani font-bold flex gap-x-2">
          Amount:{" "}
          <span className="font-yantramanav font-thin">
            Ksh. {order.amount}
          </span>
        </div>
      </div>
      {verifiedOrder.success ? (
        <InfoMessage title={"Successful"} type="success" />
      ) : (
        <InfoMessage title={"Unsuccessful"} type="error" />
      )}
    </div>
  );
}
