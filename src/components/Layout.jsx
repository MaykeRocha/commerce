import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { useCarritoContext } from "../contexts/carritoContext";

function Layout({ children }) {
  const { carrito } = useCarritoContext();
  return (
    <div>
      <header>
        <nav>
          <Link to="/" className="Bienvenido">
            {" "}
            Bienvenido
          </Link>
          <input
            className="bg-deseas"
            placeholder="¿Qué deseas buscar?"
          ></input>
          <div>
            <Link to="/carrito" className="carrito">
              <span
                className={`absolute w-3 h-3 rounded-full bg-red-600 top-0 right-0  translate-x-1/2 -translate-y-1/2  ${
                  carrito.length > 0 ? "opacity-100" : "opacity-0"
                }`}
              ></span>
              <AiOutlineShoppingCart size={30} />
            </Link>
            <Link to="/perfil">
              <AiOutlineUser size={30} />
            </Link>
          </div>
        </nav>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <div>
          <span className="Lafi"> Carrito</span>
        </div>
      </footer>
    </div>
  );
}

export default Layout;