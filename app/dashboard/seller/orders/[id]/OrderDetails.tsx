"use client";

import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:3000";

export default function OrderDetails({
  orderId,
}: {
  orderId: string;
}) {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await fetch(
        `${API_BASE_URL}/seller/orders/${orderId}`
      );

      const data = await res.json();

      setOrder(data);
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return (
      <div className="p-10 text-center font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-black mb-8">
        Order #{order.id}
      </h1>

      <div className="bg-white border rounded-2xl p-6 space-y-3">
        <p>
          <strong>Customer:</strong>{" "}
          {order.customer?.name}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {order.customer?.email}
        </p>

        <p>
          <strong>Payment:</strong>{" "}
          {order.paymentMethod}
        </p>

        <p>
          <strong>Total:</strong> ৳
          {Number(order.totalAmount).toLocaleString()}
        </p>
      </div>

      <div className="mt-8 border rounded-2xl overflow-hidden">
        {order.orderItems?.map((item: any) => (
          <div
            key={item.id}
            className="p-5 border-b flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold text-lg">
                {item.product?.productName}
              </h3>

              <p>
                Quantity: {item.quantity}
              </p>

              <p>
                Price: ৳
                {Number(item.price).toLocaleString()}
              </p>
            </div>

            <span className="font-bold capitalize">
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}