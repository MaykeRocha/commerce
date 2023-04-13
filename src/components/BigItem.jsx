import React from "react";

function BigItem({ producto }) {
  return (
    <div>
      <div>
        <img src={producto.images[0]} alt="" className="w-2/3 rounded-md" />
      </div>
      <div>
        <h3 className="pro">{producto.name}</h3>
      </div>
      <div>
        <p> ${producto.price.unit_amount / 100}</p>
      </div>
    </div>
  );
}

export default BigItem;