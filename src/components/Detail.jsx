function Detail({ objeto, onBack, label = "ubicacion" }) { {/*Por defecto simpre mustra la unicación (a no ser que se le pase uno llamado categoria) */}
  if (!objeto) {
    return <p>No existe la página</p>;
  }
  return (
    <article className="max-w-4xl mx-auto p-4 space-y-4">
      <section className="border border-gray-300 p-4 rounded text-left flex flex-col md:flex-row gap-6 items-start">
        {/* Título + Imágen a la izq */}
        <header className="space-y-4">
          <h1 className="contenedor__texto-primary text-2xl font-bold">
            {objeto.titulo}
          </h1>
          <p className="text-black text-lg font-bold baloo tracking-wide leading-tight">
            {objeto[label]}
          </p>
          <figure>
            <img
              src={objeto.imagen}
              alt={`Imagen de ${objeto.titulo}`}
              className="w-64 h-auto rounded"
            />
            <figcaption className="sr-only">{objeto.titulo}</figcaption>
          </figure>
        </header>

        {/* Descripción + datos extra a la der*/}
        <section className="space-y-4">
          <p className="contenedor__texto-primary font-bold baloo">
            Descripción
          </p>
          <p className="contenedor__texto-normal">{objeto.descripcionLarga}</p>

          <p className="contenedor__texto-primary font-bold baloo">
            Datos Extra
          </p>
          <p className="contenedor__texto-normal">{objeto.datosExtra}</p>
        </section>
      </section>

      <section>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-[#0C653D] text-white baloo rounded"
        >
          Volver
        </button>
      </section>
    </article>
  );
}
export default Detail;
