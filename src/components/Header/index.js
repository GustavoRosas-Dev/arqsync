import "./header.css";
import React, {
  useContext,
  useState,
} from "react"; /* importa o Context do react */
import { AuthContext } from "../../contexts/auth"; /* importar contexto (auth): Para obter o nome do usuário + saber se o usuário atual possui foto de perfil personalizada */
import avatarImg from "../../assets/avatar.png"; /* importa a imagem padrão do usuário (avatar.png) */
import { Link } from "react-router-dom"; /* importar 'Link': para fazer a navegação de páginas */
import { FiLogOut } from "react-icons/fi";
import EtiquetaFreePro from "../EtiquetaFreePro";

export default function Header() {
  /* PASSO 1: Consumir o contexto */

  const { user } = useContext(AuthContext);
  // Agora você pode acessar o nome do usuário a partir da propriedade user
  const nome_profissional = user?.nome;
  const [menuOpen, setMenuOpen] =
    useState(false); /* Dropdown Header Media Query 400px */

  /* Consumindo nosso contexto aqui  */
  const { logout } = useContext(AuthContext);

  /* Criando a função assíncrona handleLogout */
  async function handleLogout() {
    await logout(); /* Que aguarda e faz o logout */
  }

  return (
    /* DIV: Main */
    <div className="sidebar">
      {/* Ícone de Logout no topo, à esquerda */}
      <div id="div-btn-logout-topo">
        <FiLogOut
          className="btn-logout-topo"
          onClick={handleLogout}
          title="Sair"
        />
      </div>
      {/* EtiquetaFreePro ---- A FAZER */}

      <EtiquetaFreePro text="PRO" />
      {/*<EtiquetaFreePro text="Pro" />*/}

      {/* DIV: IMAGEM de capa + Footo de perfil */}
      <div>
        {/* Verifica: SE avatarUrl for igual a null, exibe a foto padrão. Do contrário, exibe a foto do usuário  */}
        <img
          className="img-avatar"
          src={
            user.avatarUrl === null ? avatarImg : user.avatarUrluser.avatarUrl
          }
          alt="Foto de perfil"
        />
      </div>

      {/* TEXTO: identificador do @USERNAME */}
      <div className="text-username">{nome_profissional}</div>

      {/* DIV BOTÕES SIDEBAR PT.1 */}
      {/* LINKS SECUNDÁRIOS  */}
      <Link to="/dashboard" className="-btn-sidebar-primeiro">
        Chamados
      </Link>
      <Link to="/customers" className="-btn-sidebar-ultimo">
        Clientes
      </Link>

      <div className="espacador-sidebar" />

      {/* DIV BOTÕES SIDEBAR PT.2 */}
      {/* LINKS PRINCIPAIS  */}
      <Link to="/profile" className="-btn-sidebar-primeiro">
        Perfil
      </Link>
      <Link to="/dados-cliente" className="-btn-sidebar-meio">
        Cliente
      </Link>
      <Link to="/infos-projeto" className="-btn-sidebar-ultimo">
        Projeto
      </Link>

      {/* LINK PÁGINA AÇÕES (INFERIOR-SIDEBAR) */}
      <Link to="/acoes" className="btn-acoes-sidebar">
        Ações
      </Link>
    </div>
  );
}
