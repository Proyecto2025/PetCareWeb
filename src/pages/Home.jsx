import posts from "../data/post.js";
import { useParams, useNavigate, Link } from "react-router-dom";
import Card from "../components/Card.jsx";
import DropdownTitle from "../components/DropDownTitle.jsx";



function Home() {
  const { categoria } = useParams();
  const navigate = useNavigate();

  {
    /*Por defecto siempre muestra todos */
  }
  const filtro = categoria ? categoria.toLowerCase() : "todo";
  const filtrado = posts.filter(
    (post) =>
      filtro === "todo" || post.categoria.toLowerCase() === filtro.toLowerCase()
  );

  //Al hacer click se filtre por lo elegido
  const opciones = [
    { label: "Todo", to: "/posts" },
    { label: "Adopción", to: "/posts/adopción" },
    { label: "Ayuda", to: "/posts/ayuda" },
    { label: "Extravio", to: "/posts/extravio" },
  ];

  return (
    <>
      <DropdownTitle
        title="Publicaciones"
        options={opciones.map((opcion) => ({
          label: opcion.label,
          onClick: () => navigate(opcion.to),
        }))}
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
