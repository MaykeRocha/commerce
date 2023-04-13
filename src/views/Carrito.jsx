import React, { useState } from "react";
import { useCarritoContext } from "../contexts/carritoContext";
import { useUserContext } from "../contexts/userContext";
import { Layout, CartItem } from "../components";
import { Link } from "react-router-dom";
import { loginEmail, createCheckoutSession } from "../functions";
import { MdOutlineClose } from "react-icons/md";

function Carrito() {
  const { carrito } = useCarritoContext();

  const { user } = useUserContext();
  const [isModal, setIsModal] = useState(false);

  async function login(e) {
    e.preventDefault();
    const correo = e.target.email.value;
    const password = e.target.password.value;
    const cuenta = await loginEmail(correo, password);
    console.log(cuenta);
    setIsModal(false);
    //funcion de compra
    createCheckoutSession(cuenta.user.uid, carrito);
    const btn = document.getElementById("buy-button");
    btn.isDisabled = true;
    btn.classList.add("bg-gray-500");
    btn.classList.add("cursor-not-allowed");
    btn.innerText = "Comprando...";
  }

  function LoginForm() {
    return (
      <form
        onSubmit={(e) => login(e)}
        >
        <input
          type="text"
          name="email"
          placeholder="test@test.com"
        />
        <input
          type="password"
          name="password"
          placeholder="123456"
        />
        <button>
          Iniciar Sesión
        </button>
      </form>
    );
  }

  function isAuthenticated() {
    if (user) {
      // funcion de comprar
      createCheckoutSession(user.uid, carrito);
      const btn = document.getElementById("buy-button");
      btn.isDisabled = true;
      btn.classList.add("bg-gray-500");
      btn.classList.add("cursor-not-allowed");
      btn.innerText = "Comprando...";
    }
    if (!user) {
      // mostrar modal
      setIsModal(true);
    }
  }

  const Modal = () => (
    <div
      id="modal-comprar"
      className={`absolute top-0 left-0 bg-slate-600/40 w-screen h-screen z-30 backdrop-blur-sm flex flex-col justify-center items-center ${
        isModal ? "block" : "hidden"
      }`}
    >
      <div>
        {" "}
        <span
          onClick={() => setIsModal(false)}
        >
          <MdOutlineClose />
        </span>
        <h3>
          Inicia Sesión para comprar:
        </h3>
        <LoginForm onSubmit={login} />
      </div>
    </div>
  );

  return (
    <Layout>
      <Modal />

      <h1 className="text-3xl font-bold my-10">Tu carrito:</h1>

      {carrito.length === 0 ? (
        <>
          <p>No hay productos en tu carrito</p>
          <Link to="/">
            Volver al inicio
          </Link>
        </>
      ) : (
        carrito?.map((producto) => <CartItem producto={producto} />)
      )}
      {carrito?.length > 0 && (
        <button
          id="buy-button"
          onClick={isAuthenticated}
          
        >
          {" "}
          COMPRAR
        </button>
      )}
    </Layout>
  );
}

export default Carrito;