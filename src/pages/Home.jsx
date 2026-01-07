import posts from "../data/post.js";
import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Card from "../components/Card.jsx";
import DropDownTitle from "../components/DropDownTitle.jsx";
import Filter from "../components/Filter.jsx";
import UbicacionFilter from "../components/UbicacionFilter.jsx";

function Home() {
  const GEOAPI_KEY = "ffbe70b5978749886d63284dfbdab1cf22cb3e40a40c6f0c87f74dc49bbdd7f4"; 

  const { categoria } = useParams();
  const navigate = useNavigate();

  // Por defecto muestra todas las categorías
  const filtroCategoria = categoria ? categoria.toLowerCase() : "todas";

  const [filtroAnimal, setFiltroAnimal] = useState("todos");
  const TITULO_TODO = "Publicaciones";

  // Título dinámico basado en la categoría seleccionada
  const titulo = useMemo(() => {
    if (!categoria) return TITULO_TODO;
    return categoria.charAt(0).toUpperCase() + categoria.slice(1);
  }, [categoria]);

  // Opciones para filtrar por categoría
  const opcionesCategoria = [
    { label: "Todas", to: "/posts" },
    { label: "Adopción", to: "/posts/adopción" },
    { label: "Ayuda", to: "/posts/ayuda" },
    { label: "Extravio", to: "/posts/extravio" },
  ];

  // Opciones para filtrar por tipo de animal
  const opcionesAnimal = [
    { label: "Todos", value: "todos" },
    { label: "Perro", value: "perro" },
    { label: "Gato", value: "gato" },
  ];

  // Filtrado de posts según categoría y animal
  const filtrado = useMemo(() => {
    return posts.filter(post => {
      const coincideCategoria =
        filtroCategoria === "todas" || post.categoria.toLowerCase() === filtroCategoria;
      const coincideAnimal =
        filtroAnimal === "todos" || post.tipoAnimal.toLowerCase() === filtroAnimal;
      return coincideCategoria && coincideAnimal;
    });
  }, [filtroCategoria, filtroAnimal]);

  return (
    <>
      <section className="w-full flex justify-between items-center mb-6 gap-4">
        <DropDownTitle
          title={titulo}
          options={opcionesCategoria.map(opcion => ({
            label: opcion.label,
            onClick: () => {
              navigate(opcion.to);
            }
          }))}
        />

        <UbicacionFilter apiKey={GEOAPI_KEY} />

        <Filter
          title={opcionesAnimal.find(opt => opt.value === filtroAnimal)?.label || "Todos"}
          options={opcionesAnimal.map(opt => ({
            label: opt.label,
            onClick: () => setFiltroAnimal(opt.value),
          }))}
        />
      </section>

      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
        {filtrado.map(animales => (
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