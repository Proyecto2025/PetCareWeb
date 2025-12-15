import Card from "../components/Card.jsx";  
import posts from "../data/post.js";
import { useState } from "react";

function FiltrarPor() {
    const [filtro, setFiltro] = useState("Todo");
    const filtrado = posts.filter((post) => 
        filtro === "Todo" || post.categoria.toLowerCase() === filtro.toLowerCase()
    );
    
    //Opciones que estan en home, y que al hacer click se filtre por lo elegido
    const opciones = [
    { label: "Todo", onClick: () => setFiltro("Todo") },
    { label: "Adopcion", onClick: () => setFiltro("Adopción") },
    { label: "Ayuda", onClick: () => setFiltro("Ayuda") },
    { label: "Extravio", onClick: () => setFiltro("Extravio") },
  ];

    return (
         filtrado.map((animales) => (
          <Card
              nombreUsuario={animales.nombreUsuario}
              tipoAnimal={animales.tipoAnimal}
              titulo={animales.titulo}
              foto={animales.imagen}
              descripcionCorta={animales.descripcionCorta}
            />
         ))
    );
}
export default FiltrarPor;