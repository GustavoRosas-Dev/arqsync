import React, { useState, useEffect } from "react";
import "./banner-upgrade.css"; /* importa o css */
import { Link } from "react-router-dom"; /* Link, do router-dom: para nevagar o usuário para a página promocional */
import { AuthContext } from "../../contexts/auth"; /* Contexto: para saber se deve exibir para o usuário ou não */
import GradientBackground from "../../assets/Functions/Gradient Background/GradientBackground";
import { FcFlashOn } from "react-icons/fc"; /* ÍCONE RAIO, USADO NO BOTÃO "MODO PRO" */

export default function BannerUpgrade() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className={`div-banner-upgrade ${show ? "show" : ""} `}>
      <p>Faça upgrade agora e desbloqueie o&nbsp;</p>
      <Link to="/UserUpgrade">
        <div className="text-modo-turbo">
          Modo Pro&nbsp;
          <FcFlashOn size={14} />
        </div>
      </Link>{" "}
    </div>
  );
}
