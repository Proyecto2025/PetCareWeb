import { useParams, useNavigate } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import Detail from "./Detail.jsx";

function DetailAnimal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: animal, loading } = usePost(id);

  if (loading) {
    return (
      <section className="flex flex-row items-center justify-center text-gray-500 text-xl mt-10 gap-3">
        <span className="material-symbols-outlined animate-spin text-2xl">progress_activity</span>
        <p>Cargando detalles...</p>
      </section>
    );
  }

  return <Detail objeto={animal} onBack={() => navigate(-1)} />;
}
export default DetailAnimal;
