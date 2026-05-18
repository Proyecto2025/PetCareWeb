import { useState, useEffect, useRef } from "react";

// Funciones auxiliares
function normalizeString(str) {
  return str?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() || "";
}

function filterItemsProgressive(items, term, key = "label") {
  const normalizedTerm = normalizeString(term);
  return items.filter((item) => normalizeString(item[key]).startsWith(normalizedTerm));
}

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Caché global fuera del componente
let cachedProvinces = null;
const cachedMunicipios = {}; // key = CPRO

function UbicacionFilter({ apiKey, onSelect, className = "text-right md:max-w-70", initialValue = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(initialValue);

  useEffect(() => {
    setSelected(initialValue);
  }, [initialValue]);

  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [municipios, setMunicipios] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cargar provincias con caché
  useEffect(() => {
    const fetchAllProvinces = async () => {
      setLoading(true);
      try {
        if (cachedProvinces) {
          setProvinces(cachedProvinces);
        } else {
          const storedProvinces = localStorage.getItem("provinces");
          if (storedProvinces) {
            const provincesData = JSON.parse(storedProvinces);
            cachedProvinces = provincesData;
            setProvinces(provincesData);
          } else {
            const res = await fetch(
              `https://apiv1.geoapi.es/provincias?type=JSON&version=2025.07&key=${apiKey}`
            );
            const data = await res.json();
            if (data.data) {
              const provincesData = data.data.map((p) => ({
                label: p.PRO,
                type: "province",
                CPRO: p.CPRO,
                PRO: p.PRO,
              }));
              cachedProvinces = provincesData;
              localStorage.setItem("provinces", JSON.stringify(provincesData));
              setProvinces(provincesData);
            }
          }
        }
      } catch {
        setError("Error al cargar provincias");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProvinces();
  }, [apiKey]);

  // Función para obtener municipios de una provincia con caché
  const fetchMunicipiosProvincia = async (CPRO, provinceName) => {
    try {
      if (cachedMunicipios[CPRO]) return cachedMunicipios[CPRO];

      const storedMunis = localStorage.getItem(`municipios_${CPRO}`);
      if (storedMunis) {
        const munis = JSON.parse(storedMunis);
        cachedMunicipios[CPRO] = munis;
        return munis;
      }

      const res = await fetch(
        `https://apiv1.geoapi.es/municipios?CPRO=${CPRO}&type=JSON&version=2025.07&key=${apiKey}`
      );
      const data = await res.json();
      if (!data.data) return [];

      const munis = data.data.map((m) => ({
        label: `${provinceName}/${m.DMUN50}`,
        type: "municipio",
        province: provinceName,
        municipio: m.DMUN50,
      }));

      cachedMunicipios[CPRO] = munis;
      localStorage.setItem(`municipios_${CPRO}`, JSON.stringify(munis));
      return munis;
    } catch {
      setError("Error al cargar municipios");
      return [];
    }
  };

  // Actualizar lista filtrada según search
  useEffect(() => {
    setError(null);
    if (!search) {
      setFiltered([]);
      setHighlightedIndex(-1);
      return;
    }

    const results = !selectedProvince
      ? filterItemsProgressive(provinces, search, "PRO")
      : filterItemsProgressive(municipios, search, "municipio");

    setFiltered(results);
    setHighlightedIndex(results.length > 0 ? 0 : -1);
  }, [search, provinces, municipios, selectedProvince]);

  // Seleccionar provincia o municipio
  const handleSelect = async (item) => {
    if (item.type === "province") {
      setSelectedProvince(item);
      const provincia = capitalize(item.PRO);

      setSelected(provincia);
      onSelect?.({ provincia, municipio: null });

      setSearch("");
      setFiltered([]);
      const munis = await fetchMunicipiosProvincia(item.CPRO, item.PRO);
      setMunicipios(munis);
      setHighlightedIndex(-1);
      inputRef.current?.focus();
    } else {
      const parts = item.label.split("/");
      const provincia = capitalize(parts[0]);
      const municipio = capitalize(parts[1]);

      const finalValue = `${provincia}/${municipio}`;

      setSelected(finalValue);
      onSelect?.({ provincia, municipio });

      setSelectedProvince(null);
      setSearch("");
      setFiltered([]);
      setMunicipios([]);
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  // Resetear selección de provincia
  const resetProvince = () => {
    setSelectedProvince(null);
    setMunicipios([]);
    setSearch("");
    setFiltered([]);
    setHighlightedIndex(-1);
    setSelected("");
    onSelect?.({ provincia: null, municipio: null });
    inputRef.current?.focus();
  };

  // Navegación con teclado
  const handleKeyDown = (e) => {
    if (!isOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 0, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && filtered[highlightedIndex])
        handleSelect(filtered[highlightedIndex]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };


  const isLeft = className.includes("text-left");

  return (
    <article
      ref={containerRef}
      className={`relative contenedor__textfont w-full ${className}`}
    >
      {/* Texto inicial */}
      {!isOpen ? (
        <section className={`flex items-center gap-2 w-full ${isLeft ? "justify-start" : "justify-end"}`}>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className={`flex items-center cursor-pointer text-gray-700 primary-color ${isLeft ? "" : "md:justify-end"}`}
          >
            <span className="mr-1 md:text-lg">{selected || "Ubicación"}</span>
            <span className="material-symbols-outlined md:text-xl">location_on</span>
          </button>
          {selected && (
            <button
              type="button"
              onClick={resetProvince}
              className="text-gray-400 hover:text-red-600 focus:outline-none text-2xl leading-none"
              aria-label="Borrar ubicación"
            >
              ×
            </button>
          )}
        </section>
      ) : (
        <section className={`relative w-full ${isLeft ? "text-left" : "text-right"}`}>
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              !selectedProvince
                ? "Busca una provincia..."
                : `Busca el municipio de ${capitalize(selectedProvince.PRO)}...`
            }
            className={`w-full h-10 text-sm md:h-auto px-2 py-1 md:text-base border border-gray-300 rounded-md focus-primary-color block ${isLeft ? "text-left" : "text-right"}`}
            autoFocus
          />
          {selectedProvince && (
            <button
              onClick={resetProvince}
              className={`absolute top-3 md:top-2 text-gray-400 hover:text-red-600 focus:outline-none ${isLeft ? "right-3" : "left-3"}`}
              aria-label="Cambiar provincia"
            >
              ×
            </button>
          )}
        </section>
      )}

      {/* Dropdown animado */}
      <section
        className={`absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden transform origin-top transition-all duration-300 ${isLeft ? "left-0" : "right-0"}
      ${isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"}
    `}
        role="listbox"
      >
        {loading ? (
          <p className={`px-2 py-1 text-gray-500 text-sm ${isLeft ? "text-left" : "text-right"}`}>Cargando...</p>
        ) : error ? (
          <p className={`px-2 py-1 text-red-500 text-sm ${isLeft ? "text-left" : "text-right"}`}>{error}</p>
        ) : filtered.length > 0 ? (
          <ul>
            {filtered.map((item, idx) => (
              <li
                key={idx}
                role="option"
                aria-selected={highlightedIndex === idx}
                className={`px-2 py-1 text-sm md:text-base cursor-pointer truncate ${isLeft ? "text-left" : "text-right"} ${highlightedIndex === idx ? "bg-green-100" : ""
                  } hover:bg-green-100`}
                onMouseEnter={() => setHighlightedIndex(idx)}
                onClick={() => handleSelect(item)}
              >
                {item.type === "province"
                  ? capitalize(item.label)
                  : item.label
                    .split("/")
                    .map((s) => capitalize(s))
                    .join("/")}
              </li>
            ))}
          </ul>
        ) : search ? (
          <p className={`px-2 py-1 text-gray-500 text-sm md:text-base ${isLeft ? "text-left" : "text-right"}`}>No se encontraron resultados</p>
        ) : (
          <p className={`px-2 py-1 text-gray-500 text-sm md:text-base ${isLeft ? "text-left" : "text-right"}`}>Escribe para buscar</p>
        )}
      </section>
    </article>

  );
}

export default UbicacionFilter;