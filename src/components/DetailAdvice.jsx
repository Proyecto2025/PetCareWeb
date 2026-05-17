import { useParams, useNavigate } from "react-router-dom";
import { useAdvice } from "../hooks/useAdvice";
import Detail from "./Detail.jsx";

function DetailAdvice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: advice, loading } = useAdvice(id);

  if (loading) {
    return (
      <section className="flex flex-row items-center justify-center text-gray-500 text-xl mt-10 gap-3">
        <span className="material-symbols-outlined animate-spin text-2xl">progress_activity</span>
        <p>Cargando detalles...</p>
      </section>
    );
  }

  return <Detail objeto={advice} onBack={() => navigate(-1)} label="categoria" />;
}
export default DetailAdvice;
