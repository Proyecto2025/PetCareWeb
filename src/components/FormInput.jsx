import { useState } from "react";

function FormInput({ nombre, id, type = "text", value, onChange, error, required = false, placeholder, options, className, maxLength }) {
  const isTextArea = type === "textarea";
  const isSelect = type === "select";
  const isRadio = type === "radio";
  const errorId = `${id}-error`;

  // Manejo de cambios normal
  const handleChange = (e) => {
    let val = e.target.value;
    if (maxLength) val = val.slice(0, maxLength);
    onChange({ target: { id, value: val, type } });
  };

  // Lógica de tags solo si id === "pertenencias"
  const [inputValue, setInputValue] = useState("");
  const tags = Array.isArray(value) ? value : [];

  // 
  const [open, setOpen] = useState(false);

  const addTag = (tag) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange({ target: { id, value: [...tags, trimmed] } });
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
      setInputValue("");
    }
  };

  const removeTag = (tag) => {
    onChange({ target: { id, value: tags.filter((t) => t !== tag) } });
  };

  return (
    <section className={`w-full ${className || ""}`}>
      {nombre && !isRadio && (
        <label htmlFor={id} className="block font-medium text-gray-700 mb-1">
          {nombre} {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input de tags */}
      {id === "pertenencias" ? (
        <section className="flex flex-col w-full">
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
                <button type="button" onClick={() => removeTag(tag)} className="text-white font-bold cursor-pointer">
                  ×
                </button>
              </span>
            ))}
          </section>
        </section>
      ) : (
        <>
          {/* Textarea */}
          {isTextArea && (
            <section className="relative w-full">
              <textarea
                id={id}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                required={required}
                maxLength={maxLength}
                className={`resize-none mt-1 block w-full p-2 pb-7 border-gray-300 border rounded-md shadow-sm focus-primary-color ${className || ""}`}
                aria-invalid={!!error}
                aria-describedby={errorId}
              />
              {maxLength && (
                <span className={`absolute bottom-2 right-3 text-xs select-none ${value.length >= maxLength ? "text-red-500" : "text-gray-400"}`}>
                  {value.length}/{maxLength}
                </span>
              )}
            </section>
          )}

          {/* Input normal */}
          {!isTextArea && !isSelect && !isRadio && (
            <section className="relative w-full">
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
              {maxLength && (
                <span className={`absolute bottom-2 right-3 text-xs select-none ${value.length >= maxLength ? "text-red-500" : "text-gray-400"}`}>
                  {value.length}/{maxLength}
                </span>
              )}
            </section>
          )}

          {/* Select */}
          {isSelect && (
            <section className="relative w-full">
              <section
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm flex justify-between items-center cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                {value || "Selecciona una opción"}
                <span className={`material-symbols-outlined transition-transform duration-100 ${open ? "rotate-90" : "rotate-0"}`}>
                  keyboard_arrow_right
                </span>
              </section>

              {open && (
                <section className="absolute w-full border border-gray-300 rounded bg-white shadow-md z-10">
                  {options.map((opt) => (
                    <section
                      key={opt.value}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
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
              {nombre && (
                <legend className="block font-medium text-gray-700 mb-1">
                  {nombre} {required && <span className="text-red-500 ml-1">*</span>}
                </legend>
              )}
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
        </>
      )}

      {error && <p id={errorId} className="mt-1 text-sm text-red-600">{error}</p>}
    </section>
  );
}

export default FormInput;