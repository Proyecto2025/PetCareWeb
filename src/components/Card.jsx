function Card({ nombreUsuario, tipoAnimal, titulo, foto, descripcionCorta, ubicacion, municipio, children }) {
  {/* He quitado el tabIndex={0} ya que por ahora ya que la card está dentro de un link
        y me hacia tocar dos veces el tabulador para avanzar
      */}
  return (
    <article
      aria-label={titulo}
      className="flex flex-col justify-between w-full h-full p-6 sm:p-3 rounded-md bg-white shadow-sm sm:shadow-md border border-gray-300 transition-transform duration-200 hover:scale-[1.02]"
    >
      <section>
        <h3 className="text-black tracking-wide leading-tight font-bold">
          {nombreUsuario}
        </h3>
        <section className="md:flex items-center justify-between w-full mb-1">
          <p className="contenedor__texto-primary font-bold">{tipoAnimal}</p>
          {ubicacion && (
            <section className="flex items-center">
              <p className="contenedor__texto-primary font-bold text-sm lg:text-base">{ubicacion}</p>
              <p className="mr-1 ml-1 primary-color">/</p>
              <p className="contenedor__texto-primary font-bold text-sm lg:text-base">{municipio}</p>
              <span className="material-symbols-outlined primary-color">location_on</span>
            </section>
          )}
        </section>
      </section>
      <figure className="w-full aspect-square rounded-lg bg-gray-100 overflow-hidden max-h-60 sm:max-h-full">
        <img
          src={foto}
          alt={`Foto de ${titulo}`}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        {children && <figcaption className="sr-only">{children}</figcaption>}
      </figure>

      <section className="mt-1">
        <h4 className="text-black text-lg font-medium contenedor__textfont tracking-wide leading-tight">
          <strong>{titulo}</strong>
        </h4>
        {descripcionCorta && (
          <p className="contenedor__texto-normal font-bold mt-1">{descripcionCorta}</p>
        )}
      </section>
    </article>
  );
}
export default Card;