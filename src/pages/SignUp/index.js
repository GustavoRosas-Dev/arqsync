import "./signup.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import TypeWriter from "../../assets/Functions/Type Writer/typewriter"; /* EFEITO TYPEWRITER */
import GradientBackground from "../../assets/Functions/Gradient Background/GradientBackground"; /* EFEITO GRADIENTE NO BACKGROUND*/
import AnimatedCircles from "../../assets/Functions/Animated Circles/animatedcircles.js"; /* EFEITO BACKGROUND ANIMADO */
import { ToastContainer, toast } from "react-toastify"; /* EFEITO: PopUp's */
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "../../assets/Functions/Animated Spinner/Spinner"; /* EFEITO: SPINNER */

export default function SignUp() {
  const [nome_profissional, setNomeProfissional] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Updated state variable name

  const { signUp, loadingAuth } = useContext(AuthContext);

  /* FUNÇÃO CADASTRO (ASSÍNCRONA) */
  async function handleSignUp(e) {
    e.preventDefault();

    /* Se todos os campos estiverem preenchidos */
    if (nome_profissional !== "" && email !== "" && password !== "") {
      setLoading(true); // Ativa o spinner de carregamento
      await signUp(nome_profissional, email, password);
      setLoading(false); // Desativa o spinner de carregamento
    } else {
      alert("Todos os campos devem ser preenchidos");
    }
  }

  /* VARIÁVEIS */
  const customWords = [
    "produtividade",
    "agilidade",
    "eficácia",
  ]; /* Palavras do texto lateral sob efeito do TypeWriter */
  const customTextColor = "#0079FF";

  return (
    <div className="container-center-signup main-container">
      {/* Comentário: Texto lateral com efeito do TypeWriter */}
      <div className="texto-lateral-signup">
        Tenha mais{" "}
        <b className="typewriter-word">
          <TypeWriter
            words={customWords}
            textColor={customTextColor}
            fontSize="32px"
            fontFamily="NotoSans-Bold"
          />
        </b>{" "}
        em suas atividades diárias.
      </div>

      {/* Comentário: Espaçador entre o texto e o formulário */}
      <div className="espacador-texto" />

      <div className="login">
        {/* Comentário: Área do logo */}
        <div className="logo-area-signup">
          <img src={logo} alt="Logo da ArqSync" />
        </div>
        {/* FORMULÁRIO (campo de login + senha + botão + link) SEMPRE com 'onSubmit' */}
        <form onSubmit={handleSignUp}>
          {/* Comentário: Campo de nome completo */}
          <input
            type="text"
            placeholder="Nome completo"
            value={nome_profissional}
            onChange={(e) => setNomeProfissional(e.target.value)}
          />
          <br />

          {/* Comentário: Campo de email */}
          <input
            type="text"
            placeholder="seuemail@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          {/* Comentário: Campo de senha */}
          <input
            type="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          {/* Comentário: Botão de cadastro com spinner */}
          <Spinner
            loadingAuth={loadingAuth}
            buttonText="Cadastre-se"
            buttonId="btn-cadastre-se"
          />
        </form>
        <div className="line" />
        {/* Comentário: Botão de fazer login */}
        <Link to={"/"}>
          <button id="btn-fazer-login">Fazer login</button>
        </Link>
      </div>

      {/* Comentário: Efeitos animados */}
      <AnimatedCircles />
      <GradientBackground
        colors={[
          [68, 237, 189], // Tom de verde mais claro
          [51, 224, 170],
          [26, 214, 150],
          [13, 212, 139],
          [6, 211, 124],
          [0, 209, 149], // Tom de verde mais escuro
        ]}
        className="container-center-signup" // Seleciona onde é pra usar o gradiente
      />
    </div>
  );
}
