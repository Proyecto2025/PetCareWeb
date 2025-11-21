import { useState } from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative" aria-label="Menú principal">
      {/* Hamburguesa solo en móvil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-2xl text-(--color-primary) px-2 py-1 rounded md:hidden"
        aria-controls="menuMovil"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {isOpen ? "x" : "☰"}
      </button>

      {/* Menú móvil bajo header */}
      {isOpen && (
        <ul
          id="menuMovil"
          className="absolute top-full left-1/2 -translate-x-1/2 w-full bg-[rgba(255,236,58,1)] text-white z-50 flex flex-col items-center gap-6 px-10 py-10 rounded-lg shadow-xl md:hidden"
        >
          <li role="none">
            <NavLink
              to="/"
              className="contenedor__texto-normal px-2 py-1 text-sm sm:px-3 sm:py-2 sm:text-base md:px-4 md:py-2 md:text-lg rounded-md font-medium text-black hover:text-blue-900"
              onClick={() => setIsOpen(false)}
              role="menuitem"
            >
              Inicio
            </NavLink>
          </li>
          <li role="none">
            <NavLink
              to="/patos"
              className="contenedor__texto-normal px-2 py-1 text-sm sm:px-3 sm:py-2 sm:text-base md:px-4 md:py-2 md:text-lg rounded-md font-medium text-black hover:text-blue-900"
              onClick={() => setIsOpen(false)}
              role="menuitem"
            >
              Catálogo
            </NavLink>
          </li>
        </ul>
      )}

      {/* Menú escritorio */}
      <ul className="hidden md:flex gap-4" role="menubar">
        <li role="none">
          <NavLink
            to="/"
            className="contenedor__texto-normal px-2 py-1 text-sm sm:px-3 sm:py-2 sm:text-base md:px-4 md:py-2 md:text-lg rounded-md font-medium text-black hover:text-blue-900"
            role="menuitem"
          >
            Inicio
          </NavLink>
        </li>
        <li role="none">
          <NavLink
            to="/patos"
            className="contenedor__texto-normal px-2 py-1 text-sm sm:px-3 sm:py-2 sm:text-base md:px-4 md:py-2 md:text-lg rounded-md font-medium text-black hover:text-blue-900"
            role="menuitem"
          >
            Catálogo
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default Nav;
