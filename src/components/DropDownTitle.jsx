import { useState } from "react";

function DropdownTitle({ title, options }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="w-full justify-start mb-6">
      <section className="relative inline-block text-left">
        {/* Título clickable */}
        <button onClick={() => setIsOpen(!isOpen)} className="font-bold text-4xl dropdownTitle">
          {title}
          <span className="ml-2 transition-200ms">
            {isOpen ? "v" : ">"}
          </span>
        </button>

        {/* Opciones desplegables */}
        {isOpen && (
          <div className="w-full absolute mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
            {options.map((opt) => (
              <div
                key={opt.label}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={opt.onClick} // acción al hacer click
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </section>
    </article>
  );
}

export default DropdownTitle;
