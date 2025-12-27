function Card({ nombreUsuario, tipoAnimal, titulo, foto, descripcionCorta, children }) {
  {/* He quitado el tabIndex={0} ya que por ahora ya que la card está dentro de un link
        y me hacia tocar dos veces el tabulador para avanzar
      */}
  return (
    <article
      aria-label={titulo}
      className="flex flex-col justify-between w-full h-full p-6 sm:p-3 rounded-md bg-white shadow-sm sm:shadow-md border border-gray-300 transition-transform duration-200 hover:scale-[1.02]"
    >
      <section>
        <h3 className="text-black baloo tracking-wide leading-tight font-bold">
          {nombreUsuario}
        </h3>
        <p className="contenedor__texto-primary mb-1 font-bold">{tipoAnimal}</p>
      </section>
      <figure className="w-full aspect-square rounded-lg bg-gray-100 overflow-hidden">
        <img
          src={foto}
          alt={`Foto de ${titulo}`}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        {children && <figcaption className="sr-only">{children}</figcaption>}
      </figure>

      <section className="mt-1">
        <h4 className="text-black text-lg font-bold contenedor__textfont tracking-wide leading-tight">
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
