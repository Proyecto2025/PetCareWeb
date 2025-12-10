import advices from "../data/advice.js";  
import Card from "../components/Card.jsx";  
import { Link } from "react-router-dom";

function Advice() {
  return (
    <>
      <section
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch"
      >
        {/*Aqui sería la categoría en vez del tipoAnimal y pongo `/consejo porque o si no, no me encuentra la ruta
          ya que sale /advice/consejo/id pero en app no lo tengo así y por eso no iba
        */}
        {advices.map((consejos) => ( 
          <Link
            key={consejos.id}
            to={`/consejo/${consejos.id}`}
            aria-label={`Ver detalles de ${consejos.titulo}`}
          >
            <Card 
            nombreUsuario={consejos.nombreUsuario}
            tipoAnimal={consejos.categoria} 
            titulo={consejos.titulo} 
            foto={consejos.imagen} 
            descripcionCorta = {consejos.descripcionCorta}
            />
            </Link>
        ))}
      </section>
   </>
  );
}
export default Advice;