//row ekk click krma order ekta adala popup menu ekk enna one

import { useState } from "react";

import Modal from "react-modal";

// Set this once in your app (e.g. in root App component)
// Modal.setAppElement('#root')

export default function ViewOrderInfoCustomer(props) {
  const order = props.order;
  const [modalIsOpen, setIsOpen] = useState(false);

  if (!order) {
    return (
      <button
        className="w-full h-[40px] bg-accent/80 hover:bg-accent rounded-xl shadow-2xl text-white transition"
        onClick={() => setIsOpen(true)}
      >
        View Info
      </button>
    );
  }

  const formatDate = (d) => new Date(d).toLocaleString();

  const statusClasses = (s) => {
    const st = (s || "").toLowerCase();
    if (st === "pending") return "bg-yellow-100 text-yellow-800";
    if (st === "processing") return "bg-blue-200 text-blue-800";
    if (st === "shipped" || st === "delivered")
      return "bg-green-100 text-green-800";
    if (st === "cancelled" || st === "returned")
      return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  const currency = (n) => {
    if (typeof n !== "number") return n;
    return `LKR ${n.toFixed(2)}`;
  };

  const totalItems =
    order.items?.reduce((acc, it) => acc + (it.quantity || 0), 0) || 0;

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel={`Order ${order.orderID} details`}
        overlayClassName="fixed inset-0 bg-black/40 z-40 flex items-center justify-center"
        className="relative max-w-4xl w-[95%] md:w-3/4 bg-white rounded-2xl shadow-2xl p-6 outline-none z-50 overflow-hidden"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Order #{order.orderID}
            </h2>
            <p className="text-sm text-gray-500">
              Placed on {formatDate(order.date)}
            </p>
          </div>
        </div>
        <div className="flex items-end justify-end gap-4 ">
          <select
            value={status}
            disabled
            className={`px-3 py-1 rounded-full text-sm font-medium border cursor-pointer
              ${statusClasses(status)}`}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button
            className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
            onClick={() => window.print()}
            title="Print order"
          >
            Print
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Customer & Shipping */}
          <div className="col-span-1 bg-gray-50 p-4 rounded-xl">
            <h3 className="text-m font-medium text-gray-800">Customer Name</h3>
            <p className="text-sm  font-semibold text-gray-500">{order.name}</p>

            <h3 className="text-m mt-1.5 font-medium text-gray-800">Email</h3>
            <p className="text-sm text-gray-500">{order.email}</p>

            <h3 className="text-m mt-1.5 font-medium text-gray-800">
              Customer Phone
            </h3>
            <p className="text-sm text-gray-500">+{order.phone}</p>

            <h3 className="text-m font-medium text-gray-800 mt-4">
              Shipping Address
            </h3>
            <p className=" text-sm text-gray-700 whitespace-pre-line">
              {order.address}
            </p>

            <h3 className="text-m font-medium text-gray-800 mt-4">
              Aditional Notes
            </h3>

            <textarea
              value={order.notes}
              disabled
              placeholder="Additional notes"
              className="mt-2 w-full min-h-[90px] rounded-lg border border-gray-300 p-2 text-sm
                                    focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            />
          </div>

          {/* Items */}
          <div className="md:col-span-2 col-span-1">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="text-sm font-medium text-gray-600">
                Items ({totalItems})
              </h3>

              <div className="mt-3 max-h-56 overflow-auto pr-2">
                <ul className="space-y-3">
                  {order.items?.map((it) => (
                    <li
                      key={it.productID}
                      className="flex items-center gap-4 p-3 rounded-lg border border-gray-100"
                    >
                      <img
                        src={it.image}
                        alt={it.name}
                        className="w-16 h-16 object-contain rounded-lg flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 truncate">
                          {it.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          ID: {it.productID}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty: {it.quantity} × {currency(it.price)}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold text-gray-800">
                          {currency(it.price * it.quantity)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {currency(it.price)} each
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex items-center justify-end gap-6 border-t pt-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Subtotal</p>
                  <p className="text-xl font-semibold text-gray-800">
                    {currency(order.total)}
                  </p>
                </div>
              </div>
            </div>

            {/* Summary / Actions */}
            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                <p>
                  Items:{" "}
                  <span className="font-medium text-gray-800">
                    {order.items?.length || 0}
                  </span>
                </p>
                <p>
                  Payment:{" "}
                  <span className="font-medium text-gray-800">
                    {order.paymentMethod || "—"}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Example action buttons - wire these to your handlers if needed */}

                <button
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <button
        className="w-full h-[40px] bg-accent/80 hover:bg-accent rounded-xl shadow-2xl text-white transition cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        View Info
      </button>
    </>
  );
}
