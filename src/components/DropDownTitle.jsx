import { useState } from "react";

function DropdownTitle({ title, options }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="w-full justify-start mb-6">
      <section className="relative inline-block text-left">
        {/* Título clickable */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="font-bold text-4xl dropdownTitle flex items-center contenedor__texto-primary"
        >
          {title}
          <span className="material-symbols-outlined icon-arrow">
            {isOpen ? "keyboard_arrow_down" : "keyboard_arrow_right"}
          </span>
        </button>

        {/* Opciones desplegables */}
        {isOpen && (
          <section className="w-full absolute mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
            {options.map((opt) => (
              <section
                key={opt.label}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={opt.onClick}
              >
                {opt.label}
              </section>
            ))}
          </section>
        )}
      </section>
    </article>
  );
}

export default DropdownTitle;
