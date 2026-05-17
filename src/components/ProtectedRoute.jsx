import { Link } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    return (
      <section className="w-full flex flex-col items-center justify-center p-10">
        <h1 className="text-4xl font-bold mb-4 primary-color contenedor__textfont text-center">
          Inicia sesión para continuar
        </h1>
        <p className="text-gray-600 mb-8 text-center text-lg">
          Debes estar registrado para acceder a esta sección de la comunidad.
        </p>
        <Link 
          to="/login" 
          className="py-4 px-10 primary-bg-color text-white text-2xl contenedor__textfont rounded-md shadow-lg primary-color-hover transition-all duration-300"
        >
          Ir al Login
        </Link>
      </section>
    );
  }

  return children;
}

export default ProtectedRoute;
