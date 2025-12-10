import posts from "../data/post.js";
import Card from "../components/Card.jsx";
import DropdownTitle from "../components/DropDownTitle.jsx";

import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <DropdownTitle
        title="Publicaciones"
        options={[
          { label: "Todo", onClick: () => console.log("Ir a FAQ") },
          { label: "Adopcion", onClick: () => console.log("Ir a FAQ") },
          { label: "Ayuda", onClick: () => console.log("Ir a contacto") },
          { label: "Extravio", onClick: () => console.log("Ir a contacto") },
        ]}
      />
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
        {posts.map((animales) => (
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
