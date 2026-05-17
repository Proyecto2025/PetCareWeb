import { useState, useEffect, useRef } from "react";
import { getPosts } from "../services/postService";

// Este hook sirve para pedir todas las publicaciones (posts) a la base de datos.
export const usePosts = () => {
  const fetched = useRef(false); // Para no pedir los datos dos veces seguidas por culpa de React
  const [posts, setPosts] = useState([]); // Aquí guardamos la lista de publicaciones
  const [loading, setLoading] = useState(true); // Para saber si estamos cargando
  const [error, setError] = useState(null); // Para guardar el error por si algo falla

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError(err.message || "Error al cargar los posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};
