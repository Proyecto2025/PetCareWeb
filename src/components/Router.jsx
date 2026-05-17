import { Routes, Route, Navigate } from "react-router-dom";
import MainContent from "../components/MainContent.jsx";
import Home from "../pages/Home.jsx";
import Advice from "../pages/Advice.jsx";
import Profile from "../pages/Profile.jsx";
import DetailAnimal from "../components/DetailAnimal.jsx";
import DetailAdvice from "../components/DetailAdvice.jsx";
import NewPost from "../pages/NewPost.jsx";
import Login from "../pages/Login.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainContent />}>
          <Route index element={<Home />} />
          <Route path="inicio" element={<Navigate to="/" replace />} />

          <Route path="posts" element={<Home />} />
          <Route path="posts/:categoria" element={<Home />} />
  
          <Route path="advice" element={<Advice />} />
          <Route path="advice/:categoria" element={<Advice />} />

          <Route path="newPost" element={<ProtectedRoute><NewPost /></ProtectedRoute>} />
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="animal/:id" element={<DetailAnimal />} />
          <Route path="consejo/:id" element={<DetailAdvice />} />
          <Route path="*" element={<p>La página que buscas no existe</p>} />
        </Route>
        
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
export default Router;
