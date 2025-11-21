import { Link } from "react-router-dom";
import ContenedorGlobal from "../components/ContenedorGlobal";
import TarjetaPato from "../components/TarjetaPato";
import ducklyn from "../data/ducklyn";
import Slogan from "../assets/images/Slogan.png";

function Home() {
  return (
    <ContenedorGlobal titulo="Nuestros Patos">
      <article>
        <section className="flex justify-center mb-8">
          <img
            src={Slogan}
            alt="Slogan de Ducklyn"
            className="w-64 h-auto object-contain"
          />
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
          {ducklyn.slice(0, 8).map((pato) => (
            <Link key={pato.id} to={`/patos/${pato.id}`}>
              {" "}
              {/* Mostrar solo los primeros 8 patos gracias a slice*/}
              <TarjetaPato
                key={pato.id}
                nombre={pato.nombre}
                foto={pato.imagen}
              />
            </Link>
          ))}
        </section>
      </article>
    </ContenedorGlobal>
  );
}
export default Home;
