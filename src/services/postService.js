import axios from 'axios';

// Este archivo tiene las funciones para pedir y mandar publicaciones de mascotas a la base de datos.

// Esta función sirve para pedir todas las publicaciones de golpe.
export const getPosts = async () => {
  try {
    const response = await axios.get("/petCare/post/all");
    const data = response.data;
    
    return (data.content || []).map(post => ({
      id: post.id,
      titulo: post.title,
      subtitulo: post.subtitle,
      nombreUsuario: post.userName,
      ubicacion: post.location,
      municipio: post.municipality,
      descripcionCorta: post.shortDescription,
      imagen: post.image,
      tipoAnimal: post.typeAnimal.toLowerCase(),
      categoria: post.categoryPost.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    }));
  } catch (error) {
    console.error("Error en getPosts:", error);
    throw new Error(error.response?.data?.message || "No se pudo cargar la lista de posts.");
  }
};

// Esta función sirve para pedir los detalles de una publicación concreta usando su ID.
export const getPostById = async (id) => {
  try {
    const response = await axios.get(`/petCare/post/detail/${id}`);
    const post = response.data;
    
    return {
      id: post.id,
      titulo: post.title,
      subtitulo: post.subtitle,
      nombreUsuario: post.userName || `Usuario ${post.userId}`,
      ubicacion: post.location,
      municipio: post.municipality,
      descripcionLarga: post.longDescription,
      datosExtra: post.extraDetails || "No especificado por ahora...",
      pertenencias: post.belongings || [],
      imagen: post.image
    };
  } catch (error) {
    console.error(`Error al obtener el post con id ${id}:`, error);
    throw new Error(error.response?.data?.message || "No se pudo obtener el post.");
  }
};

// Esta función sirve para crear una publicación normal (como Ayuda o Extravío).
// Usamos FormData porque hay que mandar una imagen y datos en texto a la vez.
export const createPost = async (postData, imageFile) => {
  try {
    const formData = new FormData();
    const jsonBlob = new Blob([JSON.stringify(postData)], { type: 'application/json' });
    formData.append('data', jsonBlob);
    formData.append('image', imageFile);

    const response = await axios.post("/petCare/post/create", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error en createPost:", error);
    throw new Error(error.response?.data?.message || "No se pudo crear el post.");
  }
};

// Esta función sirve para crear una publicación de adopción.
// Es casi igual que la anterior pero apunta a otra ruta diferente de la API.
export const createAdoptionPost = async (postData, imageFile) => {
  try {
    const formData = new FormData();
    const jsonBlob = new Blob([JSON.stringify(postData)], { type: 'application/json' });
    formData.append('data', jsonBlob);
    formData.append('image', imageFile);

    const response = await axios.post("/petCare/post/create/adoption", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error en createAdoptionPost:", error);
    throw new Error(error.response?.data?.message || "No se pudo crear el post de adopción.");
  }
};

// Esta función sirve para borrar una publicación para siempre.
export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`/petCare/post/deletePost/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el post con id ${id}:`, error);
    throw new Error(error.response?.data?.message || "No se pudo eliminar el post.");
  }
};
