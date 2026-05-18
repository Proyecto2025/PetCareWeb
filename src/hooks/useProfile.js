import { useState, useEffect, useRef } from "react";
import { getPerfil, getPerfilFiltrado } from "../services/userService";
import { getAdviceById } from "../services/adviceService";
import { getPostById } from "../services/postService";

// Este hook sirve para manejar todo lo que pasa en la pantalla de perfil.
// Pide los datos del usuario y también sus publicaciones filtradas.
export const useProfile = (id) => {
  const fetched = useRef(false); // Para no pedir los datos dos veces seguidas por culpa de React
  const currentRequestType = useRef(null); // Para saber qué pestaña estamos cargando y que no se mezclen si el usuario pulsa rápido
  const [profileData, setProfileData] = useState(null); // Aquí guardamos los datos del usuario (nombre, correo etc)
  const [filteredData, setFilteredData] = useState([]); // Aquí guardamos las publicaciones (adopciones, consejos etc)
  const [loading, setLoading] = useState(true); // Para saber si estamos cargando los datos básicos del perfil
  const [loadingFiltered, setLoadingFiltered] = useState(false); // Para saber si estamos cargando las publicaciones de la pestaña
  const [error, setError] = useState(null); // Para guardar el error por si algo falla

  // Esta función sirve para pedir los datos del perfil
  const fetchProfile = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await getPerfil(id);
      setProfileData(data);
    } catch (err) {
      setError(err.message || "Error al cargar el perfil");
    } finally {
      setLoading(false);
    }
  };

  // Este useEffect sirve para que se pidan los datos del perfil nada más entrar
  useEffect(() => {
    if (!id || fetched.current) return;
    fetched.current = true;

    fetchProfile();
  }, [id]);

  // Esta función sirve para pedir las publicaciones según la pestaña que elijas (Adopción, Extravío etc)
  const loadFilteredData = async (type) => {
    if (!id) return;
    currentRequestType.current = type;
    setLoadingFiltered(true);
    try {
      // Si el usuario ha cambiado de pestaña antes de que termine esta petición, pasamos de ella
      if (currentRequestType.current !== type) return;

      let apiType = type.toUpperCase();
      if (type === "advices") apiType = "advice"; // Porque en la base de datos se llama 'advice' en singular

      const data = await getPerfilFiltrado(id, apiType);

      // Si cambió de pestaña mientras esperábamos la lista, abortamos
      if (currentRequestType.current !== type) return;

      if (apiType === "advice") {
        const list = data.advices || [];
        const detailed = await Promise.all(
          list.map(async (item) => {
            const detail = await getAdviceById(item.id);
            return {
              id: detail.id,
              titulo: detail.titulo,
              subtitle: detail.subtitle,
              tipoAnimal: detail.categoria,
              foto: detail.imagen,
              descripcionCorta: detail.descripcionCorta
            };
          })
        );

        // Si cambió de pestaña mientras esperábamos los detalles, abortamos
        if (currentRequestType.current !== type) return;

        setFilteredData(detailed);
      } else {
        const list = data.posts || [];
        const detailed = await Promise.all(
          list.map(async (item) => {
            const detail = await getPostById(item.id);
            return {
              id: detail.id,
              titulo: detail.titulo,
              subtitle: detail.subtitle,
              tipoAnimal: detail.tipoAnimal,
              foto: detail.imagen,
              descripcionCorta: detail.shortDescription,
              ubicacion: detail.ubicacion,
              municipio: detail.municipio
            };
          })
        );

        // Si cambió de pestaña mientras esperábamos los detalles, abortamos
        if (currentRequestType.current !== type) return;

        setFilteredData(detailed);
      }
    } catch (err) {
      if (currentRequestType.current !== type) return;
      setFilteredData([]);
    } finally {
      if (currentRequestType.current === type) {
        setLoadingFiltered(false);
      }
    }
  };

  return { profileData, filteredData, loading, loadingFiltered, error, loadFilteredData, reloadProfile: fetchProfile };
};
