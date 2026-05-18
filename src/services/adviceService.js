import axios from 'axios';

// Configuramos la URL de Render para que funcione en Vercel
axios.defaults.baseURL = 'https://petcare-api-r9b6.onrender.com';

// Este archivo tiene las funciones para pedir y mandar consejos a la base de datos.

// Esta función sirve para pedir todos los consejos de golpe.
export const getAdvices = async () => {
  try {
    const response = await axios.get("/petCare/advice/all");
    const data = response.data;

    return (data.content || []).map(advice => ({
      id: advice.id,
      titulo: advice.title,
      subtitle: advice.subtitle,
      nombreUsuario: advice.userName,
      categoria: advice.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
      imagen: advice.image,
      descripcionCorta: advice.shortDescription
    }));
  } catch (error) {
    console.error("Error en getAdvices:", error);
    throw new Error(error.response?.data?.message || "No se pudo cargar la lista de consejos.");
  }
};

// Esta función sirve para pedir los detalles de un consejo concreto usando su ID.
export const getAdviceById = async (id) => {
  try {
    const response = await axios.get(`/petCare/advice/detail/${id}`);
    const advice = response.data;

    return {
      id: advice.id,
      userId: advice.userId,
      titulo: advice.title,
      subtitle: advice.subtitle,
      nombreUsuario: advice.userName || `Usuario ${advice.userId}`,
      categoria: advice.adviceCategory ? advice.adviceCategory.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "",
      imagen: advice.image,
      descripcionCorta: advice.shortDescription,
      descripcionLarga: advice.longDescription,
      datosExtra: advice.extraDetails || "No especificado por ahora...",
      pertenencias: advice.belongings || []
    };
  } catch (error) {
    console.error(`Error al obtener el consejo con id ${id}:`, error);
    throw new Error(error.response?.data?.message || "No se pudo obtener el consejo.");
  }
};

// Esta función sirve para crear un consejo nuevo.
// Usamos FormData porque mandamos una imagen y datos en texto a la vez.
export const createAdvice = async (adviceData, imageFile) => {
  try {
    const formData = new FormData();
    const jsonBlob = new Blob([JSON.stringify(adviceData)], { type: 'application/json' });
    formData.append('data', jsonBlob);
    formData.append('image', imageFile);

    const response = await axios.post("/petCare/advice/createAdvice", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error en createAdvice:", error);
    throw new Error(error.response?.data?.message || "No se pudo crear el consejo.");
  }
};

// Esta función sirve para borrar un consejo para siempre.
export const deleteAdvice = async (id) => {
  try {
    const response = await axios.delete(`/petCare/advice/deleteAdvice/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el consejo con id ${id}:`, error);
    throw new Error(error.response?.data?.message || "No se pudo eliminar el consejo.");
  }
};
