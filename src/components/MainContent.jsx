import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Outlet } from "react-router-dom";

function MainContent() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        role="main"
        tabIndex={-1}
        className="min-h-screen bg-gradient-to-br flex flex-col items-center justify-center p-8"
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
export default MainContent;
