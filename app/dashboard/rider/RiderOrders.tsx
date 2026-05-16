import React from "react";

interface Order {
  id: number;
  status: string;
}

interface Props {
  orders: Order[];
  updateOrderStatus: (orderId: number, status: string) => Promise<void>;
}

const RiderOrders = ({ orders, updateOrderStatus }: Props) => {
  const getStatusActions = (status: string) => {
    switch (status) {
      case "delivered":
        return [];
      case "processing":
        return [
          {
            label: "Mark Delivered",
            status: "delivered",
            className: "bg-green-600 hover:bg-green-700",
          },
        ];
      default:
        return [
          {
            label: "Mark Processing",
            status: "processing",
            className: "bg-yellow-500 hover:bg-yellow-600",
          },
          {
            label: "Mark Delivered",
            status: "delivered",
            className: "bg-green-600 hover:bg-green-700",
          },
        ];
    }
  };

  const renderStatusBadge = (status: string) => {
    const baseClasses = "inline-flex px-3 py-1 rounded-full text-sm font-semibold capitalize";
    if (status === "delivered") {
      return <span className={`${baseClasses} bg-emerald-100 text-emerald-700`}>{status}</span>;
    }
    if (status === "processing") {
      return <span className={`${baseClasses} bg-yellow-100 text-amber-700`}>{status}</span>;
    }
    return <span className={`${baseClasses} bg-slate-100 text-slate-700`}>{status}</span>;
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">
      <h2 className="text-3xl font-black mb-8">Assigned Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="pb-5">Order ID</th>
              <th className="pb-5">Status</th>
              <th className="pb-5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => {
                const actions = getStatusActions(order.status);
                return (
                  <tr key={order.id} className="border-b">
                    <td className="py-5 font-semibold">#{order.id}</td>
                    <td className="py-5">{renderStatusBadge(order.status)}</td>
                    <td className="py-5">
                      {actions.length > 0 ? (
                        <div className="flex flex-wrap gap-3">
                          {actions.map((action) => (
                            <button
                              key={action.label}
                              onClick={() => updateOrderStatus(order.id, action.status)}
                              className={`${action.className} text-white px-4 py-2 rounded-xl transition`}
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                          Completed
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="py-8" colSpan={3}>
                  No Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiderOrders;
