import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "./Modal.jsx";

function Nav() {
  const [open, setOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    window.dispatchEvent(new Event("authChange"));
    closeMenu();
  };

  return (
    <>
      {/* Botón hamburguesa accesible */}
      <button
        className="md:hidden font-bold text-4xl primary-color rounded px-3 py-1 focus:ring-green-500 cursor-pointer"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls="menu-principal"
        onClick={toggleMenu}
      >
        {open ? "×" : "☰"}
      </button>

      {/* NAV */}
      <nav
        id="menu-principal"
        className={
          open
            ? "md:h-full opacity-100 pointer-events-auto md:max-h-none md:opacity-100 overflow-hidden transition-all duration-300 ease-in-out md:flex md:items-center md:gap-6 text-lg absolute md:static left-0 right-0 top-20 bg-white shadow-md border-b border-gray-200 md:shadow-none md:border-none p-6 md:p-0 z-50"
            : "opacity-0 md:max-h-none pointer-events-none md:pointer-events-auto md:opacity-100 overflow-hidden transition-all duration-300 ease-in-out md:flex md:items-center md:gap-6 text-lg absolute md:static left-0 right-0 top-20 bg-white shadow-md border-b border-gray-200 md:shadow-none md:border-none p-6 md:p-0 z-50"
        }
        aria-label="Navegación principal"
      >
        {/* Inicio */}
        <NavLink
          to="/"
          onClick={closeMenu}
          className={(isActive) =>
            isActive
              ? "md:contenedor__textfont block ml-3 border-b-[0.25px] border-gray-300 md:border-none md:ml-0 pt-5 pb-5 md:pt-0 md:pb-0 text-black font-medium md:hover:text-green-600"
              : "md:contenedor__textfont text-black font-medium md:hover:text-green-600"
          }
        >
          Inicio
        </NavLink>

        {/* Consejos */}
        <NavLink
          to="/advice"
          onClick={closeMenu}
          className={(isActive) =>
            isActive
              ? "md:contenedor__textfont block border-b-[0.25px] border-gray-300 md:border-none ml-3 md:ml-2 pt-5 pb-5 md:pt-0 md:pb-0 text-black font-medium md:hover:text-green-600"
              : "md:contenedor__textfont text-black font-medium md:hover:text-green-600"
          }
        >
          Consejos
        </NavLink>

        {/* Publicar */}
        <NavLink
          to="/newPost"
          onClick={closeMenu}
          className={(isActive) =>
            isActive
              ? "md:contenedor__textfont block border-b-[0.25px] border-gray-300 md:border-none ml-3 md:ml-2 pt-5 pb-5 md:pt-0 md:pb-0 text-black font-medium md:hover:text-green-600"
              : "md:contenedor__textfont text-black font-medium hover:text-green-600"
          }
        >
          Publicar
        </NavLink>

        {/* Perfil */}
        <NavLink
          to="/profile"
          onClick={closeMenu}
          className={(isActive) =>
            isActive
              ? "md:contenedor__textfont block ml-3 md:ml-2 pb-5 pt-5 md:pt-0 md:pb-0 text-black font-medium md:hover:text-green-600"
              : "md:contenedor__textfont text-black font-medium md:hover:text-green-600"
          }
        >
          Perfil
        </NavLink>

        {/* Botón Login/Logout */}
        <section className="mt-5 md:mt-0 ml-3 md:ml-4">
          {isLoggedIn ? (
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="text-red-600 font-bold border-2 border-red-600 px-4 py-2 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
            >
              Log out
            </button>
          ) : (
            <NavLink
              to="/login"
              onClick={closeMenu}
              className="primary-bg-color text-white font-bold px-6 py-2 rounded-md primary-color-hover transition-all shadow-md inline-block"
            >
              Log in
            </NavLink>
          )}
        </section>
      </nav>
      
      <Modal
        isOpen={isLogoutModalOpen}
        title="¿Cerrar sesión?"
        message="¿Estás seguro de que quieres cerrar la sesión actual?"
        confirmText="Sí, salir"
        cancelText="Cancelar"
        isDestructive={true}
        onConfirm={() => {
          navigate('/');
          handleLogout();
          setIsLogoutModalOpen(false);
        }}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
}

export default Nav;