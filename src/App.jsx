import { Routes, Route, Navigate } from "react-router-dom";
import MainContent from "./components/MainContent.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Advice from "./pages/Advice.jsx";
import Post from "./pages/Post.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainContent />}>
          <Route index element={<Home />} />
          <Route path="inicio" element={<Navigate to="/" replace />} />
          <Route path="advice" element={<Advice />} />
          <Route path="post" element={<Post />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<p>La página que buscas no existe</p>} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}
export default App;
