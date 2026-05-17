import { useState, useEffect, useRef } from "react";
import { getAdviceById } from "../services/adviceService";

export const useAdvice = (id) => {
  const fetched = useRef(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || fetched.current) return;
    fetched.current = true;

    const fetchAdvice = async () => {
      setLoading(true);
      try {
        const res = await getAdviceById(id);
        setData(res);
      } catch (err) {
        setError(err.message || "Error al cargar el consejo");
      } finally {
        setLoading(false);
      }
    };

    fetchAdvice();
  }, [id]);

  return { data, loading, error };
};
