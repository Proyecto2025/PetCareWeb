import FormInput from "../components/FormInput";
import ImageUploader from "../components/ImageUploader";

function Form({ modo, formData, error, preview, handleChange }) {
  return (
    <form id="formComponent" className="w-full mb-8" noValidate>
      {/* Contenedor principal con columnas izquierda y derecha */}
      <section className="flex gap-20">
        {/* Columna izquierda: campos principales */}
        <section className="flex-1 flex flex-col gap-4">
          <p className="text-gray-600">
            Los campos que tienen <span className="text-red-500">*</span> son obligatorios.
          </p>

          {modo === "post" ? (
            <>
              <section className="flex w-full gap-10">
                <FormInput
                  nombre="Tipo de Publicación"
                  id="tipoPost"
                  type="select"
                  value={formData.tipoPost}
                  onChange={handleChange}
                  required
                  error={error?.tipoPost}
                  options={[
                    { label: "Adopción", value: "Adopción" },
                    { label: "Ayuda", value: "Ayuda" },
                    { label: "Extravio", value: "Extravio" },
                  ]}
                  className="flex-auto"
                  placeholder="Selecciona un tipo de publicación"
                />
                <FormInput
                  nombre="Tipo de Animal"
                  id="tipoAnimal"
                  type="select"
                  value={formData.tipoAnimal}
                  onChange={handleChange}
                  required
                  error={error?.tipoAnimal}
                  options={[
                    { label: "Perro", value: "Perro" },
                    { label: "Gato", value: "Gato" },
                  ]}
                  className="flex-auto"
                  placeholder="Selecciona un tipo de animal"
                />
              </section>

              <FormInput
                nombre="Título del Post"
                id="tituloPost"
                placeholder="Escribe un título descriptivo..."
                value={formData.tituloPost}
                onChange={handleChange}
                required
                error={error?.tituloPost}
                maxLength={60}
              />

              <FormInput
                nombre={formData.tipoPost === "extravio" ? "Última ubicación" : "Ubicación del Post"}
                id="ubicacion"
                placeholder="Ej: Ciudad, País"
                value={formData.ubicacion}
                onChange={handleChange}
                required
                error={error?.ubicacion}
              />

              <FormInput
                nombre="Descripción Corta del Post"
                id="descripcionCorta"
                type="textarea"
                placeholder="Escribe una descripción breve..."
                value={formData.descripcionCorta}
                onChange={handleChange}
                required
                error={error?.descripcionCorta}
                maxLength={60}
              />

              <FormInput
                nombre="Descripción del Post"
                id="descripcion"
                type="textarea"
                placeholder="Escribe una descripción detallada..."
                value={formData.descripcion}
                onChange={handleChange}
                required
                error={error?.descripcion}
                className="h-60"
                maxLength={1500}
              />
            </>
          ) : (
            <>
              <FormInput
                nombre="Tipo de Consejo"
                id="tipoConsejo"
                type="select"
                value={formData?.tipoConsejo ?? ""}
                onChange={handleChange}
                required
                error={error?.tipoConsejo}
                options={[
                  { label: "Comida", value: "Comida" },
                  { label: "Higiene", value: "Higiene" },
                  { label: "Accesorios", value: "Accesorios" },
                ]}
                placeholder="Selecciona un tipo de consejo"
              />

              <FormInput
                nombre="Título del Consejo"
                id="tituloConsejo"
                placeholder="Escribe un título descriptivo..."
                value={formData?.tituloConsejo ?? ""}
                onChange={handleChange}
                required
                error={error?.tituloConsejo}
                maxLength={60}
              />

              <FormInput
                nombre="Subtítulo del Consejo"
                id="subtituloConsejo"
                placeholder="Añade un subtítulo breve..."
                value={formData?.subtituloConsejo ?? ""}
                onChange={handleChange}
                required
                error={error?.subtituloConsejo}
                maxLength={60}
              />

              <FormInput
                nombre="Descripción corta"
                id="descripcionCorta"
                type="textarea"
                placeholder="Escribe una descripción breve del consejo..."
                value={formData?.descripcionCorta ?? ""}
                onChange={handleChange}
                required
                error={error?.descripcionCorta}
                maxLength={150}
              />

              <FormInput
                nombre="Descripción"
                id="descripcion"
                type="textarea"
                placeholder="Explica tu consejo de forma detallada..."
                value={formData?.descripcion ?? ""}
                onChange={handleChange}
                required
                error={error?.descripcion}
                className="h-60"
                maxLength={1500}
              />
            </>
          )}
        </section>

        {/* Columna derecha: imagen y detalles extra */}
        <section className="flex-1 flex flex-col gap-4">
          <p className="font-medium text-gray-700">
            Seleccionar Imagen <span className="text-red-500">*</span>
          </p>
          <section className="border border-gray-300 rounded p-2 flex flex-col gap-2 w-full items-center">
            <section className="w-80 h-80 border border-gray-300 rounded flex items-center justify-center bg-gray-50 overflow-hidden">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <p className="text-gray-400">No se ha seleccionado imagen</p>
              )}
            </section>
            <ImageUploader id="imagen" onChange={handleChange} />
            {error?.imagen && (
              <p className="text-red-600 text-sm mt-1 w-full">{error.imagen}</p>
            )}
          </section>

          <section className="flex gap-10 flex-col md:flex-row">
            <FormInput
              nombre="Detalles Extra"
              id="detalleExtra"
              type="textarea"
              placeholder="Agrega información adicional..."
              value={formData?.detalleExtra}
              onChange={handleChange}
              className="h-60 flex-auto"
              maxLength={500}
            />

            {modo === "post" &&
              formData.tipoPost !== "Extravio" &&
              formData.tipoPost !== "Ayuda" && (
                <section className="w-full flex flex-col gap-2">
                  <FormInput
                    nombre="¿Deseas Donar Pertenencias?"
                    id="donarPertenencias"
                    type="radio"
                    value={formData.donarPertenencias}
                    onChange={handleChange}
                    required
                    error={error.donarPertenencias}
                    options={[
                      { label: "Sí", value: "si" },
                      { label: "No", value: "no" },
                    ]}
                  />

                  {formData.donarPertenencias === "si" && (
                    <FormInput
                      nombre="¿Qué pertenencias deseas donar?"
                      id="pertenencias"
                      placeholder="Separa con coma..."
                      value={formData.pertenencias}
                      onChange={handleChange}
                      required
                      error={error.pertenencias}
                      className="mt-4"
                    />
                  )}
                </section>
              )}
          </section>
        </section>
      </section>
    </form>
  );
}

export default Form;