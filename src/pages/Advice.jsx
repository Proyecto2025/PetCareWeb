import advices from "../data/advice.js";
import { useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Card from "../components/Card.jsx";
import DropDownTitle from "../components/DropDownTitle.jsx";

function Advice() {
  const { categoria } = useParams();
  const navigate = useNavigate();

  // Por defecto muestra todas las categorías
  const filtroCategoria = categoria ? categoria.toLowerCase() : "todos";
  const TITULO_TODO = "Consejos";

  // Título dinámico basado en la categoría seleccionada
  const titulo = useMemo(() => {
    if (!categoria) return TITULO_TODO;
    return categoria.charAt(0).toUpperCase() + categoria.slice(1);
  }, [categoria]);

  // Opciones para filtrar por categoría
  const opcionesCategoria = [
    { label: "Todos", to: "/advice" },
    { label: "Accesorios", to: "/advice/accesorios" },
    { label: "Comida", to: "/advice/comida" },
    { label: "Higiene", to: "/advice/higiene" },
  ];

  // Filtrado de consejos según categoría
  const filtrado = useMemo(() => {
    return advices.filter(
      (advice) =>
        filtroCategoria === "todos" || advice.categoria.toLowerCase() === filtroCategoria
    );
  }, [filtroCategoria]);

  return (
    <>
      <DropDownTitle
        title={titulo}
        options={opcionesCategoria.map((opcion) => ({
          label: opcion.label,
          onClick: () => {
            navigate(opcion.to);
          },
        }))}
      />

      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch mt-6">
        {filtrado.map((consejos) => (
          <Link
            key={consejos.id}
            to={`/consejo/${consejos.id}`}
            aria-label={`Ver detalles de ${consejos.titulo}`}
          >
            <Card
              nombreUsuario={consejos.nombreUsuario}
              tipoAnimal={consejos.categoria}
              titulo={consejos.titulo}
              foto={consejos.imagen}
              descripcionCorta={consejos.descripcionCorta}
            />
          </Link>
        ))}
      </section>
    </>
  );
}

export default Advice;