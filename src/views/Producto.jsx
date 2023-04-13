import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById, createCheckoutSession } from "../functions";
import { useCarritoContext } from "../contexts/carritoContext";
import { useUserContext } from "../contexts/userContext";
import { Layout } from "../components";

function Producto() {
  const { id } = useParams();
  const [productInfo, setProductInfo] = useState(null);
  const { carrito, setCarrito } = useCarritoContext();
  const { user } = useUserContext();
  useEffect(() => {
    async function getProductInfo() {
      const product = await getProductById(id);
      console.log("producto", product);
      if (!product) {
        window.location = "/notfound";
      }
      setProductInfo(product);
    }
    getProductInfo();
  }, [id]);

  function addToCart() {
    setCarrito([...carrito, productInfo]);
  }

  return (
    <Layout>
      <div>
        <div id="producto-izquierda" className="w-1/2 p-10">
          <img
            src={productInfo?.images[0]}
            alt={productInfo?.name}
            className="max-auto"
          />
        </div>
        <div
          id="producto-derecha "
        >
          <h1>{productInfo?.name}</h1>
          <p>{productInfo?.description}</p>
          <div>
            <button
              onClick={addToCart}
              >
              AÑADIR A CARRITO
            </button>
            <button
              id="buy-button-producto"
              onClick={() => {
                addToCart();
                createCheckoutSession(user.uid, [{ ...productInfo }]);
                const btn = document.getElementById("buy-button-producto");
                btn.isDisabled = true;
                btn.classList.add("bg-gray-500");
                btn.classList.add("cursor-not-allowed");
                btn.innerText = "Comprando...";
              }}
            >
              COMPRAR AHORA
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Producto;