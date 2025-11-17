import React from "react";

const OrderDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <div>
      <h1>Order Details</h1>
      <p>{id}</p>
    </div>
  );
};

export default OrderDetails;
