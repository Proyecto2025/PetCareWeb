import { useParams, useNavigate } from "react-router-dom";
import posts from "../data/post.js";

function DetailAnimal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const animal = posts.find((a) => a.id === parseInt(id));

  if (!animal) {
    return <p>No existe la página con ese animal</p>;
  }

  return (
    <article className="max-w-4xl mx-auto p-4 space-y-4">
      <section className="border border-gray-300 p-4 rounded text-left flex flex-col md:flex-row gap-6 items-start">
        {/* Título + Imágen a la izq */}
        <header className="space-y-4">
          <h1 className="contenedor__texto-primary text-2xl font-bold">
            {animal.titulo}
          </h1>
          <p className="text-black text-lg font-bold baloo tracking-wide leading-tight">
            {animal.ubicacion}
          </p>
          <figure>
            <img
              src={animal.imagen}
              alt={`Imagen de ${animal.titulo}`}
              className="w-64 h-auto rounded"
            />
            <figcaption className="sr-only">{animal.titulo}</figcaption>
          </figure>
        </header>

        {/* Descripción + datos extra a la der*/}
        <section className="space-y-4">
          <p className="contenedor__texto-primary font-bold baloo">
            Descripción
          </p>
          <p className="contenedor__texto-normal">{animal.descripcionLarga}</p>

          <p className="contenedor__texto-primary font-bold baloo">
            Datos Extra
          </p>
          <p className="contenedor__texto-normal">{animal.datosExtra}</p>
        </section>
      </section>

      <section>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-[#0C653D] text-white baloo rounded"
        >
          Volver
        </button>
      </section>
    </article>
  );
}
export default DetailAnimal;
