import profile from "../data/profile.js";
import Card from "../components/Card.jsx";
import posts from "../data/post.js";
import advices from "../data/advice.js";
import { useState } from "react";
import { Link } from "react-router-dom";

function Profile() {

  const user = profile[0];

  const postsUser = posts.filter(p => p.nombreUsuario === user.nombreUsuario);
  const advicesUser = advices.filter(a => a.nombreUsuario === user.nombreUsuario);

  const postsCount = postsUser.length;
  const advicesCount = advicesUser.length;

  const [content, setContent] = useState("adopcion");

  const adopcionUser = postsUser.filter(p => p.categoria === "Adopción");
  const extravioUser = postsUser.filter(p => p.categoria === "Extravio");
  const ayudaUser = postsUser.filter(p => p.categoria === "Ayuda");

  const emptyMessages = {
    adopcion: "Sin publicaciones de Adopción ;(",
    extravio: "Sin publicaciones de Extravío ;(",
    ayuda: "Sin publicaciones de Ayuda ;(",
    advices: "Sin consejos publicados ;(",
  };

  const currentList =
    content === "adopcion" ? adopcionUser :
      content === "extravio" ? extravioUser :
        content === "ayuda" ? ayudaUser :
          advicesUser;

  return (
    <section className="w-full">
      <section className="text-font justify-between block md:flex items-center gap-6 mb-10">
        <section>
          <h1 className="text-3xl font-bold mb-2">{user.nombreUsuario}</h1>

          <section className="flex gap-20 text-lg font-semibold">
            <section className="block">
              <p>{postsCount}</p>
              <p>Posts</p>
            </section>
            <section>
              <p>{advicesCount}</p>
              <p>Consejos</p>
            </section>
          </section>
        </section>

        <section className="flex text-2xl items-center gap-2 text-white primary-bg-color primary-color-hover transition-all ease-in-out< shadow-lg p-2 rounded-md cursor-pointer">
          <p>Editar datos</p>
          <span className="material-symbols-outlined">
            draft_orders
          </span>
        </section>
      </section>

      <section className="flex justify-center gap-10 md:gap-20 mb-10">
        <button onClick={() => setContent("adopcion")}
          className={`material-symbols-outlined profile-post-icon profile-post-icon-hover 
       ${content === "adopcion" ? "text-primary" : ""}`}
        >
          pets
        </button>
        <button onClick={() => setContent("extravio")}
          className={`material-symbols-outlined profile-post-icon profile-post-icon-hover 
       ${content === "extravio" ? "text-primary" : ""}`}
        >
          search
        </button>
        <button onClick={() => setContent("ayuda")}
          className={`material-symbols-outlined profile-post-icon profile-post-icon-hover 
       ${content === "ayuda" ? "text-primary" : ""}`}
        >
          volunteer_activism
        </button>
        <button onClick={() => setContent("advices")}
          className={`material-symbols-outlined profile-post-icon profile-post-icon-hover 
       ${content === "advices" ? "text-primary" : ""}`}
        >
          tooltip_2
        </button>
      </section>

      <section className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
        {currentList.length === 0 ? (
          <p className="col-span-full mt-10 text-center text-gray-400 text-lg">
            {emptyMessages[content]} 
          </p>
        ) : (
          <>
            {content === "adopcion" &&
              adopcionUser.map((animales) => (
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
                    ubicacion={animales.ubicacion}
                    municipio={animales.municipio}
                  />
                </Link>
              ))}

            {content === "extravio" &&
              extravioUser.map((animales) => (
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
                    ubicacion={animales.ubicacion}
                    municipio={animales.municipio}
                  />
                </Link>
              ))}

            {content === "ayuda" &&
              ayudaUser.map((animales) => (
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
                    ubicacion={animales.ubicacion}
                    municipio={animales.municipio}
                  />
                </Link>
              ))}

            {content === "advices" &&
              advicesUser.map((consejos) => (
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
          </>
        )}
      </section>

    </section>
  );
}
export default Profile;