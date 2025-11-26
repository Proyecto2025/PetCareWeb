function GlobalContent({ titulo, children }) {
  return (
    <section
      aria-labelledby={titulo ? "section-title" : undefined}
      className="w-full max-w-7xl"
    >
      {titulo && (
        <h2 id="section-title" className="contenedor__titulo mb-2">
          {titulo}
        </h2>
      )}
      {children}
    </section>
  );
}
export default GlobalContent;