import "./signup.css"; // importando a folha de estilo da página atual (.css)
import logo from "../../assets/logo.png"; // importando a logo
import { Link } from "react-router-dom"; // Para termos NAVEGAÇÃO temos que importar o 'Link' da função 'react-router-dom'
import { useState, useEffect, useRef, useMemo } from "react"; // Importando a biblioteca useState do React para gerenciar estados em componentes funcionais.

// Tela de cadastro
export default function SignUp() {
  const [nome_profissional, setNomeProfissional] = useState(""); // Armazenando o nome do usuário
  const [email, setEmail] = useState(""); // Armazenando o email do usuário
  const [password, setPassword] = useState(""); // Armazenando a senha do usuário

  /* INICIO - Efeito TypeWriter */
  // Definição dos estados utilizados no componente
  const [currentWord, setCurrentWord] = useState(""); // Estado que armazena a palavra atual exibida
  const [index, setIndex] = useState(0); // Estado que armazena o índice da palavra atual na lista de palavras aleatórias

  // Referências para intervalos e timeouts
  let typeWriterInterval = useRef(null); // Referência para o intervalo usado na função de digitação
  let timerTimeout = useRef(null); // Referência para o timeout usado na função de temporização
  const randomWords = useMemo(
    () => ["produtividade", "agilidade", "eficácia"],
    []
  );

  useEffect(() => {
    // Função responsável por iniciar a digitação
    const startTyping = () => {
      const wordIndex = index % randomWords.length; // Calcula o índice da palavra atual na lista
      const word = randomWords[wordIndex]; // Obtém a palavra atual

      setCurrentWord((prevWord) => {
        if (prevWord === word) {
          // Verifica se a palavra atual já foi completamente digitada
          clearInterval(typeWriterInterval.current); // Interrompe o intervalo de digitação
          timerTimeout.current = setTimeout(() => {
            let timer = setInterval(() => {
              setCurrentWord((prevWord) => {
                const nextWord = prevWord.slice(0, -1); // Remove o último caractere da palavra atual
                if (nextWord === "") {
                  // Verifica se a palavra atual foi completamente apagada
                  clearInterval(timer); // Interrompe o intervalo de apagamento
                  setIndex((prevIndex) => prevIndex + 1); // Atualiza o índice para exibir a próxima palavra
                }
                return nextWord;
              });
            }, 100); // Intervalo entre os caracteres apagados
          }, 1350); // Tempo de espera antes do início do apagamento
          return prevWord;
        }

        const nextWord = prevWord + word[prevWord.length]; // Adiciona o próximo caractere da palavra atual
        return nextWord;
      });
    };

    // Inicia o intervalo de digitação
    typeWriterInterval.current = setInterval(startTyping, 140); // Intervalo entre os caracteres digitados

    // Função de limpeza executada quando o componente é desmontado ou quando as dependências [index, randomWords] mudam
    return () => {
      clearInterval(typeWriterInterval.current); // Limpa o intervalo de digitação
      clearTimeout(timerTimeout.current); // Limpa o timeout de temporização
    };
  }, [index, randomWords]);

  /* FIM - Efeito TypeWriter */

  // INICIO - BG GRADIENTE

  useEffect(() => {
    const colors = [
      [77, 234, 190], // Tom de azul mais claro
      [51, 224, 170],
      [26, 214, 150],
      [13, 212, 139],
      [6, 211, 124],
      [0, 209, 149], // Tom de azul mais escuro
    ];
    let step = 0;
    const gradientSpeed = 0.015; // Velocidade do gradiente (ajuste conforme necessário)
    const container = document.querySelector(".container-center-signup");

    function updateGradient() {
      if (!container) return;

      // Cores utilizadas para o gradiente
      const c0_0 = colors[0];
      const c0_1 = colors[1];
      const c1_0 = colors[2];
      const c1_1 = colors[3];

      const istep = 1 - step;

      // Cálculo das cores intermediárias
      const r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
      const g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
      const b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
      const color1 = `rgb(${r1}, ${g1}, ${b1})`;

      const r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
      const g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
      const b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
      const color2 = `rgb(${r2}, ${g2}, ${b2})`;

      // Definir o gradiente como plano de fundo do container
      container.style.background = `linear-gradient(to right, ${color1}, ${color2})`;

      step += gradientSpeed;
      if (step >= 1) {
        step %= 1;

        // Atualização das cores utilizadas no gradiente
        colors[0] = colors[1];
        colors[2] = colors[3];

        colors[1] =
          colors[
            (1 + Math.floor(1 + Math.random() * (colors.length - 1))) %
              colors.length
          ];
        colors[3] =
          colors[
            (3 + Math.floor(1 + Math.random() * (colors.length - 1))) %
              colors.length
          ];
      }
    }

    const gradientInterval = setInterval(updateGradient, 10);
    return () => clearInterval(gradientInterval);
  }, []);

  // FIM - BG GRADIENTE

  /* FUNÇÕES */

  /* Função enviar formulário */
  function handleSubmit(e) {
    /* Como o formulário recebe valores, temos que passar o 'e' de evento */
    e.preventDefault(); /* para prevenir o comportamento padrão do 'e' em atualizar a página/ tentar enviar os dados para outra página */

    /* Condicional para verificar se TODOS os campos foram preenchidos */
    if (nome_profissional !== "" && email !== "" && password !== "") {
      alert("Realizando cadastro...");
    } else {
      alert("Todos os campos devem ser preenchidos");
    }
  }

  return (
    /* Container-center pra centralizar todos os demais componentes na tela de login */
    <div className="container-center-signup main-container">
      {/* TEXTO LATERAL */}
      <div className="texto-lateral-signup">
        Tenha mais <b className="typewriter-word-signup">{currentWord}</b> em
        suas atividades diárias.
      </div>
      <div className="espacador-texto"></div>

      {/* caixa que centraliza todos os elementos da tela */}
      <div className="signup">
        {/* caixa que organiza os elementos de login, como o logo + os campos de entrada de texto e o botão de login */}
        <div className="logo-area">
          {/* Adicionando a logo */}
          <img src={logo} alt="Logo da ArqSync" />
        </div>
        {/* FORMULÁRIO (campo de login + senha + botão + link) SEMPRE com 'onSubmit' */}
        <form onSubmit={handleSubmit}>
          {/*<h1>Cadastre-se</h1>*/}

          {/* INPUT DO NOME DO PROFISSIONAL */}
          <input
            type="text"
            placeholder="Nome completo"
            value={nome_profissional}
            onChange={(e) => setNomeProfissional(e.target.value)}
            /* O evento onChange é acionado quando o valor do input é alterado. Nesse caso, estamos atualizando o estado do email com o valor digitado no input. */
          />
          <br />

          {/* INPUT DO EMAIL */}
          <input
            type="text"
            placeholder="seuemail@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            /* O evento onChange é acionado quando o valor do input é alterado. Nesse caso, estamos atualizando o estado do email com o valor digitado no input. */
          />
          <br />

          {/* INPUT DA SENHA */}
          <input
            type="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            /* O evento onChange é acionado quando o valor do input é alterado. Nesse caso, estamos atualizando o estado do email com o valor digitado no input. */
          />
          <br />

          {/* BOTÃO DE LOGIN (AÇÃO) */}
          <input type="submit" value="Cadastre-se" id="btn-cadastre-se" />
        </form>
        {/* LINHA DIVISÓRIA */}
        <line />
        {/* BOTÃO CADASTRO NOVO USUÁRIO */}
        <Link to={"/"}>
          <button id="btn-fazer-login">Fazer login</button>
        </Link>
      </div>
    </div>
  );
}
