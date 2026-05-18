import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card.jsx";
import FormInput from "../components/FormInput.jsx";
import Modal from "../components/Modal.jsx";
import { useProfile } from "../hooks/useProfile";
import { editUser, deleteUser } from "../services/userService";
import { deletePost } from "../services/postService";
import { deleteAdvice } from "../services/adviceService";

function Profile() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const { profileData, filteredData, loading, loadingFiltered, loadFilteredData, reloadProfile } = useProfile(userId);

  const [content, setContent] = useState("adopcion");
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [editData, setEditData] = useState({
    nombreCompleto: "",
    nombreUsuario: "",
    numTelefono: "",
    correo: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (profileData) {
      setEditData({
        nombreCompleto: profileData.fullName || "",
        nombreUsuario: profileData.userName || "",
        numTelefono: profileData.phoneNumber || "",
        correo: profileData.email || "",
        password: "",
        confirmPassword: ""
      });
    }
  }, [profileData]);

  useEffect(() => {
    if (userId) {
      loadFilteredData(content);
    }
  }, [content, userId]);

  const hasChanges = useMemo(() => {
    if (!profileData) return false;

    const isSameName = editData.nombreCompleto === (profileData.fullName || "");
    const isSameUser = editData.nombreUsuario === (profileData.userName || "");
    const isSamePhone = editData.numTelefono === (profileData.phoneNumber || "");
    const isSameEmail = editData.correo === (profileData.email || "");
    const hasPassword = editData.password !== "" || editData.confirmPassword !== "";

    return !isSameName || !isSameUser || !isSamePhone || !isSameEmail || hasPassword;
  }, [editData, profileData]);

  const hasInvalidData = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{9,10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;

    const isNameInvalid = !editData.nombreCompleto?.trim() || editData.nombreCompleto.trim().length < 5;
    const isEmailInvalid = !editData.correo?.trim() || !emailRegex.test(editData.correo);
    const isPhoneInvalid = !editData.numTelefono?.trim() || !phoneRegex.test(editData.numTelefono);
    const isPasswordInvalid = editData.password && !passwordRegex.test(editData.password);
    const isConfirmInvalid = editData.password !== editData.confirmPassword;

    return isNameInvalid || isEmailInvalid || isPhoneInvalid || isPasswordInvalid || isConfirmInvalid;
  }, [editData]);

  const postsCount = profileData?.numberOfPosts || 0;
  const advicesCount = profileData?.numberOfAdvices || 0;

  const handleEditChange = (e) => {
    const { id, value } = e.target;
    setEditData(prev => ({ ...prev, [id]: value }));
    setErrors(prev => ({ ...prev, [id]: "" }));
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    let errorMsg = "";

    if (id === "nombreCompleto") {
      if (value.trim().length < 5) {
        errorMsg = "El nombre debe tener al menos 5 caracteres";
      }
    } else if (id === "correo") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        errorMsg = "Introduce un correo válido";
      }
    } else if (id === "numTelefono") {
      const phoneRegex = /^\d{9,10}$/;
      if (value && !phoneRegex.test(value)) {
        errorMsg = "Introduce un teléfono válido (9 o 10 dígitos)";
      }
    } else if (id === "password") {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
      if (value && !passwordRegex.test(value)) {
        errorMsg = "Mínimo 6 caracteres, una mayúscula, una minúscula y un carácter especial";
      }
    } else if (id === "confirmPassword") {
      if (value !== editData.password) {
        errorMsg = "Las contraseñas no coinciden";
      }
    }

    setErrors((prev) => ({ ...prev, [id]: errorMsg }));
  };

  const handleConfirmSave = async () => {
    // Validar campos obligatorios
    if (!editData.nombreCompleto || !editData.nombreUsuario || !editData.numTelefono || !editData.correo) {
      alert("Por favor, rellena todos los campos obligatorios.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{9,10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;

    if (editData.nombreCompleto.trim().length < 5) {
      alert("El nombre debe tener al menos 5 caracteres");
      return;
    }
    if (!emailRegex.test(editData.correo)) {
      alert("Introduce un correo válido");
      return;
    }
    if (!phoneRegex.test(editData.numTelefono)) {
      alert("Introduce un teléfono válido (9 o 10 dígitos)");
      return;
    }
    if (editData.password && !passwordRegex.test(editData.password)) {
      alert("La contraseña no cumple con los requisitos de seguridad");
      return;
    }

    setIsSaving(true);
    try {
      if (editData.password || editData.confirmPassword) {
        if (editData.password !== editData.confirmPassword) {
          alert("Las contraseñas no coinciden");
          return;
        }
      }

      await editUser(userId, {
        fullName: editData.nombreCompleto,
        userName: editData.nombreUsuario,
        phoneNumber: editData.numTelefono,
        email: editData.correo,
        password: editData.password || undefined,
        confirmPassword: editData.confirmPassword || undefined
      });

      setIsEditing(false);
      reloadProfile();
    } catch (err) {
      alert(err.message || "Error al actualizar el perfil");
    } finally {
      setIsSaving(false);
      setIsSaveModalOpen(false);
    }
  };

  const handleConfirmDeleteAccount = async () => {
    setIsDeletingAccount(true);
    try {
      await deleteUser(userId);

      // Limpiar toda la sesión
      localStorage.removeItem("userId");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userName");

      // Notificar a los componentes (como Nav) que el estado de auth ha cambiado
      window.dispatchEvent(new Event("authChange"));

      navigate("/");
    } catch (err) {
      alert(err.message || "Error al eliminar la cuenta");
    } finally {
      setIsDeletingAccount(false);
      setIsDeleteAccountModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (profileData) {
      setEditData({
        nombreCompleto: profileData.fullName || "",
        nombreUsuario: profileData.userName || "",
        numTelefono: profileData.phoneNumber || "",
        correo: profileData.email || "",
        password: "",
        confirmPassword: ""
      });
    }
  };

  const handleDeleteClick = (id, type) => {
    setItemToDelete({ id, type });
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      if (itemToDelete.type === "advices") {
        await deleteAdvice(itemToDelete.id);
      } else {
        await deletePost(itemToDelete.id);
      }
      loadFilteredData(itemToDelete.type);
      reloadProfile();

      // Mostrar mensaje de éxito
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      alert(err.message || "Error al eliminar la publicación");
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
      setItemToDelete(null);
    }
  };

  const emptyMessages = {
    adopcion: "Sin publicaciones de Adopción ;(",
    extravio: "Sin publicaciones de Extravío ;(",
    ayuda: "Sin publicaciones de Ayuda ;(",
    advices: "Sin consejos publicados ;(",
  };

  if (loading) {
    return (
      <section className="flex flex-row items-center justify-center text-gray-500 text-xl mt-10 gap-3">
        <span className="material-symbols-outlined animate-spin text-2xl">progress_activity</span>
        <p>Cargando perfil...</p>
      </section>
    );
  }

  return (
    <section className="w-full relative">
      {/* Mensaje de éxito */}
      <section className={`success-message z-40 ${showSuccess ? "show" : ""}`}>
        Finalizado <span className="material-symbols-outlined">check_circle</span>
      </section>

      {/* Encabezado del Perfil / Formulario de Edición */}
      <section className="text-font justify-between block md:flex items-center gap-6 mb-10">
        {!isEditing ? (
          <>
            <section>
              <h1 className="text-3xl font-bold mb-2">{editData.nombreUsuario}</h1>
              <section className="flex gap-20 text-lg font-semibold">
                <section className="block">
                  <p>{postsCount}</p>
                  <p>Posts</p>
                </section>
                <section>
                  <p>{advicesCount}</p>
                  <p>Consejos</p>
                </section>
              </section>
            </section>

            <section
              onClick={() => setIsEditing(true)}
              className="flex w-full md:w-[30%] text-2xl mt-5 w-[40%] lg:w-[20%] justify-center md:mt-0 items-center gap-4 md:gap-2 text-white primary-bg-color primary-color-hover transition-all ease-in-out shadow-lg p-2 rounded-md cursor-pointer"
            >
              <p>Editar datos</p>
              <span className="material-symbols-outlined">draft_orders</span>
            </section>
          </>
        ) : (
          <section className="w-full bg-white p-8 rounded-md border border-gray-200 shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 primary-color contenedor__textfont">Editar Perfil</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                nombre="Nombre completo"
                id="nombreCompleto"
                value={editData.nombreCompleto}
                onChange={handleEditChange}
                onBlur={handleBlur}
                error={errors.nombreCompleto}
                placeholder="Nuevo nombre completo..."
                required
              />
              <FormInput
                nombre="Nombre de usuario"
                id="nombreUsuario"
                value={editData.nombreUsuario}
                onChange={handleEditChange}
                placeholder="Nuevo usuario..."
                required
              />
              <FormInput
                nombre="Número de teléfono"
                id="numTelefono"
                type="tel"
                value={editData.numTelefono}
                onChange={handleEditChange}
                onBlur={handleBlur}
                error={errors.numTelefono}
                placeholder="Nuevo teléfono..."
                required
              />
              <FormInput
                nombre="Correo electrónico"
                id="correo"
                type="email"
                value={editData.correo}
                onChange={handleEditChange}
                onBlur={handleBlur}
                error={errors.correo}
                placeholder="Nuevo correo..."
                required
              />

              <FormInput
                nombre="Nueva contraseña"
                id="password"
                type="password"
                value={editData.password}
                onChange={handleEditChange}
                onBlur={handleBlur}
                error={errors.password}
                placeholder="Dejar en blanco para no cambiar"
              />
              <FormInput
                nombre="Confirmar contraseña"
                id="confirmPassword"
                type="password"
                value={editData.confirmPassword}
                onChange={handleEditChange}
                onBlur={handleBlur}
                error={errors.confirmPassword}
                placeholder="Repite la nueva contraseña"
              />

              <section className="md:col-span-2 flex gap-4 mt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 py-4 bg-gray-500 text-white text-xl contenedor__textfont rounded-md shadow-lg hover:bg-gray-600 transition-all duration-300 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => setIsSaveModalOpen(true)}
                  disabled={isSaving || !hasChanges || hasInvalidData}
                  className={`flex-1 py-4 text-white text-xl contenedor__textfont rounded-md shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${isSaving || !hasChanges || hasInvalidData
                    ? "bg-gray-400"
                    : "primary-bg-color primary-color-hover cursor-pointer"
                    }`}
                >
                  {isSaving && (
                    <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                  )}
                  {isSaving ? "Guardando..." : "Guardar cambios"}
                </button>
              </section>
            </form>

            {/* Zona de peligro separada (Eliminar cuenta) */}
            <section className="mt-8 pt-4 border-t border-gray-100 flex justify-center">
              <button
                type="button"
                onClick={() => setIsDeleteAccountModalOpen(true)}
                className="text-red-500 hover:text-red-700 font-medium cursor-pointer transition-colors flex items-center gap-1 text-sm"
              >
                <span className="material-symbols-outlined text-lg">delete</span>
                Eliminar mi cuenta
              </button>
            </section>
          </section>
        )}
      </section>

      {/* Solo mostramos la lista de posts si NO estamos editando */}
      {!isEditing && (
        <>
          <section className="flex justify-center gap-10 md:gap-20 mb-10">
            <button onClick={() => setContent("adopcion")}
              className={`material-symbols-outlined profile-post-icon profile-post-icon-hover
          ${content === "adopcion" ? "text-primary active" : ""}`}
            >
              pets
            </button>
            <button onClick={() => setContent("extravio")}
              className={`material-symbols-outlined profile-post-icon profile-post-icon-hover 
          ${content === "extravio" ? "text-primary active" : ""}`}
            >
              search
            </button>
            <button onClick={() => setContent("ayuda")}
              className={`material-symbols-outlined profile-post-icon profile-post-icon-hover 
          ${content === "ayuda" ? "text-primary active" : ""}`}
            >
              volunteer_activism
            </button>
            <button onClick={() => setContent("advices")}
              className={`material-symbols-outlined profile-post-icon profile-post-icon-hover 
          ${content === "advices" ? "text-primary active" : ""}`}
            >
              tooltip_2
            </button>
          </section>

          <section className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
            {loadingFiltered ? (
              <section className="col-span-full flex flex-row items-center justify-center text-gray-500 text-xl mt-10 gap-3">
                <span className="material-symbols-outlined animate-spin text-2xl">progress_activity</span>
                <p>Cargando publicaciones...</p>
              </section>
            ) : filteredData.length === 0 ? (
              <p className="col-span-full mt-10 text-center text-gray-400 text-lg">
                {emptyMessages[content]}
              </p>
            ) : (
              filteredData.map((item) => (
                <section key={item.id} className="relative">
                  <Link
                    to={content === "advices" ? `/consejo/${item.id}` : `/animal/${item.id}`}
                    aria-label={`Ver detalles de ${item.title || item.titulo}`}
                    className="w-full h-full"
                  >
                    <Card
                      nombreUsuario={profileData?.userName}
                      tipoAnimal={item.tipoAnimal}
                      titulo={item.titulo}
                      foto={item.foto}
                      descripcionCorta={item.descripcionCorta}
                      ubicacion={item.ubicacion}
                      municipio={item.municipio}
                      subtitle={item.subtitle}
                      onDelete={() => handleDeleteClick(item.id, content)}
                    />
                  </Link>
                </section>
              ))
            )}
          </section>
          <Modal
            isOpen={isModalOpen}
            title="¿Eliminar publicación?"
            message="¿Estás seguro de que quieres eliminar esta publicación? Esta acción no se puede deshacer."
            confirmText="Sí, eliminar"
            cancelText="Cancelar"
            isDestructive={true}
            isLoading={isDeleting}
            onConfirm={handleConfirmDelete}
            onCancel={() => setIsModalOpen(false)}
          />
        </>
      )}
      <Modal
        isOpen={isSaveModalOpen}
        title="¿Guardar cambios?"
        message="¿Estás seguro de que quieres actualizar tus datos de perfil?"
        confirmText="Sí, guardar"
        cancelText="Cancelar"
        isDestructive={false}
        isLoading={isSaving}
        onConfirm={handleConfirmSave}
        onCancel={() => setIsSaveModalOpen(false)}
      />
      <Modal
        isOpen={isDeleteAccountModalOpen}
        title="¿Eliminar tu cuenta?"
        message="¿Estás seguro de que quieres eliminar tu cuenta? Esta acción borrará todos tus datos y publicaciones. No se puede deshacer."
        confirmText="Sí, eliminar cuenta"
        cancelText="Cancelar"
        isDestructive={true}
        isLoading={isDeletingAccount}
        onConfirm={handleConfirmDeleteAccount}
        onCancel={() => setIsDeleteAccountModalOpen(false)}
      />
    </section>
  );
}

export default Profile;