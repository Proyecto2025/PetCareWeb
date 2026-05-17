import { useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Card from "../components/Card.jsx";
import DropDownTitle from "../components/DropDownTitle.jsx";
import { useAdvices } from "../hooks/useAdvices";

function Advice() {
  const { categoria } = useParams();
  const navigate = useNavigate();

  const { advices: advicesList, loading } = useAdvices();

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
    return (advicesList || []).filter(
      (advice) =>
        filtroCategoria === "todos" || advice.categoria.toLowerCase() === filtroCategoria
    );
  }, [advicesList, filtroCategoria]);

  return (
    <>
      <section className="w-full md:flex justify-between items-center mb-6">
        <DropDownTitle
          title={titulo}
          options={opcionesCategoria.map((opcion) => ({
            label: opcion.label,
            onClick: () => {
              navigate(opcion.to);
            },
          }))}
        />
      </section>

      <section className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
        {loading ? (
          <section className="col-span-full flex flex-row items-center justify-center text-gray-500 text-xl mt-10 gap-3">
            <span className="material-symbols-outlined animate-spin text-2xl">progress_activity</span>
            <p>Cargando consejos...</p>
          </section>
        ) : (
          filtrado.map((consejos) => (
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
        )))}
      </section>
    </>
  );
}

export default Advice;