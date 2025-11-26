import { useParams, useNavigate } from "react-router-dom";
import Advice from "../data/advice.js";
import Detail from "./Detail.jsx";

function DetailAdvice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const advice = Advice.find((a) => a.id === parseInt(id));

  return <Detail objeto={advice} onBack={() => navigate(-1)} label="categoria" />;
}
export default DetailAdvice;
