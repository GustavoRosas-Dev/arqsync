import "./signin.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import TypeWriter from "../../assets/Functions/Type Writer/typewriter"; /* EFEITO */
import GradientBackground from "../../assets/Functions/Gradient Background/GradientBackground"; /* EFEITO */
import AnimatedCircles from "../../assets/Functions/Animated Circles/animatedcircles.js";
import { ToastContainer, toast } from "react-toastify"; /* EFEITO: PopUp's */
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "../../assets/Functions/Animated Spinner/Spinner"; /* EFEITO: Spinner */

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, loadingAuth } = useContext(AuthContext);

  async function handleSignIn(e) {
    e.preventDefault();

    if (email !== "" && password !== "") {
      await signIn(email, password);
    } else {
      alert("Todos os campos devem ser preenchidos");
    }
  }

  /* VARIÁVEIS */
  const customWords = [
    "rápida",
    "versátil",
    "incrível",
  ]; /* Palavras do texto lateral sob efeito do TypeWriter */
  const customTextColor = "#01DFA2";

  return (
    <div className="container-center-signin main-container">
      <div className="texto-lateral-signin">
        Realize tarefas de maneira mais{" "}
        <b className="typewriter-word">
          <TypeWriter
            words={customWords}
            textColor={customTextColor}
            fontSize="32px"
            fontFamily="NotoSans-Bold"
          />
        </b>{" "}
        do que nunca.
      </div>

      <div className="espacador-texto" />

      <div className="login">
        <div className="logo-area-signin">
          <img src={logo} alt="Logo da ArqSync" />
        </div>
        <form onSubmit={handleSignIn}>
          <input
            type="text"
            placeholder="seuemail@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <input
            type="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <Spinner
            loadingAuth={loadingAuth}
            buttonText="Entrar"
            buttonId="btn-entrar"
          />
        </form>
        <div className="line" />
        <Link to={"/register"}>
          <button id="btn-criar-conta-login">Criar uma conta</button>
        </Link>
      </div>

      <AnimatedCircles />
      <GradientBackground
        colors={[
          [107, 178, 255], // Tom de azul mais claro
          [80, 154, 255],
          [54, 131, 255],
          [27, 107, 255],
          [13, 93, 255],
          [0, 121, 255], // Tom de azul mais escuro
        ]}
        className="container-center-signin" // Seleciona onde é pra usar o gradiente
      />
    </div>
  );
}
