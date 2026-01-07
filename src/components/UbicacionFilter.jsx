import { useState, useEffect, useRef } from "react";

// 🔹 Normaliza strings para ignorar tildes y mayúsculas
function normalizeString(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function UbicacionFilter({ apiKey }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState("");

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [municipios, setMunicipios] = useState([]);
  const debounceRef = useRef(null);

  const MIN_LETRAS = 4;

  // 🔹 Buscar provincias usando QUERY + filtrado startsWith + normalización
  const fetchProvinces = async (query) => {
    if (!query) return [];
    try {
      const res = await fetch(
        `https://apiv1.geoapi.es/provincias?QUERY=${encodeURIComponent(
          query
        )}&type=JSON&version=2025.07&key=${apiKey}`
      );
      const data = await res.json();
      if (!data.data) return [];

      const normalizedQuery = normalizeString(query);

      return data.data
        .filter((p) => normalizeString(p.PRO).startsWith(normalizedQuery))
        .map((p) => ({
          label: p.PRO,
          type: "province",
          CPRO: p.CPRO,
          PRO: p.PRO,
        }));
    } catch (err) {
      console.error("Error provincias:", err);
      return [];
    }
  };

  // 🔹 Traer todos los municipios de la provincia
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
    } catch (err) {
      console.error("Error municipios:", err);
      return [];
    }
  };

  // 🔹 Debounce para filtrar provincias o municipios
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      if (search.length < MIN_LETRAS) {
        setFiltered([]);
        return;
      }

      if (!selectedProvince) {
        // filtrar provincias
        const results = await fetchProvinces(search);
        setFiltered(results);
      } else {
        // filtrar municipios localmente
        const term = normalizeString(search);
        const results = municipios.filter((m) =>
          normalizeString(m.municipio).startsWith(term)
        );
        setFiltered(results);
      }
    }, 200);
  }, [search, selectedProvince, municipios]);

  // 🔹 Selección de item
  const handleSelect = async (item) => {
    if (item.type === "province") {
      setSelectedProvince(item);
      setSelected(item.PRO); // valor final si solo provincia
      setSearch(""); // limpiar input para buscar municipios
      setFiltered([]);
      const munis = await fetchMunicipiosProvincia(item.CPRO, item.PRO);
      setMunicipios(munis);
    } else if (item.type === "municipio") {
      setSelected(item.label); // Provincia/Municipio
      setSelectedProvince(null);
      setSearch("");
      setFiltered([]);
      setMunicipios([]);
      setIsOpen(false);
    }
  };

  return (
    <article className="relative w-72">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between border px-3 py-2 rounded bg-white shadow-sm"
      >
        {selected || "Selecciona ubicación"}
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border rounded shadow-lg max-h-64 overflow-auto z-10">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              !selectedProvince
                ? "Escribe provincia..."
                : `Busca municipio de ${selectedProvince.PRO}...`
            }
            className="w-full px-3 py-2 border-b"
          />

          {search.length < MIN_LETRAS ? (
            <div className="px-3 py-2 text-gray-500">
              Escribe al menos {MIN_LETRAS} letras para buscar
            </div>
          ) : filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <div
                key={idx}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(item)}
              >
                {item.label}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-500">
              No se encontraron resultados
            </div>
          )}
        </div>
      )}
    </article>
  );
}

export default UbicacionFilter;
