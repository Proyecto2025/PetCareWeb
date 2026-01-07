import { useState } from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  return (
    <>
      {/* Botón hamburguesa accesible */}
      <button
        className="md:hidden font-bold text-3xl text-black rounded px-3 py-1 focus:ring-green-500"
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
            ? "md:h-full opacity-100 pointer-events-auto md:max-h-none md:opacity-100 overflow-hidden transition-all duration-300 ease-in-out md:flex md:gap-6 text-lg absolute md:static left-0 right-0 top-20 md:top-autoshadow md:shadow-none p-6 md:p-0 z-50"
            : "opacity-0 md:max-h-none pointer-events-none md:pointer-events-auto md:opacity-100 overflow-hidden transition-all duration-300 ease-in-out md:flex md:gap-6 text-lg absolute md:static left-0 right-0 top-20 md:top-auto shadow md:shadow-none p-6 md:p-0 z-50"
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
      </nav>
    </>
  );
}

export default Nav;