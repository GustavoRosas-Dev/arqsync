/*   
Ordenação: 0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣🔟  
A fazer: ❤️  
Arrumar: ⚠️  
Concluído: ✅  
*/

// IMPORTS

/* BrowserRouter é o componente principal que fornece a funcionalidade de roteamento para a aplicação React, e o react-router-dom é uma biblioteca que facilita a implementação do roteamento no React, fornecendo os componentes necessários para criar e gerenciar as rotas da aplicação. */
import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes";
import { db } from "./services/firebaseConnection";
import AuthProvider from "./contexts/auth";

import ToastifyPopup from "./assets/Functions/ToastiFy_PopUp/ToastifyPopup"; // Importe o componente ToastifyPopup
import "react-toastify/dist/ReactToastify.css"; /* Pacote necessário para animações: Spinner + PopUp's */


function App() {
  return (
    <BrowserRouter>
      {" "}
      {/* Componente de roteamento do React */}
      <AuthProvider>
        {" "}
        {/* Componente de autenticação personalizado */}
        <ToastifyPopup /> {/* Componente ToastifyPopup para exibir pop-ups */}
        <RoutesApp /> {/* Componente que contém as rotas da aplicação */}
      </AuthProvider>
    </BrowserRouter>
  );
}

// Export App
export default App;
