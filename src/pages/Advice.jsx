import GlobalContent from "../components/GlobalContent.jsx";
import advices from "../data/advice.js";  
import Card from "../components/Card.jsx";  

function Advice() {
  return (
    <GlobalContent titulo="">
      <section
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch"
      >
        {/*Aqui sería la categoría en vez del tipoAnimal*/}
        {advices.map((animales) => ( 
            <Card 
            nombreUsuario={animales.nombreUsuario}
            tipoAnimal={animales.categoria} 
            titulo={animales.titulo} 
            foto={animales.imagen} 
            descripcionCorta = {animales.descripcionCorta}
            />
        ))}
      </section>
    </GlobalContent>
  );
}
export default Advice;
