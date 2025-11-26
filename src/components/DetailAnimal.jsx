import { useParams, useNavigate } from "react-router-dom";
import posts from "../data/post.js";
import Detail from "./Detail.jsx";

function DetailAnimal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const animal = posts.find((a) => a.id === parseInt(id));

  return <Detail objeto={animal} onBack={() => navigate(-1)} />;
}
export default DetailAnimal;
