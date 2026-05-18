import { useState } from "react";

function Detail({ objeto, onBack, label = "ubicacion" }) {
  {
    /*Por defecto siempre muestra la ubicación (a no ser que se le pase uno llamado categoria) */
  }

  const [copiado, setCopiado] = useState(false);

  // Copia el enlace de la publicación al portapapeles para compartir el post
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  if (!objeto) {
    return <p>No existe la página</p>;
  }

  return (
    <article className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <section>
        <button
          onClick={onBack}
          className="px-6 py-3 primary-bg-color text-white contenedor__textfont text-[1.2rem] rounded-lg shadow primary-color-hover transition cursor-pointer flex items-center gap-1"
        >
          <span className="material-symbols-outlined">
            keyboard_arrow_left
          </span>
          Volver
        </button>
      </section>

      <section className="bg-white border border-gray-200 shadow-md p-6 rounded-lg text-left flex flex-col lg:flex-row gap-8 items-start">
        {/* Título + Imagen */}
        <header className="space-y-4 w-full lg:w-1/3">
          <h1 className="contenedor__texto-primary text-2xl sm:text-3xl font-bold">
            {objeto.titulo}
          </h1>
          <p className="flex text-gray-700 text-base sm:text-lg font-semibold baloo tracking-wide leading-tight">
            <span>{objeto[label]}</span>
            {label === "ubicacion" && objeto.municipio && (
              <>
                <span className="mx-1 primary-color">/</span>
                <span>{objeto.municipio}</span>
                <span className="material-symbols-outlined align-middle primary-color ml-1">
                  location_on
                </span>
              </>
            )}
          </p>
          <figure>
            <img
              src={objeto.imagen}
              alt={`Imagen de ${objeto.titulo}`}
              className="w-full max-w-xs sm:max-w-sm lg:max-w-md h-auto rounded-lg shadow-sm mx-auto"
            />
            <figcaption className="sr-only">{objeto.titulo}</figcaption>
          </figure>
          {objeto.email && (
            <a
              href={`mailto:${objeto.email}`}
              className="mt-4 w-full px-6 py-2 md:py-3 text-sm md:text-base primary-bg-color text-white font-bold rounded-lg shadow primary-color-hover transition flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">mail</span>
              Contactar por correo
            </a>
          )}
          
          <button
            onClick={handleShare}
            className="mt-2 w-full px-6 py-2 md:py-3 text-sm md:text-base bg-gray-100 border border-gray-300 text-gray-700 font-bold rounded-lg shadow hover:bg-gray-200 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined">share</span>
            {copiado ? "¡Enlace copiado!" : "Compartir publicación"}
          </button>
        </header>

        {/* Descripción + datos extra + pertenencias */}
        <section className="space-y-6 w-full lg:w-2/3">
          <p className="contenedor__texto-primary font-bold baloo text-lg mb-2">
            Descripción
          </p>
          <p className="contenedor__texto-normal text-sm sm:text-base leading-relaxed">
            {objeto.descripcionLarga}
          </p>

          <p className="contenedor__texto-primary font-bold baloo text-lg mb-2">
            Datos Extra
          </p>
          <p className="contenedor__texto-normal text-sm sm:text-base leading-relaxed">
            {objeto.datosExtra}
          </p>

          {objeto.pertenencias && objeto.pertenencias.length > 0 && (
            <>
              <p className="contenedor__texto-primary font-bold baloo text-lg mb-2">
                Pertenencias
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base leading-relaxed contenedor__texto-normal">
                {objeto.pertenencias.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </section>
      </section>
    </article>
  );
}

export default Detail;
