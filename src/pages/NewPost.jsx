import { useEffect, useState } from "react";
import DropDownTitle from "../components/DropDownTitle";
import Form from "../components/Form";

const INITIAL_POST = {
  tipoPost: "",
  tipoAnimal: "",
  tituloPost: "",
  ubicacion: "",
  descripcionCorta: "",
  descripcion: "",
  detalleExtra: "",
  imagen: null,
  donarPertenencias: "",
  pertenencias: "",
};

const INITIAL_CONSEJO = {
  tipoConsejo: "",
  tituloConsejo: "",
  subtituloConsejo: "",
  descripcionCorta: "",
  descripcion: "",
  detalleExtra: "",
  imagen: null,
};

function NewPost() {
  const [modo, setModo] = useState("post");
  const [formData, setFormData] = useState(INITIAL_POST);
  const [error, setError] = useState({});
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!formData.imagen) return setPreview(null);
    const objectUrl = URL.createObjectURL(formData.imagen);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [formData.imagen]);

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: type === "file" ? files[0] : value,
    }));

    setError((prev) => {
      const updated = { ...prev, [id]: "" };

      // Si cambiamos donarPertenencias a "no", limpiar error de pertenencias
      if (id === "donarPertenencias" && value === "no") {
        updated.pertenencias = "";
      }

      return updated;
    });
  };

  const validateForm = () => {
    const newError = {};
    if (modo === "post") {
      if (!formData.tipoPost) newError.tipoPost = "Selecciona un tipo de publicación";
      if (!formData.tipoAnimal) newError.tipoAnimal = "Selecciona un tipo de animal";
      if (!formData.tituloPost) newError.tituloPost = "El título es obligatorio";
      if (!formData.ubicacion) newError.ubicacion = "La ubicación es obligatoria";
      if (!formData.descripcionCorta) newError.descripcionCorta = "La descripción corta es obligatoria";
      if (!formData.descripcion) newError.descripcion = "La descripción es obligatoria";
      if (!formData.imagen) newError.imagen = "Debes seleccionar una imagen";
      if (!formData.donarPertenencias) newError.donarPertenencias = "Debes indicar si deseas donar pertenencias";
      if (formData.donarPertenencias === "si" && (!formData.pertenencias || formData.pertenencias.length === 0)) {
        newError.pertenencias = "Debes detallar las pertenencias";
      }
    } else {
      if (!formData.tipoConsejo) newError.tipoConsejo = "Selecciona un tipo de consejo";
      if (!formData.tituloConsejo) newError.tituloConsejo = "El título es obligatorio";
      if (!formData.subtituloConsejo) newError.subtituloConsejo = "El subtítulo es obligatorio";
      if (!formData.descripcionCorta) newError.descripcionCorta = "La descripción corta es obligatoria";
      if (!formData.descripcion) newError.descripcion = "La descripción es obligatoria";
      if (!formData.imagen) newError.imagen = "Debes seleccionar una imagen";
    }
    return newError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setError(validationErrors);
    if (Object.keys(validationErrors).length) return;
    console.log("Formulario enviado correctamente:", formData);
  };

  const opciones = [
    {
      label: "Publicar un Post",
      onClick: () => {
        setModo("post");
        setFormData(INITIAL_POST);
        setError({});
      },
    },
    {
      label: "Publicar un Consejo",
      onClick: () => {
        setModo("consejo");
        setFormData(INITIAL_CONSEJO);
        setError({});
      },
    },
  ];

  return (
    <section className="w-full">
      <article className="flex items-center justify-between">
        <DropDownTitle
          title={modo === "post" ? "Publicar un Post" : "Publicar un Consejo"}
          options={opciones}
        />

        <button
          type="submit"
          form="formComponent"
          className="px-5 py-2 mb-6 primary-color-hover primary-bg-color contenedor__textfont text-white text-2xl rounded hover:bg-green-700 flex items-center cursor-pointer"
          onClick={handleSubmit}
        >
          Finalizar
          <span className="material-symbols-outlined icon-arrow-form">
            keyboard_arrow_right
          </span>
        </button>
      </article>

      <Form
        modo={modo}
        formData={formData}
        error={error}
        preview={preview}
        handleChange={handleChange}
      />
    </section>
  );
}

export default NewPost;