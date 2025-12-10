import { useState } from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative" aria-label="Menú principal">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-2xl text-black px-2 py-1 rounded md:hidden"
        aria-controls="menuMovil"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {isOpen ? "×" : "☰"}
      </button>

      {isOpen && (
        <ul
          id="menuMovil"
          className="absolute top-full left-1/2 -translate-x-1/2 w-full bg-[#d6d6d4] z-50 flex flex-col items-center gap-6 px-10 py-10 rounded-lg shadow-xl md:hidden"
        >
          <li>
            <NavLink className="contenedor__textfont text-black" to="/" onClick={() => setIsOpen(false)}>Inicio</NavLink>
          </li>
          <li>
            <NavLink className="contenedor__textfont text-black" to="/advice" onClick={() => setIsOpen(false)}>Consejos</NavLink>
          </li>
          <li>
            <NavLink className="contenedor__textfont text-black" to="/newPost" onClick={() => setIsOpen(false)}>Publicar</NavLink>
          </li>
          <li>
            <NavLink className="contenedor__textfont text-black" to="/profile" onClick={() => setIsOpen(false)}>Perfil</NavLink>
          </li>
        </ul>
      )}

      <ul className="hidden md:flex gap-10">
        <li><NavLink className="contenedor__textfont text-black" to="/">Inicio</NavLink></li>
        <li><NavLink className="contenedor__textfont text-black" to="/advice">Cosejos</NavLink></li>
        <li><NavLink className="contenedor__textfont text-black" to="/newPost">Publicar</NavLink></li>
        <li><NavLink className="contenedor__textfont text-black" to="/profile">Perfil</NavLink></li>
      </ul>
    </nav>
  );
}
export default Nav;
