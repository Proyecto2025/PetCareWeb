import FormInput from "../components/FormInput";
import ImageUploader from "../components/ImageUploader";
import UbicacionFilter from "../components/UbicacionFilter";

const GEOAPI_KEY = "ffbe70b5978749886d63284dfbdab1cf22cb3e40a40c6f0c87f74dc49bbdd7f4";

// Definición de campos por modo
const camposPorModo = {
  post: [
    { id: "tipoPost", nombre: "Tipo de Publicación", type: "select", options: [{ label: "Adopción", value: "Adopción" }, { label: "Ayuda", value: "Ayuda" }, { label: "Extravio", value: "Extravio" }], required: true },
    { id: "tipoAnimal", nombre: "Tipo de Animal", type: "select", options: [{ label: "Perro", value: "Perro" }, { label: "Gato", value: "Gato" }], required: true },
    { id: "tituloPost", nombre: "Título del Post", maxLength: 60, required: true },
    { id: "ubicacion", nombre: "Ubicación del Post", required: true },
    { id: "descripcionCorta", nombre: "Descripción Corta del Post", maxLength: 60, required: true },
    { id: "descripcion", nombre: "Descripción del Post", type: "textarea", maxLength: 1500, required: true },
    { id: "detalleExtra", nombre: "Detalles Extra", type: "textarea", maxLength: 500 },
    { id: "donarPertenencias", nombre: "¿Deseas Donar Pertenencias?", type: "radio", options: [{ label: "Sí", value: "si" }, { label: "No", value: "no" }] },
    { id: "pertenencias", nombre: "¿Qué pertenencias deseas donar?" },
    { id: "imagen", nombre: "Imagen", required: true },
    { id: "altTexto", nombre: "Descripcion Imagen", maxLength: 100, required: true }
  ],
  consejo: [
    { id: "tipoConsejo", nombre: "Tipo de Consejo", type: "select", options: [{ label: "Comida", value: "Comida" }, { label: "Higiene", value: "Higiene" }, { label: "Accesorios", value: "Accesorios" }], required: true },
    { id: "tituloConsejo", nombre: "Título del Consejo", maxLength: 60, required: true },
    { id: "descripcionCorta", nombre: "Descripción Corta del Consejo", maxLength: 60, required: true },
    { id: "descripcion", nombre: "Descripción del Consejo", type: "textarea", maxLength: 1500, required: true },
    { id: "detalleExtra", nombre: "Detalles Extra", type: "textarea", maxLength: 500 },
    { id: "imagen", nombre: "Imagen", required: true },
    { id: "altTexto", nombre: "Descripcion Imagen", maxLength: 100, required: true }
  ]
};

function Form({ modo, formData, error, preview, handleChange, onBlur, visibleFields, disabled = false }) {

  const isFieldVisible = (id) => (!visibleFields ? true : visibleFields.includes(id));

  const camposFiltrados = camposPorModo[modo]?.filter(c => isFieldVisible(c.id)) || [];

  const leftFields = camposFiltrados.filter(c => {
    if (modo === "post") return ["tipoPost", "tipoAnimal", "tituloPost", "ubicacion", "descripcionCorta", "descripcion"].includes(c.id);
    if (modo === "consejo") return ["tipoConsejo", "tituloConsejo", "descripcionCorta", "descripcion"].includes(c.id);
    return false;
  });

  const rightFields = camposFiltrados.filter(c => {
    if (modo === "post") return ["donarPertenencias", "pertenencias", "imagen", "altTexto"].includes(c.id);
    if (modo === "consejo") return ["detalleExtra", "imagen", "altTexto"].includes(c.id);
    return false;
  });

  return (
    <form id="formComponent" className="w-full mb-4 md:mb-0" noValidate>
      <section className="flex flex-col md:flex-row gap-6 md:gap-10 w-full h-auto">

        {/* Columna izquierda */}
        {leftFields.length > 0 && (
          <section className="flex-1 flex flex-col gap-4 w-full h-auto">
            <p className="text-gray-600 text-sm md:block md:mb-2">
              Los campos que tienen <span className="text-red-500">*</span> son obligatorios.
            </p>

            {/* Campos tipoPost y tipoAnimal juntos */}
            {modo === "post" && (isFieldVisible("tipoPost") || isFieldVisible("tipoAnimal")) && (
              <section className="flex flex-col md:flex-row gap-4 w-full">
                {isFieldVisible("tipoPost") && (
                  <FormInput
                    nombre="Tipo de Publicación"
                    id="tipoPost"
                    type="select"
                    value={formData.tipoPost}
                    onChange={handleChange}
                    required
                    error={error?.tipoPost}
                    options={leftFields.find(f => f.id === "tipoPost")?.options ?? []}
                    className="flex-1"
                    placeholder="Selecciona un tipo de publicación"
                  />
                )}
                {isFieldVisible("tipoAnimal") && (
                  <FormInput
                    nombre="Tipo de Animal"
                    id="tipoAnimal"
                    type="select"
                    value={formData.tipoAnimal}
                    onChange={handleChange}
                    required
                    error={error?.tipoAnimal}
                    options={leftFields.find(f => f.id === "tipoAnimal")?.options ?? []}
                    className="flex-1"
                    placeholder="Selecciona un tipo de animal"
                  />
                )}
              </section>
            )}

            {leftFields.filter(c => !["tipoPost", "tipoAnimal"].includes(c.id)).map(c => {
              if (c.id === "ubicacion") {
                return (
                  <section key={c.id} className="w-full">
                    <label className="block font-medium text-gray-700 mb-1">
                      {c.nombre} {c.required && <span className="text-red-500">*</span>}
                    </label>
                    <section className="border border-gray-300 rounded-md p-2 bg-white flex justify-start">
                      <UbicacionFilter
                        apiKey={GEOAPI_KEY}
                        className="text-left"
                        initialValue={formData.ubicacion}
                        onSelect={({ provincia, municipio }) => {
                          handleChange({
                            target: {
                              id: "ubicacion",
                              value: municipio ? `${provincia}/${municipio}` : provincia || ""
                            }
                          });
                        }}
                      />
                    </section>
                    {error?.ubicacion && <p className="text-red-600 text-sm mt-1">{error.ubicacion}</p>}
                  </section>
                );
              }
              return (
                <FormInput
                  key={c.id}
                  nombre={c.nombre}
                  id={c.id}
                  type={c.type ?? "text"}
                  placeholder={`Escribe ${c.nombre.toLowerCase()}...`}
                  value={formData[c.id]}
                  onChange={handleChange}
                  onBlur={onBlur}
                  required={c.required}
                  error={error?.[c.id]}
                  maxLength={c.maxLength}
                  className={`w-full`}
                  options={c.options}
                  disabled={disabled}
                />
              );
            })}
          </section>
        )}

        {/* Columna derecha */}
        {(rightFields.length > 0 || isFieldVisible("detalleExtra")) && (
          <section className="flex-1 flex flex-col gap-4 w-full h-auto">

            <p className="text-gray-600 text-sm md:hidden">
              Los campos que tienen <span className="text-red-500">*</span> son obligatorios.
            </p>

            {/* Imagen */}
            {isFieldVisible("imagen") && (
              <section>
                <label htmlFor="imagen" className="block font-medium text-gray-700 mb-1">
                  Seleccionar Imagen <span className="text-red-500">*</span>
                </label>
                <section className="border border-gray-300 rounded p-2 flex flex-col gap-2 w-full items-center">
                  <section className="w-full sm:w-80 h-80 border border-gray-300 rounded flex items-center justify-center bg-gray-50 overflow-hidden">
                    {preview ? (
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <p className="text-gray-400 text-sm text-center">No se ha seleccionado imagen</p>
                    )}
                  </section>
                  <ImageUploader id="imagen" onChange={handleChange} value={formData.imagen} />
                  {error?.imagen && <p className="text-red-600 text-sm mt-1 w-full">{error.imagen}</p>}
                  
                  {isFieldVisible("altTexto") && (
                    <FormInput
                      nombre="Descripcion Imagen"
                      id="altTexto"
                      placeholder="describe brevemente la imagen"
                      value={formData.altTexto}
                      onChange={handleChange}
                      onBlur={onBlur}
                      required
                      error={error?.altTexto}
                      maxLength={60}
                      className="w-full mt-2"
                    />
                  )}
                </section>
              </section>
            )}

            {/* POST: Adopción - Detalle Extra y Donar Pertenencias debajo */}
            {modo === "post" && formData.tipoPost === "Adopción" && (
              <section className="flex flex-col gap-4 w-full">
                <section className="flex flex-col md:flex-row gap-4 w-full">
                  {isFieldVisible("detalleExtra") && (
                    <FormInput
                      nombre="Detalles Extra"
                      id="detalleExtra"
                      type="textarea"
                      placeholder="Agrega información adicional..."
                      value={formData?.detalleExtra}
                      onChange={handleChange}
                      onBlur={onBlur}
                      error={error?.detalleExtra}
                      className="flex-1"
                      disabled={disabled}
                    />
                  )}
                  {isFieldVisible("donarPertenencias") && (
                    <section className="flex-1 flex flex-col gap-4">
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
                        className="w-full"
                        disabled={disabled}
                      />

                      {formData.donarPertenencias === "si" && isFieldVisible("pertenencias") && (
                        <FormInput
                          nombre="¿Qué pertenencias deseas donar?"
                          id="pertenencias"
                          placeholder="Separa con coma..."
                          value={formData.pertenencias}
                          onChange={handleChange}
                          onBlur={onBlur}
                          required
                          error={error.pertenencias}
                          className="w-full min-h-[50px]"
                          disabled={disabled}
                        />
                      )}
                    </section>
                  )}
                </section>
              </section>
            )}

            {/* POST: No Adopción - Detalle Extra solo */}
            {modo === "post" && formData.tipoPost !== "Adopción" && isFieldVisible("detalleExtra") && (
              <FormInput
                nombre="Detalles Extra"
                id="detalleExtra"
                type="textarea"
                placeholder="Agrega información adicional..."
                value={formData?.detalleExtra}
                onChange={handleChange}
                onBlur={onBlur}
                error={error?.detalleExtra}
                className="w-full"
                disabled={disabled}
              />
            )}

            {/* CONSEJO */}
            {modo === "consejo" && isFieldVisible("detalleExtra") && (
              <FormInput
                nombre="Detalles Extra"
                id="detalleExtra"
                type="textarea"
                placeholder="Agrega información adicional..."
                value={formData?.detalleExtra}
                onChange={handleChange}
                onBlur={onBlur}
                error={error?.detalleExtra}
                className="w-full min-h-[100px]"
                maxLength={500}
                disabled={disabled}
              />
            )}
          </section>
        )}
      </section>
    </form>
  );
}

export default Form;