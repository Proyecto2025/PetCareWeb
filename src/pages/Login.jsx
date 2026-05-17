import { useState, useEffect } from "react";
import FormInput from "../components/FormInput";
import loginHero from "../assets/images/login-hero.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const [modo, setModo] = useState("login");
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    username: "",
    telefono: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();
  const { loginUser, registerUser, loading, error: authError, clearError } = useAuth();

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrentStep(0);
  }, [modo, isMobile]);

  const isLogin = modo === "login";

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    clearError();
  };



  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    try {
      if (isLogin) {
        await loginUser(formData.username, formData.password);
        navigate("/");
      } else {
        await registerUser({
          userName: formData.username,
          password: formData.password,
          email: formData.email,
          phoneNumber: formData.telefono,
          fullName: formData.nombreCompleto,
          confirmPassword: formData.confirmPassword
        });
        setModo("login");
        setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      }
    } catch (err) {
      console.error("Error en submit:", err);
    }
  };

  const isStep0Invalid = !isLogin && (!formData.nombreCompleto?.trim() || !formData.username?.trim() || !formData.telefono?.trim() || !formData.email?.trim());
  const isStep1Invalid = !isLogin && (!formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword);
  const isMobileButtonDisabled = loading || (currentStep === 0 ? isStep0Invalid : isStep1Invalid);

  const isDesktopRegisterInvalid = !isLogin && (!formData.nombreCompleto?.trim() || !formData.username?.trim() || !formData.telefono?.trim() || !formData.email?.trim() || !formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword);
  const isDesktopLoginInvalid = isLogin && (!formData.username?.trim() || !formData.password);
  const isDesktopButtonDisabled = loading || (isLogin ? isDesktopLoginInvalid : isDesktopRegisterInvalid);

  return (
    <section className="flex h-screen w-full overflow-hidden bg-white">
      {/* Mitad izquierda: Imagen */}
      <section className="hidden md:block md:w-1/2 h-full">
        <img
          src={loginHero}
          alt="Perro en la playa"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Mitad derecha: Formulario */}
      <section className="w-full md:w-1/2 h-full flex flex-col items-center justify-center p-6 md:p-12">
        <article className={`w-full max-w-md bg-white p-8 rounded-md border border-gray-200 shadow-2xl relative ${!isLogin ? 'my-8' : ''}`}>
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold contenedor__texto-primary contenedor__textfont mb-2">
              {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
            </h1>
            <p className="text-gray-500">
              {isLogin ? "¡Bienvenido de nuevo!" : "¡Únete a nuestra comunidad de amantes de las mascotas!"}
            </p>
          </header>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            {isMobile && !isLogin ? (
              // Registro en móvil (2 pasos)
              <>
                <p className="text-center text-gray-600 font-bold">
                  Paso {currentStep + 1} de 2
                </p>

                {/* Barra de progreso */}
                <section className="w-full h-2 bg-gray-300 rounded mb-2">
                  <div
                    className="h-full primary-bg-color transition-all duration-300"
                    style={{ width: `${(currentStep + 1) / 2 * 100}%` }}
                  />
                </section>

                {currentStep === 0 && (
                  <>
                    <FormInput
                      nombre="Nombre completo"
                      id="nombreCompleto"
                      placeholder="Introduce tu nombre completo"
                      value={formData.nombreCompleto}
                      onChange={handleChange}
                      required
                    />
                    <FormInput
                      nombre="Nombre de usuario"
                      id="username"
                      placeholder="Introduce tu usuario"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                    <FormInput
                      nombre="Número de teléfono"
                      id="telefono"
                      type="tel"
                      placeholder="Introduce tu teléfono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                    />
                    <FormInput
                      nombre="Correo electrónico"
                      id="email"
                      type="email"
                      placeholder="Introduce tu correo"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </>
                )}

                {currentStep === 1 && (
                  <>
                    <FormInput
                      nombre="Contraseña"
                      id="password"
                      type="password"
                      placeholder="Introduce tu contraseña"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <FormInput
                      nombre="Confirma contraseña"
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirma tu contraseña"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </>
                )}

                {authError && (
                  <p className="text-red-500 text-center text-sm font-semibold mt-2">{authError}</p>
                )}

                {/* Botones de navegación para móvil */}
                <section className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(0)}
                    disabled={currentStep === 0}
                    className={`px-5 py-2 rounded text-white cursor-pointer ${currentStep === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-800"}`}
                  >
                    Atrás
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (currentStep === 0) {
                        setCurrentStep(1);
                      } else {
                        handleSubmit();
                      }
                    }}
                    disabled={isMobileButtonDisabled}
                    className={`px-5 py-2 rounded text-white flex items-center gap-2 ${isMobileButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "primary-bg-color primary-color-hover cursor-pointer"}`}
                  >
                    {loading && currentStep === 1 && (
                      <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                    )}
                    {loading && currentStep === 1 ? "Registrando..." : (currentStep === 1 ? "Registrarse" : "Siguiente")}
                  </button>
                </section>
              </>
            ) : (
              // Escritorio o Login
              <>
                {!isLogin && (
                  <FormInput
                    nombre="Nombre completo"
                    id="nombreCompleto"
                    placeholder="Introduce tu nombre completo"
                    value={formData.nombreCompleto}
                    onChange={handleChange}
                    required
                  />
                )}

                <FormInput
                  nombre="Nombre de usuario"
                  id="username"
                  placeholder="Introduce tu usuario"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />

                {!isLogin && (
                  <>
                    <FormInput
                      nombre="Número de teléfono"
                      id="telefono"
                      type="tel"
                      placeholder="Introduce tu teléfono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                    />
                    <FormInput
                      nombre="Correo electrónico"
                      id="email"
                      type="email"
                      placeholder="Introduce tu correo"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </>
                )}

                <FormInput
                  nombre="Contraseña"
                  id="password"
                  type="password"
                  placeholder="Introduce tu contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                {!isLogin && (
                  <FormInput
                    nombre="Confirma contraseña"
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirma tu contraseña"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                )}

                {authError && (
                  <p className="text-red-500 text-center text-sm font-semibold">{authError}</p>
                )}

                <button
                  type="submit"
                  disabled={isDesktopButtonDisabled}
                  className={`mt-6 w-full py-4 text-white text-2xl contenedor__textfont rounded-md shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${isDesktopButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "primary-bg-color primary-color-hover cursor-pointer"}`}
                >
                  {loading && (
                    <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                  )}
                  {loading ? (isLogin ? "Iniciando sesión..." : "Registrando...") : (isLogin ? "Iniciar Sesión" : "Registrarse")}
                </button>
              </>
            )}
          </form>

          <section className="mt-8 text-center">
            <p className="text-gray-600">
              {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
              <span
                onClick={(e) => {
                  e.preventDefault();
                  setModo(isLogin ? "registro" : "login");
                  clearError();
                }}
                className="ml-2 contenedor__texto-primary font-bold hover:underline cursor-pointer"
              >
                {isLogin ? "Regístrate" : "Inicia Sesión"}
              </span>
            </p>
          </section>
        </article>
      </section>
    </section>
  );
}

export default Login;
