import { useState } from "react";

function DropdownTitle({ title, options }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="w-full justify-start mb-6">
      <section className="relative inline-block text-left">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="font-bold text-4xl contenedor__textfont flex items-center contenedor__texto-primary cursor-pointer"
        >
          {title}
          <span
            className={`material-symbols-outlined icon-arrow-form ml-1 transition-transform duration-200 ${isOpen ? "rotate-90" : "rotate-0"}`}
          >
            keyboard_arrow_right
          </span>
        </button>

        {isOpen && (
          <section className="w-full absolute mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
            {options.map((opt) => (
              <section
                key={opt.label}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  opt.onClick();
                  setIsOpen(false);
                }}
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
