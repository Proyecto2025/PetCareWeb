import { useState, useEffect, useRef } from "react";
import { getAdviceById } from "../services/adviceService";
import { getPerfil } from "../services/userService";

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
        let email = "";
        if (res.userId) {
          try {
            const perfil = await getPerfil(res.userId);
            email = perfil.email;
          } catch (profileErr) {
            console.error("Error al cargar el perfil:", profileErr);
          }
        }
        setData({ ...res, email });
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
