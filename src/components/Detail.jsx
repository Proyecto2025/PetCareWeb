function Detail({ objeto, onBack, label = "ubicacion" }) {
  {
    /*Por defecto siempre muestra la ubicación (a no ser que se le pase uno llamado categoria) */
  }

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
          <p className="text-gray-700 text-base sm:text-lg font-semibold baloo tracking-wide leading-tight">
            {objeto[label]}
          </p>
          <figure>
            <img
              src={objeto.imagen}
              alt={`Imagen de ${objeto.titulo}`}
              className="w-full max-w-xs sm:max-w-sm lg:max-w-md h-auto rounded-lg shadow-sm mx-auto"
            />
            <figcaption className="sr-only">{objeto.titulo}</figcaption>
          </figure>
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
