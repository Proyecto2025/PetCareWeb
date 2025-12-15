import advices from "../data/advice.js";
import { useParams, useNavigate, Link } from "react-router-dom";
import Card from "../components/Card.jsx";
import DropdownTitle from "../components/DropDownTitle.jsx";

function Advice() {
  const { categoria } = useParams();
  const navigate = useNavigate();

  const filtro = categoria ? categoria.toLowerCase() : "todo";
  const filtrado = advices.filter(
    (advice) =>
      filtro === "todo" || advice.categoria.toLowerCase() === filtro.toLowerCase()
  );

  //Al hacer click se filtre por lo elegido
  const opciones = [
    { label: "Todo", to: "/advice" },
    { label: "Accesorios", to: "/advice/accesorios" },
    { label: "Comida", to: "/advice/comida" },
    { label: "Higiene", to: "/advice/higiene" },
  ];

  return (
    <>
      <DropdownTitle
        title="Consejos"
        options={opciones.map((opcion) => ({
          label: opcion.label,
          onClick: () => navigate(opcion.to),
        }))}
      />
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
        {/*Aqui sería la categoría en vez del tipoAnimal y pongo `/consejo porque o si no, no me encuentra la ruta
          ya que sale /advice/consejo/id pero en app no lo tengo así y por eso no iba
        */}
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
