import posts from "../data/post.js";
import { useState } from "react"; 
import Card from "../components/Card.jsx";
import DropdownTitle from "../components/DropDownTitle.jsx";

import { Link } from "react-router-dom";

function Home() {
  const [filtro, setFiltro] = useState("Todo");
    const filtrado = posts.filter((post) => 
        filtro === "Todo" || post.categoria.toLowerCase() === filtro.toLowerCase()
    );
    
    //Al hacer click se filtre por lo elegido
    const opciones = [
    { label: "Todo", onClick: () => setFiltro("Todo") },
    { label: "Adopcion", onClick: () => setFiltro("Adopción") },
    { label: "Ayuda", onClick: () => setFiltro("Ayuda") },
    { label: "Extravio", onClick: () => setFiltro("Extravio") },
  ];


  return (
    <>
      <DropdownTitle
        title="Publicaciones"
        options={opciones}
      />
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
        {filtrado.map((animales) => (
          <Link
            key={animales.id}
            to={`/animal/${animales.id}`}
            aria-label={`Ver detalles de ${animales.titulo}`}
          >
            <Card
              nombreUsuario={animales.nombreUsuario}
              tipoAnimal={animales.tipoAnimal}
              titulo={animales.titulo}
              foto={animales.imagen}
              descripcionCorta={animales.descripcionCorta}
            />
          </Link>
        ))}
      </section>
  </>
  );
}
export default Home;