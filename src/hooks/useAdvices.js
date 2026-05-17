import { useState, useEffect, useRef } from "react";
import { getAdvices } from "../services/adviceService";

// Este hook sirve para pedir todos los consejos a la base de datos.
export const useAdvices = () => {
  const fetched = useRef(false); // Para no pedir los datos dos veces seguidas por culpa de React
  const [advices, setAdvices] = useState([]); // Aquí guardamos la lista de consejos
  const [loading, setLoading] = useState(true); // Para saber si estamos cargando
  const [error, setError] = useState(null); // Para guardar el error por si algo falla

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const fetchAdvices = async () => {
      setLoading(true);
      try {
        const data = await getAdvices();
        setAdvices(data);
      } catch (err) {
        setError(err.message || "Error al cargar los consejos");
      } finally {
        setLoading(false);
      }
    };

    fetchAdvices();
  }, []);

  return { advices, loading, error };
};
