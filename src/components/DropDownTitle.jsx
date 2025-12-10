import { useState } from "react";

function DropdownTitle({ title, options }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {/* Título clickable */}
      <button onClick={() => setIsOpen(!isOpen)} className="font-bold text-lg">
        {title} &gt;
      </button>

      {/* Opciones desplegables */}
      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
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
    </div>
  );
}

export default DropdownTitle;
