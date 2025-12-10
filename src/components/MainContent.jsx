import { Outlet } from "react-router-dom";

function MainContent({ titulo }) {
  return (
    <main
      id="main-content"
      role="main"
      tabIndex={-1}
      className="min-h-screen bg-gradient-to-br flex flex-col items-center justify-center p-8"
    >
      {titulo && <h1>{titulo}</h1>}
      <Outlet />
    </main>
  );
}
export default MainContent;
