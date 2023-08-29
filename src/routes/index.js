// 0️⃣ IMPORTS
import { Routes, Route } from "react-router-dom";

import NotFound from "../pages/NotFound/NotFound"; // Importe o componente NotFound para a página de erro 404

import SignIn from "../pages/SignIn"; /* Importando a página de login */
import SignUp from "../pages/SignUp"; /* Importando a página de cadastro */
import Dashboard from "../pages/Dashboard"; /* Importando a página de cadastro */
import Profile from "../pages/Profile"; /* Importando a página de cadastro */
import Customers from "../pages/Customers"; /* Importando a página de cadastro */
import ReleaseNotes from "../pages/ReleaseNotes"; /* Importando a página de cadastro */

import Private from "./Private"; /* Importando a verificação "se o usuário esta logado" antes de prosseguir... Tudo o que for rota privada, basta colocar o <Private>em volta da rota</Private> */

// 1️⃣ Functions

/* Rotas do App */
function RoutesApp() {
  return (
    /* Aqui devemos chamar o 'component Routes' que importamos e definir o 'endpoint' para cada rota/ página
        Incialmente, nossa páina inicial será a nossa tela de login */
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/release-notes" element={<ReleaseNotes />} />
      <Route
        path="/dashboard"
        element={
          <Private>
            <Dashboard />{" "}
          </Private>
        }
      />
      <Route
        path="/profile"
        element={
          <Private>
            {" "}
            <Profile />{" "}
          </Private>
        }
      />
      <Route
        path="/customers"
        element={
          <Private>
            {" "}
            <Customers />{" "}
          </Private>
        }
      />
      <Route path="*" element={<NotFound />} />{" "}
      {/* Adicione esta rota para a página 404 */}
    </Routes>
  );
}

// 2️⃣ Export Routes
export default RoutesApp;
