import ContenedorGlobal from "../components/ContenedorGlobal";
import TarjetaPato from "../components/TarjetaPato";
import ducklyn from "../data/ducklyn";
import { Link } from "react-router-dom";
function Patos() {
  return (
    <ContenedorGlobal titulo="Nuestros Patos">
      <p className="contenedor__texto-largo  mb-6">
        Coloridos, divertidos y coleccionables
      </p>
      <article>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
          {ducklyn.map((pato) => (
            <Link key={pato.id} to={`/patos/${pato.id}`}>
              {/* A donde va a ir el navegador al clicar */}
              <TarjetaPato
                key={pato.id}
                nombre={pato.nombre}
                foto={pato.imagen}
                descripcion={pato.descripcion}
                //categoria={pato.categoria}
                precio={pato.precio}
              />
            </Link>
          ))}
        </section>
      </article>
    </ContenedorGlobal>
  );
}

export default Patos;
