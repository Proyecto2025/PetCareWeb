import { useState, useEffect, useMemo } from "react";
import DropDownTitle from "../components/DropDownTitle";
import Form from "../components/Form";
import { createPost, createAdoptionPost } from "../services/postService";
import { createAdvice } from "../services/adviceService";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleBlur = (e) => {
    const { id, value } = e.target;
    const textFields = ["tituloPost", "descripcionCorta", "descripcion", "detalleExtra", "tituloConsejo", "pertenencias"];
    
    if (textFields.includes(id) && value) {
      if (typeof value === "string" && value.trim().length < 5) {
        setError((prev) => ({ ...prev, [id]: "Mínimo 5 caracteres" }));
      }
    }
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
          ["tipoConsejo", "tituloConsejo", "descripcionCorta", "descripcion", "detalleExtra"],
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
      ["tipoConsejo", "tituloConsejo"],
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
          ["tipoPost", "tipoAnimal", "tituloPost", "ubicacion", "descripcionCorta", "imagen", "descripcion"].includes(field) ||
          (field === "donarPertenencias" &&
            !["Extravio", "Ayuda"].includes(formData.tipoPost))
      );
    }

    return stepFields.filter(
      (field) =>
        ["tipoConsejo", "tituloConsejo", "descripcionCorta", "imagen", "descripcion"].includes(field)
    );
  };

  // Verifica si el paso actual tiene errores
  const stepHasErrors = (fieldsToCheck = []) => {
    if (!Array.isArray(fieldsToCheck)) return false;

    const requiredFields = getRequiredFields(fieldsToCheck);
    const textFields = ["tituloPost", "descripcionCorta", "descripcion", "detalleExtra", "tituloConsejo", "pertenencias"];

    const missingRequired = requiredFields.some((field) => {
      if (field === "pertenencias" && formData.donarPertenencias === "si") {
        return !formData.pertenencias || formData.pertenencias.length === 0;
      }
      if (field === "ubicacion") {
        return !formData.ubicacion || !formData.ubicacion.includes("/");
      }
      return !formData[field];
    });

    if (missingRequired) return true;

    const invalidLength = fieldsToCheck.some((field) => {
      if (textFields.includes(field)) {
        const value = formData[field];
        return value && typeof value === "string" && value.trim().length < 5;
      }
      return false;
    });

    return invalidLength;
  };

  // Valida los campos del formulario
  const validate = (fields = []) => {
    if (!Array.isArray(fields)) return {};

    const validationErrors = {};
    const requiredFields = getRequiredFields(fields);
    const textFields = ["tituloPost", "descripcionCorta", "descripcion", "detalleExtra", "tituloConsejo", "pertenencias"];

    requiredFields.forEach((field) => {
      if (
        !formData[field] ||
        (Array.isArray(formData[field]) && formData[field].length === 0)
      ) {
        validationErrors[field] = "Campo obligatorio";
      } else if (field === "ubicacion" && !formData.ubicacion.includes("/")) {
        validationErrors[field] = "Debes seleccionar un municipio";
      }
    });

    fields.forEach((field) => {
      if (textFields.includes(field)) {
        const value = formData[field];
        if (value && typeof value === "string" && value.trim().length < 5) {
          validationErrors[field] = "Mínimo 5 caracteres";
        }
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
  const handleSubmit = async () => {
    const allFields = steps.flat();
    const errors = validate(allFields);
    if (Object.keys(errors).length > 0) return;

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Debes iniciar sesión para publicar.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (modo === "post") {
        // Mapeamos los campos para la API
        let categoryPost = formData.tipoPost.toUpperCase();
        if (categoryPost === "ADOPCIÓN") categoryPost = "ADOPCION";
        if (categoryPost === "EXTRAVÍO") categoryPost = "EXTRAVIO";

        const typeAnimal = formData.tipoAnimal.toUpperCase();

        // Separamos provincia y municipio de la ubicación (formato: "Provincia/Municipio")
        const [provincia, municipio] = formData.ubicacion.split("/");

        const postData = {
          postCategory: categoryPost,
          typeAnimal,
          title: formData.tituloPost,
          subtitle: formData.descripcionCorta,
          shortDescription: formData.descripcionCorta,
          longDescription: formData.descripcion,
          extraDetails: formData.detalleExtra,
          location: provincia,
          municipality: municipio,
          userId: parseInt(userId)
        };

        if (categoryPost === "ADOPCION") {
          postData.belongings = formData.pertenencias || [];
          await createAdoptionPost(postData, formData.imagen);
        } else {
          await createPost(postData, formData.imagen);
        }
      } else {
        // Mapeamos los campos para Consejo
        const category = formData.tipoConsejo.toUpperCase();

        const adviceData = {
          category,
          title: formData.tituloConsejo,
          subtitle: formData.descripcionCorta,
          shortDescription: formData.descripcionCorta,
          longDescription: formData.descripcion,
          extraDetail: formData.detalleExtra,
          userId: parseInt(userId)
        };

        await createAdvice(adviceData, formData.imagen);
      }

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      setFormData(modo === "post" ? INITIAL_POST : INITIAL_CONSEJO);
      setCurrentStep(0);
    } catch (err) {
      alert(err.message || "Error al crear la publicación");
    } finally {
      setIsSubmitting(false);
    }
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
            disabled={isSubmitting}
            className={`px-6 py-4 rounded text-white text-2xl contenedor__textfont flex items-center justify-center gap-2 primary-bg-color primary-color-hover ${isSubmitting ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
          >
            {isSubmitting && (
              <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
            )}
            {isSubmitting ? "Publicando..." : "Publicar"}
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
          onBlur={handleBlur}
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
            <section
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
            onBlur={handleBlur}
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
              disabled={isStepInvalid || isSubmitting}
              className={`px-5 py-2 rounded text-white flex items-center justify-center gap-2 ${isStepInvalid || isSubmitting ? "bg-gray-400 cursor-not-allowed" : "primary-bg-color primary-color-hover"
                }`}
            >
              {isSubmitting && (
                <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
              )}
              {currentStep === steps.length - 1 ? (isSubmitting ? "Publicando..." : "Publicar") : "Siguiente"}
            </button>
          </section>
        </section>
      )}
    </section>
  );
}

export default NewPost;