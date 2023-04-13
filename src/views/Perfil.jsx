import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { Layout, LoginForm } from "../components";
import { useUserContext } from "../contexts/userContext";
import { auth } from "../firebase/credenciales";
import { loginEmail, getPaymentsByUID } from "../functions/";
function Perfil() {
  function login(e) {
    e.preventDefault();
    const correo = e.target.email.value;
    const password = e.target.password.value;
    loginEmail(correo, password);
  }

  const { user } = useUserContext();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    async function getPayments() {
      if (!user) return;
      console.log("user por usar", user.uid);
      const payments = await getPaymentsByUID(user.uid);
      setPayments(payments);
    }
    getPayments();
  }, [user]);
  return (
    <Layout>
      {user ? (
        <p>
          Bienvenido,{" "}
          <span>
            {user.email} - {user.uid}
          </span>
        </p>
      ) : (
        <div>
          <p>No estas logueado</p>
          <LoginForm onSubmit={login} />
        </div>
      )}
      {payments.length > 0 &&
        payments.map((payment) => (
          <div>
            <h3>{payment.amount / 100} </h3>
            <span>
              {" "}
              {payment.items.map((item) => (
                <p key={item.description} className="mx-3">
                  {item.description}
                </p>
              ))}
            </span>
          </div>
        ))}

      {user && (
        <button
          onClick={() => signOut(auth)}
        >
          Cerrar Sesión
        </button>
      )}
    </Layout>
  );
}

export default Perfil;