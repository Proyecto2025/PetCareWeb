import advices from "../data/advice.js";  
import { useState } from "react";
import Card from "../components/Card.jsx";  
import { Link } from "react-router-dom";
import DropdownTitle from "../components/DropDownTitle.jsx";

function Advice() {
  const [filtro, setFiltro] = useState("Todo");
    const filtrado = advices.filter((advice) => 
        filtro === "Todo" || advice.categoria.toLowerCase() === filtro.toLowerCase()
    );
    
    //Al hacer click se filtre por lo elegido
    const opciones = [
    { label: "Todo", onClick: () => setFiltro("Todo") },
    { label: "Accesorios", onClick: () => setFiltro("Accesorios") },
    { label: "Comida", onClick: () => setFiltro("Comida") },
    { label: "Higiene", onClick: () => setFiltro("Higiene") },
  ];


  return (
    <>
    <DropdownTitle
        title="Consejos"
        options={opciones}
      />
      <section
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch"
      >
        {/*Aqui sería la categoría en vez del tipoAnimal y pongo `/consejo porque o si no, no me encuentra la ruta
          ya que sale /advice/consejo/id pero en app no lo tengo así y por eso no iba
        */}
        {filtrado.map((consejos) => ( 
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