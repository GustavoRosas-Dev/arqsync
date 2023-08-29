import "./Private.css";
import { useContext } from "react"; /* Importa o contexto do react */
import { Navigate } from "react-router-dom"; /* Usa o método Navigate. Não é o hook e sim uma navegação em formato de componente que tem dentro da biblioteca do react-router-dom. */
import { AuthContext } from "../contexts/auth"; /* Importa o contexto do auth.js */

import BannerUpgrade from "../components/Banner Upgrade"; /* importei aqui para aplicar o Banner somente nas páginas privadas */
import BannerVersaoArqSync from "../components/BannerVersaoArqSync"; /* importei aqui para aplicar o Banner somente nas páginas privadas */
import Header from "../components/Header"; /* HEADER (LATERAL ESQUERDA) */

/* Fazer uma verificação antes de deixar o usuário prosseguir (apenas se estiver logado) */
export default function Private({ children }) {
  console.log("Acesso privado");

  /* Traz o contexto + o loading do AuthContext */
  const { signed, loading } = useContext(AuthContext);
  console.log(signed); /* retorna false */

  /* Verifica SE o loading é igual a true */
  if (loading) {
    return <div></div>;
  }

  /* Verifica SE NÃO estiver logado */
  if (!signed) {
    /* Redirecionar para a página inicial */
    return <Navigate to="/" />;
  } else {
    return (
      <div>
        {/* CONTAINER se refere ao container da versão DESKTOP-NORMAL */}
        <div className="container">
          <Header className="Header" />
          <div className="BannerEChildren">
            <BannerUpgrade className="BannerUpgrade" />
            <div className="children">{children}</div>
            <BannerVersaoArqSync />
          </div>
        </div>
        {/* CONTAINER-V2 se refere ao container da versãoo mobile (700px) */}
        <div className="container-v2">
          <BannerUpgrade className="BannerUpgrade" />
          <Header className="Header" />
          <div className="children">{children}</div>
          <BannerVersaoArqSync />
        </div>
      </div>
    );
    /* -> significa que estamos deixando o usuário navegar */
  }
}

/*

    Utilização:
    1. importe o componente 'Private' no início de onde você controla as rotas (Routes/index.js)
    
        import Private from "./Private";
    
    2. Todas as rotas privadas simples (apenas para usuários logados) devem ser envoltas no componente <Private>, exemplo, vamos privar a rota até a páfgina dashboard, para que apenas usuários logados possam ter acesso a ela, fazemos assim: 

        <Private><Dashboard></Private>
*/
