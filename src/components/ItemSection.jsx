import React from "react";
import ItemCard from "./ItemCard";

function ItemSection({ productos, title }) {
  return (
    <>
      <h3 >
        {" "}
        {title} :
      </h3>
      <ul>
        {productos
          ? productos.map((p) => (
              <li  key={p.id}>
                <ItemCard product={p} />
              </li>
            ))
          : null}
      </ul>
    </>
  );
}

export default ItemSection;