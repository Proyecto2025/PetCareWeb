import { useParams, useNavigate } from "react-router-dom";
import ducklyns from "../data/ducklyn";

function DetallesPato() {
  const { id } = useParams();
  const navigate = useNavigate();

  const pato = ducklyns.find((pato) => pato.id === parseInt(id));
  if (!pato) {
    return <p>Pato no encontrado</p>;
  }
  return (
    <>
      <article>
        <section className="flex items-center justify-between mb-4">
          <h1 className="contenedor__titulo">{pato.nombre}</h1>
        </section>

        {/*Centrar la imagen (mx-auto) y el texto */}
        <section className="text-end">
          <img
            src={pato.imagen}
            alt={`Imagen de ${pato.nombre}`}
            className="mx-auto  w-80 h-auto object-contain"
          />
        </section>

        {/* Categoria del pato en negrita  != para que se ponga en negrita¡ ya que en el contenedor__texto... no lo tengo así*/}
        <section>
          <p className="contenedor__texto-largo !font-bold">{pato.categoria}</p>
          <p className="contenedor__texto-largo">{pato.descripcion}</p>
          <p className="contenedor__precio !text-xl">{pato.precio}</p>
        </section>

        <section className="my-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-[#09207d] text-white rounded"
          > Volver
          </button>
        </section>

        <p className="contenedor__texto-normal">{pato.detalles}</p>

        
      </article>
    </>
  );
}
export default DetallesPato;
