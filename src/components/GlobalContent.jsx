function GlobalContent({ titulo, children }) {
  return (
    <section
      aria-labelledby={titulo ? "section-title" : undefined}
      className="w-full max-w-7xl"
    >
      {titulo && (
        <h2 id="section-title" className="text-2xl text-green-700 font-semibold mb-6">
          {titulo} 
        </h2>
      )}
      {children}
    </section>
  );
}
export default GlobalContent;