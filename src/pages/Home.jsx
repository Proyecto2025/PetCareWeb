import posts from "../data/post.js";
import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Card from "../components/Card.jsx";
import DropdownTitle from "../components/DropdownTitle.jsx";
import Filter from "../components/Filter.jsx";

function Home() {
  const { categoria } = useParams();
  const navigate = useNavigate();

  // Por defecto muestra todas las categorías
  const filtroCategoria = categoria ? categoria.toLowerCase() : "todas";

  const [titulo, setTitulo] = useState("Publicaciones");
  const [filtroAnimal, setFiltroAnimal] = useState("todos");
  const TITULO_TODO = "Publicaciones";

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
      <section className="w-full flex justify-between mb-4">
        <DropdownTitle
          title={titulo}
          options={opcionesCategoria.map(opcion => ({
            label: opcion.label,
            onClick: () => {
              setTitulo(opcion.label === "Todas" ? TITULO_TODO : opcion.label);
              navigate(opcion.to);
              setFiltroAnimal("todos"); // resetea filtro de animal al cambiar categoría
            }
          }))}
        />

        {/* Filtro por tipo de animal */}
        <Filter
          title={opcionesAnimal.find(opt => opt.value === filtroAnimal)?.label || "Todos"}
          options={opcionesAnimal.map(opt => ({
            label: opt.label,
            onClick: () => setFiltroAnimal(opt.value),
          }))}
        />
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
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