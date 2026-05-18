import { useState, useEffect, useRef } from "react";
import { getPostById } from "../services/postService";
import { getPerfil } from "../services/userService";

export const usePost = (id) => {
  const fetched = useRef(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || fetched.current) return;
    fetched.current = true;

    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await getPostById(id);
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
        setError(err.message || "Error al cargar el post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return { data, loading, error };
};
