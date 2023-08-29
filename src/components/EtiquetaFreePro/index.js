import React from "react";
import "./EtiquetaFreePro.css";
const EtiquetaFreePro = ({ text }) => {
  const rootStyles = getComputedStyle(document.documentElement);
  const branco = rootStyles.getPropertyValue("--branco");
  const verde = rootStyles.getPropertyValue("--verde");
  const azul = rootStyles.getPropertyValue("--azul");
  const cinza_escuro = rootStyles.getPropertyValue("--cinza-escuro2");
  const preto = rootStyles.getPropertyValue("--bannerUpgrade");
  const corFundo = text === "FREE" ? cinza_escuro : preto;
  const corBorda = text === "FREE" ? "rgba(0,0,0, 0.2)" : "rgba(0, 0, 0, 0.2)";
  const corTexto = text === "FREE" ? "rgba(0,0,0, 0.6)" : branco;
  const estilo = {
    backgroundColor: corFundo,
    borderColor: corBorda,
    color: corTexto,
  };
  return (
    <div className="EtiquetaFreePro" style={estilo}>
      {text}
    </div>
  );
};
export default EtiquetaFreePro;
