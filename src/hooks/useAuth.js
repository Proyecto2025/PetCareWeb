import { useState } from "react";
import { login, register } from "../services/userService";

// Este hook maneja el tema de entrar y registrarse
// Guarda las cosas en el localStorage para que la web sepa que estás dentro.
export const useAuth = () => {
  const [loading, setLoading] = useState(false); // Para saber si está cargando
  const [error, setError] = useState(null); // Para guardar el error si la API se queja

  const loginUser = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login(username, password);
      // Guardamos la sesión en el navegador
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", username);
      localStorage.setItem("userId", data.id);
      
      // Lanzamos este evento para que el Nav se entere de que hemos entrado
      window.dispatchEvent(new Event("authChange"));
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await register(userData);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Esta función la usamos para quitar el error en cuanto el usuario escribe
  const clearError = () => setError(null);

  return { loginUser, registerUser, loading, error, clearError };
};
