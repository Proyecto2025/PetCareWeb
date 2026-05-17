import { useState, useEffect, useRef } from "react";
import { getPerfil, getPerfilFiltrado } from "../services/userService";

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
    setFilteredData([]); // Vaciamos lo que había antes para que se vea limpio
    setLoadingFiltered(true);
    try {
      let apiType = type.toUpperCase();
      if (type === "advices") apiType = "advice"; // Porque en la base de datos se llama 'advice' en singular
      
      const data = await getPerfilFiltrado(id, apiType);
      
      // Si el usuario ha cambiado de pestaña antes de que termine esta petición, pasamos de ella
      if (currentRequestType.current !== type) return;
      
      if (apiType === "advice") {
        setFilteredData(data.advices || []);
      } else {
        setFilteredData(data.posts || []);
      }
    } catch (err) {
      console.error("Error al cargar datos filtrados:", err);
      setFilteredData([]);
    } finally {
      setLoadingFiltered(false);
    }
  };

  return { profileData, filteredData, loading, loadingFiltered, error, loadFilteredData, reloadProfile: fetchProfile };
};
