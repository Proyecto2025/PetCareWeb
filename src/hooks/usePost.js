import { useState, useEffect, useRef } from "react";
import { getPostById } from "../services/postService";

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
        setData(res);
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
