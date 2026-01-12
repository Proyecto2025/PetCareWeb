import { useState, useEffect, useRef } from "react";

function FormInput({ nombre, id, type = "text", value, onChange, error, required = false, placeholder, options, className, maxLength }) {

  // Tipos de input
  const isTextArea = type === "textarea";
  const isSelect = type === "select";
  const isRadio = type === "radio";
  const isTagInput = id === "pertenencias";
  const errorId = `${id}-error`;

  // Estado para manejar el dropdown del select
  const containerRef = useRef(null);
  const [open, setOpen] = useState(false);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Estado para el input de tags
  const [inputValue, setInputValue] = useState("");
  const tags = Array.isArray(value) ? value : [];

  // Manejo de cambio de valor
  const handleChange = (e) => {
    let val = e.target.value;
    if ((type === "text" || type === "textarea") && maxLength) val = val.slice(0, maxLength);
    onChange({ target: { id, value: val, type } });
  };

  // Función para agregar tag
  const addTag = (tag) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange({ target: { id, value: [...tags, trimmed] } });
    }
  };

  // Manejo de teclas para agregar tag
  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
      setInputValue("");
    }
  };

  // Función para eliminar tag
  const removeTag = (tag) => {
    onChange({ target: { id, value: tags.filter((t) => t !== tag) } });
  };

  // Función para renderizar label
  const renderLabel = () => (
    nombre && !isRadio && !isSelect && !isTagInput && (
      <label htmlFor={id} className="block font-medium text-gray-700 mb-1">
        {nombre} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    )
  );

  // Contador de caracteres (solo si maxLength existe)
  const renderCharCount = () => maxLength && (
    <p
      className={`absolute bottom-1 right-2 text-xs ${value?.length >= maxLength ? "text-red-600" : "text-gray-400"
        }`}
    >
      {value?.length || 0}/{maxLength}
    </p>
  );

  return (
    <section className={`w-full ${className || ""}`}>
      {/* Label normal */}
      {renderLabel()}

      {/* Tags */}
      {isTagInput && (
        <section className="flex flex-col w-full">
          {nombre && (
            <p className="block font-medium text-gray-700 mb-1">
              {nombre} {required && <span className="text-red-500 ml-1">*</span>}
            </p>
          )}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder={placeholder}
            className="w-full p-2 border border-gray-300 rounded focus-primary-color"
          />
          <section className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 bg-emerald-700 text-white px-2 py-1 rounded-full text-sm">
                {tag}
                <button type="button" onClick={() => removeTag(tag)} className="text-white font-bold cursor-pointer">×</button>
              </span>
            ))}
          </section>
        </section>
      )}

      {/* Input / Textarea con contador */}
      {!isSelect && !isRadio && !isTagInput && (
        <section className="relative w-full">
          {isTextArea ? (
            <textarea
              id={id}
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              required={required}
              maxLength={maxLength}
              className={`resize-none mt-1 block w-full p-2 pb-7 border-gray-300 border rounded-md shadow-sm focus-primary-color h-60 ${className || ""}`}
              aria-invalid={!!error}
              aria-describedby={errorId}
            />
          ) : (
            <input
              id={id}
              type={type}
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              required={required}
              maxLength={maxLength}
              className={`mt-1 block w-full p-2 pb-7 border-gray-300 border rounded-md shadow-sm focus-primary-color ${className || ""}`}
              aria-invalid={!!error}
              aria-describedby={errorId}
            />
          )}
          {renderCharCount()}
        </section>
      )}

      {/* Select */}
      {isSelect && (
        <section className={`relative ${className || ""}`} ref={containerRef}>
          {nombre && (
            <label id={`${id}-label`} className="block font-medium text-gray-700 mb-1">
              {nombre} {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}

          {/* Input simulado */}
          <section
            className="p-2 border border-gray-300 rounded-md shadow-sm flex justify-between items-center cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-labelledby={`${id}-label`}
          >
            {value || "Selecciona una opción"}
            <span
              className={`material-symbols-outlined transition-transform duration-100 ${open ? "-rotate-90" : "rotate-0"}`}
            >
              keyboard_arrow_down
            </span>
          </section>

          {/* Dropdown */}
          {open && (
            <section className="absolute top-full left-0 border border-gray-300 rounded bg-white shadow-md z-10 min-w-full">
              {options.map((opt, index) => (
                <section
                  key={opt.value}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${index < options.length - 1 ? "border-b border-gray-200" : ""}`}
                  onClick={() => {
                    onChange({ target: { id, value: opt.value } });
                    setOpen(false);
                  }}
                >
                  {opt.label}
                </section>
              ))}
            </section>
          )}
        </section>
      )}

      {/* Radios */}
      {isRadio && (
        <fieldset className="flex flex-col gap-2" aria-describedby={errorId}>
          {nombre && <legend className="block font-medium text-gray-700 mb-1">{nombre} {required && <span className="text-red-500 ml-1">*</span>}</legend>}
          {options?.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={id}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => onChange({ target: { id, value: opt.value } })}
                required={required}
                className="w-4 h-4 border-gray-300"
              />
              <span className="text-gray-700">{opt.label}</span>
            </label>
          ))}
        </fieldset>
      )}

      {error && <p id={errorId} className="mt-1 text-sm text-red-600">{error}</p>}
    </section>
  );
}

export default FormInput;