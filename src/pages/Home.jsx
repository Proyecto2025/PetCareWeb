import GlobalContent from "../components/GlobalContent.jsx";
import posts from "../data/post.js";  
import Card from "../components/Card.jsx";  

function Home() {
  return (
    <GlobalContent titulo="">
      <section
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch"
      >
        {posts.map((animales) => (
            <Card 
            nombreUsuario={animales.nombreUsuario}
            tipoAnimal={animales.tipoAnimal}
            titulo={animales.titulo} 
            foto={animales.imagen} 
            descripcionCorta = {animales.descripcionCorta}
            />
        ))}
      </section>
    </GlobalContent>
  );
}
export default Home;
