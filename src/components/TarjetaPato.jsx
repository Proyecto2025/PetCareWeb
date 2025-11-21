/**
 * TarjetaPato: Componente que representa una tarjeta individual de pato
 *
 */
function TarjetaPato({
  nombre,
  foto,
  descripcion,
  //categoria,
  precio,
  children,
}) {
  return (
    <>
      {/* Navegacion con tabulador (tabIndex) y por si el user hace mucho zoom, para que se adapte (className:...)*/}
      <article
        tabIndex="0"
        aria-label={`${nombre}`}
        className="flex flex-col justify-between w-full h-full p-3 rounded-md bg-white shadow-xl"
      >
        <figure className="w-full aspect-square rounded-lg bg-gray-100 overflow-hidden">
          <img
            src={foto}
            alt={`Foto de ${nombre}`}
            loading="lazy"
            className="w-full h-auto object-cover"
          />
          {/* Texto alternativo para lectores de pantalla */}
          <figcaption className="sr-only">{children}</figcaption>
        </figure>

        <section>
          {/* Bloque informativo del pato */}
          <h3 className="text-black text-lg font-bold baloo tracking-wide leading-tight whitespace-nowrap">
            <strong>{nombre}</strong>
          </h3>
          <p className="contenedor__texto-normal">{descripcion}</p>
          {/*<p className="contenedor__texto-normal">{categoria}</p>*/}
          <p className="contenedor__precio">{precio}</p>
        </section>
      </article>
    </>
  );
}

export default TarjetaPato;
