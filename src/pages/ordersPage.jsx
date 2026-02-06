//admin orders page ekma aran modify krnna

import axios from "axios";
import { useEffect, useState } from "react";
import ViewOrderInfoCustomer from "../components/viewOrderInfoCustomer";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setOrders(response.data);
          setLoaded(true);
        });
    }
  }, [loaded]);

  return (
    <div className=" w-full flex justify-center p-10 relative bg-primary overflow-hidden">
      <div className=" w-full max-w-[1300px] bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col">
        <div className="w-full max-h-[70vh] overflow-x-auto overflow-y-auto">
          {loaded ? (
            <table className="min-w-full divide-y divide-gray-200 ">
              <thead className="bg-accent">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                    OrderID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                    Customer Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                    Customer Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                    Total Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100">
                {orders.map((order, index) => {
                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-secondary">
                        {order.orderID}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-secondary">
                        {order.email}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-secondary">
                        {order.name}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-secondary">
                        {new Date(order.date).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-secondary">
                        {order.status}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-secondary">
                        LKR: {order.total.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-secondary">
                        <ViewOrderInfoCustomer order={order} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div>Loading</div>
          )}
        </div>
      </div>
    </div>
  );
}
