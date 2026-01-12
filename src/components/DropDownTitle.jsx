import { useState, useEffect, useRef } from "react";

function DropdownTitle({ title, options }) {
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
    <article ref={containerRef} className="w-full justify-start">
      <section className="relative inline-block text-left">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="font-bold text-3xl md:text-4xl contenedor__textfont flex items-center contenedor__texto-primary cursor-pointer"
        >
          {title}
          <span
            className={`material-symbols-outlined icon-arrow ml-1 transition-transform duration-200 ${
              isOpen ? "rotate-90" : "rotate-0"
            }`}
          >
            keyboard_arrow_right
          </span>
        </button>

        <section
          className={`w-full absolute mt-2 bg-white border border-gray-300 rounded shadow-lg z-10 transform transition-all duration-300
            ${isOpen ? "opacity-100 translate-y-0 scale-y-100 pointer-events-auto" : "pointer-events-none opacity-0 -translate-y-2 scale-y-95"}
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
      </section>
    </article>
  );
}

export default DropdownTitle;