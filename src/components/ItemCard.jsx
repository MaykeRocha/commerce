import React from "react";
import { Link } from "react-router-dom";

function ItemCard({ product }) {
  return (
    <Link to={`/producto/${product.id}`}>
      <div>
        <img
          src={product.images[0]}
          alt={product.name}
          className="auto"
        />
        <h3>{product.name}</h3>
        <div>
          <p>
            ${(product.price.unit_amount * 1.5) / 100}
          </p>
          <span> →</span>
          <span>
            <p>
              ${product.price.unit_amount / 100}
            </p>
            {product.price.currency}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ItemCard;