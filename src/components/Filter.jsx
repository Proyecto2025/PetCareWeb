import { useState, useRef, useEffect } from "react";

function Filter({ title, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <article ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center font-bold text-lg md:text-xl contenedor__textfont primary-color cursor-pointer"
      >
        {title}
        <span className="material-symbols-outlined ml-1 md:text-xl">
          filter_list
        </span>
      </button>

      <section
        className={`absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10 min-w-max transform transition-all duration-300
          ${isOpen ? "opacity-100 translate-y-0 scale-y-100" : "opacity-0 -translate-y-2 scale-y-95"}
        `}
      >
        {options.map((opt, index) => (
          <section
            key={opt.label}
            className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
              index < options.length - 1 ? "border-b border-gray-200" : ""
            }`}
            onClick={() => {
              opt.onClick();
              setIsOpen(false);
            }}
          >
            {opt.label}
          </section>
        ))}
      </section>
    </article>
  );
}

export default Filter;