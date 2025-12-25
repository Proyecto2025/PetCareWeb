import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DropDownTitle from "./DropDownTitle";
import FormInput from "./FormInput";
import ImageUploader from "./ImageUploader";

function Form() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
  });

  const [error, setError] = useState({});

  const opciones = [{ label: "Publicar un Consejo", to: "/advice/accesorios" }];

  const handleChange = (e) => {
    const { id, name, value, type, files } = e.target;
    const key = type === "radio" ? name : id;
    setFormData((prev) => ({ ...prev, [key]: files ? files[0] : value }));

    // Limpiar error en tiempo real
    setError((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = {};

    if (!formData.tipoPost) newError.tipoPost = "Selecciona un tipo de publicación";
    if (!formData.tipoAnimal) newError.tipoAnimal = "Selecciona un tipo de animal";
    if (!formData.tituloPost) newError.tituloPost = "El título es obligatorio";
    if (!formData.ubicacion) newError.ubicacion = "La ubicación es obligatoria";
    if (!formData.descripcionCorta) newError.descripcionCorta = "La descripción corta es obligatoria";
    if (!formData.descripcion) newError.descripcion = "La descripción es obligatoria";
    if (!formData.detalleExtra) newError.detalleExtra = "Los detalles extra son obligatorios";
    if (!formData.imagen) newError.imagen = "Debes seleccionar una imagen";
    if (!formData.donarPertenencias) newError.donarPertenencias = "Debes indicar si deseas donar pertenencias";
    if (formData.donarPertenencias === "si" && !formData.pertenencias) newError.pertenencias = "Debes detallar las pertenencias";

    setError(newError);

    if (Object.keys(newError).length === 0) {
      console.log("Formulario enviado correctamente:", formData);
      // Aquí podrías hacer fetch o navigate
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full" noValidate>
      {/* Encabezado */}
      <article className="flex items-center justify-between mb-6">
        <DropDownTitle
          title="Publicar un Post"
          options={opciones.map((opcion) => ({
            label: opcion.label,
            onClick: () => navigate(opcion.to),
          }))}
        />
        <button
          type="submit"
          className="px-5 py-2 primary-color text-white contenedor__textfont text-2xl rounded hover:bg-green-700 flex items-center gap-2 justify-center"
        >
          Finalizar
          <span className="material-symbols-outlined icon-arrow-form">
            keyboard_arrow_right
          </span>
        </button>
      </article>

      {/* Contenedor principal */}
      <section className="flex gap-20">
        {/* Columna izquierda */}
        <section className="flex-1 flex flex-col gap-4">
          <section className="text-gray-600 mb-4">
            <p>Siempre habrá alguien que también esté interesado.</p>
            <p>Selecciona el tipo de publicación que deseas hacer.</p>
          </section>

          <section className="flex w-full gap-10">
            <FormInput
              nombre="Tipo de Publicación"
              id="tipoPost"
              type="select"
              value={formData.tipoPost}
              onChange={handleChange}
              required
              error={error.tipoPost}
              errorId="tipoPost-error"
              options={[
                { label: "Adopción", value: "adopcion" },
                { label: "Extravio", value: "extravio" },
                { label: "Consejo", value: "consejo" },
              ]}
              className="flex-1"
            />

            <FormInput
              nombre="Tipo de Animal"
              id="tipoAnimal"
              type="select"
              value={formData.tipoAnimal}
              onChange={handleChange}
              required
              error={error.tipoAnimal}
              errorId="tipoAnimal-error"
              options={[
                { label: "Perro", value: "perro" },
                { label: "Gato", value: "gato" },
              ]}
              className="flex-1"
            />
          </section>

          <FormInput
            nombre="Título del Post"
            id="tituloPost"
            placeholder="Titulo..."
            value={formData.tituloPost}
            onChange={handleChange}
            required
            error={error.tituloPost}
            errorId="tituloPost-error"
          />

          <FormInput
            nombre="Ubicación del Post"
            id="ubicacion"
            placeholder="Ej: Ciudad, País"
            value={formData.ubicacion}
            onChange={handleChange}
            required
            error={error.ubicacion}
            errorId="ubicacion-error"
          />

          <FormInput
            nombre="Descripción corta del Post"
            id="descripcionCorta"
            type="textarea"
            placeholder="Escribe una descripción breve..."
            value={formData.descripcionCorta}
            onChange={handleChange}
            required
            error={error.descripcionCorta}
            errorId="descripcionCorta-error"
          />

          <FormInput
            nombre="Descripción del Post"
            id="descripcion"
            type="textarea"
            placeholder="Escribe una descripción detallada..."
            value={formData.descripcion}
            onChange={handleChange}
            required
            error={error.descripcion}
            errorId="descripcion-error"
            className="h-60"
          />
        </section>

        {/* Columna derecha */}
        <section className="flex-1 flex flex-col gap-4">
          <p className="font-medium text-gray-700">
            Seleccionar Imagen <span className="text-red-500">*</span>
          </p>

          <section className="border border-gray-300 rounded p-2 flex flex-col gap-2 w-full items-center">
            <section className="w-80 h-80 border border-gray-300 rounded flex items-center justify-center bg-gray-50 overflow-hidden">
              {formData.imagen ? (
                <img
                  src={URL.createObjectURL(formData.imagen)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-gray-400">No se ha seleccionado imagen</p>
              )}
            </section>

            <ImageUploader id="imagen" onChange={handleChange} />
            {error.imagen && <p id="imagen-error" className="text-red-600 text-sm mt-1">{error.imagen}</p>}
          </section>

          <section className="flex gap-10 flex-1">
            <FormInput
              nombre="Detalles Extra del Post"
              id="detalleExtra"
              type="textarea"
              placeholder="Escribe una descripción..."
              value={formData.detalleExtra}
              onChange={handleChange}
              required
              error={error.detalleExtra}
              errorId="detalleExtra-error"
              className="h-60"
            />

            <section className="w-full">
              <FormInput
                nombre="¿Deseas Donar Pertenencias?"
                id="donarPertenencias"
                type="radio"
                value={formData.donarPertenencias}
                onChange={handleChange}
                required
                error={error.donarPertenencias}
                errorId="donarPertenencias-error"
                options={[
                  { label: "Sí", value: "si" },
                  { label: "No", value: "no" },
                ]}
              />

              {formData.donarPertenencias === "si" && (
                <FormInput
                  nombre="¿Qué pertenencias deseas donar?"
                  id="pertenencias"
                  placeholder="Separa las pertenencias por comas..."
                  value={formData.pertenencias || ""}
                  onChange={handleChange}
                  required
                  error={error.pertenencias}
                  errorId="pertenencias-error"
                  className="mt-4"
                />
              )}
            </section>
          </section>
        </section>
      </section>
    </form>
  );
}

export default Form;