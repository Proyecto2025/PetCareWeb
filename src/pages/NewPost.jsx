import { useState, useEffect, useMemo } from "react";
import DropDownTitle from "../components/DropDownTitle";
import Form from "../components/Form";

// Datos iniciales para un Post
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
  pertenencias: [],
};

// Datos iniciales para un Consejo
const INITIAL_CONSEJO = {
  tipoConsejo: "",
  tituloConsejo: "",
  subtituloConsejo: "",
  descripcionCorta: "",
  descripcion: "",
  detalleExtra: "",
  imagen: null,
};

// Componente principal para crear un nuevo Post o Consejo
function NewPost() {
  const [modo, setModo] = useState("post");
  const [formData, setFormData] = useState(INITIAL_POST);
  const [error, setError] = useState({});
  const [preview, setPreview] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Detecta si la vista es móvil
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  // Escucha cambios en el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Genera la preview de la imagen subida
  useEffect(() => {
    if (!formData.imagen) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(formData.imagen);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [formData.imagen]);

  // Resetea el paso actual al cambiar modo o tamaño de pantalla
  useEffect(() => {
    setCurrentStep(0);
  }, [isMobile, modo]);

  // Maneja cambios en los campos del formulario
  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "file" ? files[0] : value,
    }));
    setError((prev) => ({ ...prev, [id]: "" }));
  };

  // Define los pasos del formulario según modo y tamaño de pantalla
  const steps = useMemo(() => {
    if (!isMobile) {
      // Desktop
      return modo === "post"
        ? [
          ["tipoPost", "tipoAnimal", "tituloPost", "ubicacion", "descripcionCorta", "descripcion", "detalleExtra", "donarPertenencias", "pertenencias"],
          ["imagen"],
        ]
        : [
          ["tipoConsejo", "tituloConsejo", "subtituloConsejo", "descripcionCorta", "descripcion", "detalleExtra"],
          ["imagen"],
        ];
    }

    // Mobile
    if (modo === "post") {
      const mobileSteps = [
        ["tipoPost", "tipoAnimal", "tituloPost", "ubicacion"],
        ["descripcionCorta", "descripcion"],
        ["detalleExtra"],
      ];

      if (formData.tipoPost === "Adopción") {
        mobileSteps.push(["donarPertenencias", "pertenencias"]);
      }

      mobileSteps.push(["imagen"]);
      return mobileSteps;
    }

    return [
      ["tipoConsejo", "tituloConsejo", "subtituloConsejo"],
      ["descripcionCorta", "descripcion"],
      ["detalleExtra"],
      ["imagen"],
    ];
  }, [modo, isMobile, formData.tipoPost]);

  // Devuelve los campos obligatorios para el paso actual
  const getRequiredFields = (stepFields = []) => {
    if (!Array.isArray(stepFields)) return [];

    if (modo === "post") {
      return stepFields.filter(
        (field) =>
          ["tipoPost", "tipoAnimal", "tituloPost", "ubicacion", "descripcionCorta", "imagen","descripcion"].includes(field) ||
          (field === "donarPertenencias" &&
            !["Extravio", "Ayuda"].includes(formData.tipoPost))
      );
    }

    return stepFields.filter(
      (field) =>
        ["tipoConsejo", "tituloConsejo", "subtituloConsejo", "descripcionCorta", "imagen", "descripcion"].includes(field)
    );
  };

  // Verifica si el paso actual tiene errores
  const stepHasErrors = (fieldsToCheck = []) => {
    if (!Array.isArray(fieldsToCheck)) return false;

    const requiredFields = getRequiredFields(fieldsToCheck);

    return requiredFields.some((field) => {
      if (field === "pertenencias" && formData.donarPertenencias === "si") {
        return !formData.pertenencias || formData.pertenencias.length === 0;
      }
      return !formData[field];
    });
  };

  // Valida los campos del formulario
  const validate = (fields = []) => {
    if (!Array.isArray(fields)) return {};

    const validationErrors = {};
    const requiredFields = getRequiredFields(fields);

    requiredFields.forEach((field) => {
      if (
        !formData[field] ||
        (Array.isArray(formData[field]) && formData[field].length === 0)
      ) {
        validationErrors[field] = "Campo obligatorio";
      }
    });

    setError((prev) => ({ ...prev, ...validationErrors }));
    return validationErrors;
  };

  // Avanza al siguiente paso o envía el formulario
  const handleNext = () => {
    const stepErrors = validate(steps[currentStep]);
    if (Object.keys(stepErrors).length > 0) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  // Retrocede al paso anterior
  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  // Envía el formulario
  const handleSubmit = () => {
    const allFields = steps.flat();
    const errors = validate(allFields);
    if (Object.keys(errors).length > 0) return;

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    setFormData(modo === "post" ? INITIAL_POST : INITIAL_CONSEJO);
    setCurrentStep(0);
  };

  // Opciones del dropdown de modo
  const opciones = [
    {
      label: "Publicar un Post",
      onClick: () => {
        setModo("post");
        setFormData(INITIAL_POST);
        setError({});
        setCurrentStep(0);
      },
    },
    {
      label: "Publicar un Consejo",
      onClick: () => {
        setModo("consejo");
        setFormData(INITIAL_CONSEJO);
        setError({});
        setCurrentStep(0);
      },
    },
  ];

  // Porcentaje de progreso para la barra móvil
  const progressPercent = ((currentStep + 1) / steps.length) * 100;

  // Variables de control para botones
  const isStepInvalid = isMobile
    ? stepHasErrors(steps[currentStep])
    : stepHasErrors(steps.flat());

  const isBackDisabled = currentStep === 0;

  return (
    <section className="w-full relative shadow-2xl border border-gray-200 rounded-md p-5">
      {/* Mensaje de éxito */}
      <section className={`success-message z-40 ${showSuccess ? "show" : ""}`}>
        Finalizado <span className="material-symbols-outlined">check_circle</span>
      </section>

      {/* Selector de modo */}
      <article className="flex items-center justify-between mb-4">
        <DropDownTitle
          title={modo === "post" ? "Publicar un Post" : "Publicar un Consejo"}
          options={opciones}
        />

        {/* Botón Publicar (solo desktop) */}
        {!isMobile && (
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-4 rounded text-white text-2xl contenedor__textfont cursor-pointer primary-bg-color primary-color-hover"
          >
            Publicar
          </button>
        )}
      </article>

      {/* Formulario desktop */}
      {!isMobile && (
        <Form
          modo={modo}
          formData={formData}
          error={error}
          preview={preview}
          handleChange={handleChange}
          isMobile={false}
        />
      )}

      {/* Formulario móvil */}
      {isMobile && (
        <section className="flex flex-col gap-4">
          <p className="text-center">
            Paso {currentStep + 1} de {steps.length}
          </p>

          {/* Barra de progreso */}
          <section className="w-full h-2 bg-gray-300 rounded">
            <div
              className="h-full primary-bg-color transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </section>

          {/* Formulario paso a paso */}
          <Form
            modo={modo}
            formData={formData}
            error={error}
            preview={preview}
            handleChange={handleChange}
            currentStep={currentStep}
            visibleFields={steps[currentStep]}
            isMobile
          />

          {/* Botones de navegación */}
          <section className="flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={isBackDisabled}
              className={`px-5 py-2 rounded text-white cursor-pointer ${isBackDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-800"
                }`}
            >
              Atrás
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={isStepInvalid}
              className={`px-5 py-2 rounded text-white cursor-pointer ${isStepInvalid ? "bg-gray-400 cursor-not-allowed" : "primary-bg-color primary-color-hover"
                }`}
            >
              {currentStep === steps.length - 1 ? "Publicar" : "Siguiente"}
            </button>
          </section>
        </section>
      )}
    </section>
  );
}

export default NewPost;