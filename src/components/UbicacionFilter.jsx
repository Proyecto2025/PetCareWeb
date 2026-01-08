import { useState, useEffect, useRef } from "react";

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

function UbicacionFilter({ apiKey }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState("");

  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [municipios, setMunicipios] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef(null);
  const inputRef = useRef(null);

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

  useEffect(() => {
    const fetchAllProvinces = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://apiv1.geoapi.es/provincias?type=JSON&version=2025.07&key=${apiKey}`
        );
        const data = await res.json();
        if (data.data) {
          setProvinces(
            data.data.map((p) => ({
              label: p.PRO,
              type: "province",
              CPRO: p.CPRO,
              PRO: p.PRO,
            }))
          );
        }
      } catch {
        setError("Error al cargar provincias");
      } finally {
        setLoading(false);
      }
    };
    fetchAllProvinces();
  }, [apiKey]);

  const fetchMunicipiosProvincia = async (CPRO, provinceName) => {
    try {
      const res = await fetch(
        `https://apiv1.geoapi.es/municipios?CPRO=${CPRO}&type=JSON&version=2025.07&key=${apiKey}`
      );
      const data = await res.json();
      if (!data.data) return [];
      return data.data.map((m) => ({
        label: `${provinceName}/${m.DMUN50}`,
        type: "municipio",
        province: provinceName,
        municipio: m.DMUN50,
      }));
    } catch {
      setError("Error al cargar municipios");
      return [];
    }
  };

  useEffect(() => {
    setError(null);
    if (!search) {
      setFiltered([]);
      setHighlightedIndex(-1);
      return;
    }
    let results = !selectedProvince
      ? filterItemsProgressive(provinces, search, "PRO")
      : filterItemsProgressive(municipios, search, "municipio");

    setFiltered(results);
    setHighlightedIndex(results.length > 0 ? 0 : -1);
  }, [search, provinces, municipios, selectedProvince]);

  const handleSelect = async (item) => {
    if (item.type === "province") {
      setSelectedProvince(item);
      setSelected(capitalize(item.PRO));
      setSearch("");
      setFiltered([]);
      const munis = await fetchMunicipiosProvincia(item.CPRO, item.PRO);
      setMunicipios(munis);
      setHighlightedIndex(-1);
      inputRef.current?.focus();
    } else {
      const parts = item.label.split("/");
      setSelected(`${capitalize(parts[0])}/${capitalize(parts[1])}`);
      setSelectedProvince(null);
      setSearch("");
      setFiltered([]);
      setMunicipios([]);
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  const resetProvince = () => {
    setSelectedProvince(null);
    setMunicipios([]);
    setSearch("");
    setFiltered([]);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && filtered[highlightedIndex]) handleSelect(filtered[highlightedIndex]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  return (
    <article
      ref={containerRef}
      className="relative inline-block text-right contenedor__textfont"
    >
      {!isOpen ? (
        <span
          className="cursor-pointer text-gray-700 primary-color truncate w-full max-w-xs"
          onClick={() => setIsOpen(true)}
        >
          {selected || "Ubicación"}
        </span>
      ) : (
        <div className="relative inline-block w-full max-w-xs">
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
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 text-right block"
            autoFocus
          />
          {selectedProvince && (
            <button
              onClick={resetProvince}
              className="absolute right-1 top-1 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Cambiar provincia"
            >
              ×
            </button>
          )}
        </div>
      )}

      <section
        className={`absolute z-10 mt-1 right-0 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-56 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}
        `}
        role="listbox"
      >
        {loading ? (
          <p className="px-2 py-1 text-gray-500 text-sm">Cargando...</p>
        ) : error ? (
          <p className="px-2 py-1 text-red-500 text-sm">{error}</p>
        ) : filtered.length > 0 ? (
          <ul>
            {filtered.map((item, idx) => (
              <li
                key={idx}
                role="option"
                aria-selected={highlightedIndex === idx}
                className={`px-2 py-1 text-sm cursor-pointer truncate ${
                  highlightedIndex === idx ? "bg-blue-100" : ""
                } hover:bg-blue-100`}
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
          <p className="px-2 py-1 text-gray-500 text-sm">No se encontraron resultados</p>
        ) : (
          <p className="px-2 py-1 text-gray-500 text-sm">Escribe para buscar</p>
        )}
      </section>
    </article>
  );
}

export default UbicacionFilter;
