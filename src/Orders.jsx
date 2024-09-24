/* eslint-disable react/prop-types */

import { useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "./App";
import { useState } from "react";
import { toast } from "react-toastify";
import { assets } from "./assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/v1/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/v1/order/status",
        { orderId, status: e.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[o.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 md:my-4 text-xs sm:text-sm text-gray-700"
          >
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, itemIndex) => {
                  if (itemIndex === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={itemIndex}>
                        {item.name} * {item.quantity}
                        <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={itemIndex}>
                        {item.name} * {item.quantity}
                        <span>{item.size}</span>,
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium ">
                {order.address.firstName + "" + order.address.lastName}
              </p>
              <div>
                <p>{order.address.street}</p>
                <p>
                  {order.address.city +
                    "" +
                    order.address.state +
                    "," +
                    order.address.country +
                    "," +
                    order.address.pinCode}
                </p>
              </div>

              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="tect:sm sm:text-[15px]">
                Items:{order.items.length}
              </p>
              <p className="mt-3 ">Method:{order.paymentMethod}</p>
              <p>Payment:{order.payment ? "Done" : "pending"}</p>
              <p>Date:{new Date(order.date).toDateString()}</p>
            </div>

            <p className="text-sm sm:text-[15px]">
              {currency}
              {order.amount}
            </p>

            <select
              onChange={(e) => {
                statusHandler(e, order._id);
              }}
              className="font-semibold p-2"
              value={order.status}
            >
              <option value="order Placed">order Placed</option>
              <option value="Packing">Packing</option>
              <option value="shipped">shipped</option>
              <option value="out for delivery">out for delivery</option>
              <option value="delivered">delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
