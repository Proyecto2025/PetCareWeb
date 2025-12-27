import Nav from "./Nav.jsx";
import { Link } from "react-router-dom";

function Header() {
  {/* No poner ARTICLE, porque el header es como que ya lo contiene */}
  return ( 
    <header className="contenedor__barra-principal py-6">
      <section className="mx-auto flex justify-between items-center px-4">
        <Link className="flex items-center gap-3" to="/">
          <h1 className="contenedor__titulo contenedor__textfont cursor-pointer">PetCare</h1>
        </Link>
        <Nav />
      </section>
    </header>
  );
}
export default Header;
