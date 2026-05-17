import axios from 'axios';

// Configuramos la URL de Render para que funcione en Vercel
axios.defaults.baseURL = 'https://petcare-api-r9b6.onrender.com';

// Esta función sirve para iniciar sesión, le mandamos el usuario y la contraseña.
export const login = async (username, password) => {
  try {
    const response = await axios.post("/petCare/user/login", { userName: username, password });
    return response.data;
  } catch (error) {
    console.error("Error en login:", error);
    // Si la API nos da un mensaje de error lo usamos, porque si no ponemos uno genérico nosotros
    throw new Error(error.response?.data?.message || "Error al iniciar sesión, Usuario o contraseña incorrecta.");
  }
};

// Esta función sirve para crear un usuario nuevo en la base de datos.
export const register = async (userData) => {
  try {
    const response = await axios.post("/petCare/user/createUser", userData);
    return response.data;
  } catch (error) {
    console.error("Error en register:", error);
    // Usamos el mensaje de la API porque suele ser más específico (por ejemplo, si el correo ya existe).
    throw new Error(error.response?.data?.message || "El usuario, correo o teléfono ya están en uso.");
  }
};

// Esta función sirve para pedir los datos del perfil de un usuario a la base de datos.
export const getPerfil = async (id) => {
  try {
    const response = await axios.get(`/petCare/user/getPerfil/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el perfil con id ${id}:`, error);
    throw new Error(error.response?.data?.message || "No se pudo obtener el perfil.");
  }
};

// Esta función sirve para pedir las publicaciones de un usuario filtradas por tipo (Adopción, Extravío, Ayuda).
export const getPerfilFiltrado = async (id, type) => {
  try {
    const response = await axios.get(`/petCare/user/getPerfilFiltrado/${id}`, { params: { type } });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el perfil filtrado con id ${id}:`, error);
    throw new Error(error.response?.data?.message || "No se pudo obtener los datos filtrados.");
  }
};

// Esta función sirve para guardar los cambios que el usuario haga en su perfil.
export const editUser = async (id, userData) => {
  try {
    const response = await axios.patch(`/petCare/user/editUser/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error en editUser:", error);
    throw new Error(error.response?.data?.message || "Error al actualizar el perfil.");
  }
};

// Esta función sirve para borrar la cuenta del usuario para siempre.
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`/petCare/user/deleteUser/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error en deleteUser:", error);
    throw new Error(error.response?.data?.message || "Error al eliminar la cuenta.");
  }
};
