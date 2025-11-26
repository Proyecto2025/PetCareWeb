function Card({ nombreUsuario, tipoAnimal, titulo, foto, descripcionCorta, children }) {
  {/* He quitado el tabIndex={0} ya que por ahora ya que la card está dentro de un link
        y me hacia tocar dos veces el tabulador para avanzar
      */}
  return (
    <article
      aria-label={titulo}
      className="flex flex-col justify-between w-full h-full p-6 sm:p-3 rounded-md bg-white shadow-sm sm:shadow-md border border-black"
    >
      <section className="mt-3">
        <h3 className="text-black baloo tracking-wide leading-tight">
          <strong>{nombreUsuario}</strong>
        </h3>
        <p className="contenedor__texto-primary">{tipoAnimal}</p>
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

      <section className="mt-3">
        <h4 className="text-black text-lg font-bold baloo tracking-wide leading-tight">
          <strong>{titulo}</strong>
        </h4>
        {descripcionCorta && (
          <p className="contenedor__texto-normal font-bold">{descripcionCorta}</p>
        )}
      </section>
    </article>
  );
}
export default Card;
