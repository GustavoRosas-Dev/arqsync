/* AQUI É ONDE FAREMOS TODO O CONTROLE DO NOSSO SISTEMA DE AUTENTICAÇÃO */

/* 
Ordenação: 0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣🔟
A fazer: ❤️
Arrumar: ⚠️
Concluído: ✅
*/

/* 0️⃣ IMPORTS */
import {
  useState,
  createContext,
  useEffect,
} from "react"; /* A função "useState" é usada para adicionar estado a um componente React, a função "createContext" é usada para criar um objeto de contexto que pode ser compartilhado entre componentes e a função "useEffect" é usada para executar efeitos colaterais em um componente React, como buscar dados de uma API ou atualizar o título da página. */
import {
  auth,
  db,
} from "../services/firebaseConnection"; /* 'auth' para fazermos a autenticação + 'db' para acessar/manipular o banco de dados */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"; /* trazendo o método que permite criar um usuário com email e senha (que nós ativamos no firebase quando criamos o App) + o Método de logar com e-mail e senha */
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore"; /* 'doc' para acessar os documentos + 'getDoc' para poder pegar documentos + 'setDoc' para poder criar algum documento/ passar algum dado dentro de algum documento no banco de dados  */

import { useNavigate } from "react-router-dom"; /* Navegar o usuário entre as páginas */

import { toast } from "react-toastify"; /* Necessário p/ EFEITO exibir PopUps/ Alertas personalizados */

/* 1️⃣ VARIÁVEIS */
export const AuthContext = createContext(
  {}
); /* aqui nós criamos a variavel e exportamos ela ao mesmo tempo, para que outros arquivos possam utilizar este contexto */

/* 2️⃣ FUNÇÕES */

/* 2️⃣.1️⃣ (✅) Função que cria o provedor de contexto (AuthProvider)
(que é onde terão os métodos de 'login', 'cadastro' e tudo que for lógica) */
function AuthProvider({ children }) {
  const [user, setUser] = useState(null); /* Informações do state User */
  const [loadingAuth, setloadingAuth] =
    useState(
      false
    ); /* Para controlarmos quando o usuário clicar em cadastrar, caso demore, mostraremos um spin girando */
  const [loading, setLoading] =
    useState(true); /* Cria um useState para controlar o loading */
  const navigate = useNavigate(); /* Cria a variavel de navegação */

  /* Toda vez que nossa aplicação abrir ele vai passar por este useEffect */
  useEffect(() => {
    async function loadUser() {
      /* Busca no LocalStorage pra ver se tem alguma coisa */
      const storageUser = localStorage.getItem("@ticketsPRO");

      if (storageUser) {
        /* Se achar algum Cookie localStorage com informações do usuário */
        setUser(
          JSON.parse(storageUser)
        ); /* Converte os dados do usuário de volta para um objeto  JSON */
        setLoading(false);
      }
      /* Caso NÃO cair no if, muda o setLoading pra falso também */
      setLoading(false);
    }

    loadUser(); /* Executa a função useEffect acima */
  }, []);

  /* 2️⃣.2️⃣ (⚠️) Função de LOGIN assíncrona (pois pode DEMORAR UM POUQUINHO) */
  async function signIn(email, password) {
    setloadingAuth(true);

    /* Loga o usuário */
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid =
          value.user.uid; /* Obtém o UID do usuário que acabou ded logar */

        const docRef = doc(db, "users", uid); /* Aceesando o banco de dados */
        const docSnap = await getDoc(docRef); /* Snap se refere ao retorno */

        /* Montando nosso objeto */
        let data = {
          uid: uid,
          nome: docSnap.data().nome,
          email: value.user.email,
          avatarUrl: docSnap.data().avatarUrl,
        };

        setUser(
          data
        ); /* Configura o usuário atual com os dados obtidos em 'data' */
        storageUser(
          data
        ); /* Envia os dados do usuário atual para o banco de dados (storageUser) */
        setloadingAuth(false);
        toast.success(`Bem vindo(a) de volta!`); /* Exibe um popUp de sucesso */
        navigate("/dashboard"); /* Navega o usuário até a página '/dashboard' */
      }) /* Caso der algum ERRO: */

      .catch((error) => {
        console.log("ERRO:\n", "-> ", error.toString());
        setloadingAuth(false);
        /* Tratamento dos tipos de erros */
        if (error.code === "auth/wrong-password") {
          /* ERRO: Senha incorreta */
          toast.error("Senha incorreta.");
        } else if (error.code === "auth/user-not-found") {
          /* ERRO: Usuário não encontrado */
          toast.error("Usuário não encontrado.");
        } else if (error.code === "auth/invalid-email") {
          /* ERRO: e-mail inválido */
          toast.error("E-mail inválido");
        } else if (error.code === "auth/weak-password") {
          /* ERRO: Senha fraca fornecida. */
          toast.error("A senha deve ter no mínimo 6 caracteres.");
        } else if (error.code === "auth/network-request-failed") {
          /* ERRO: Falta de conexão com a internet */
          toast.error("Erro de conexão. Verifique sua conexão com a internet.");
        } else if (error.code === "auth/user-disabled") {
          /* ERRO: Conta desativada */
          toast.error("Esta conta de usuário foi desativada.");
        } else if (error.code === "auth/operation-not-allowed") {
          /* ERRO: Operação não permitida */
          toast.error(
            "Operação não permitida. Entre em contato com o suporte."
          );
        } else if (error.code === "auth/too-many-requests") {
          /* ERRO: Conta temporariamente bloqueada (muitas tentativas sem sucesso) */
          toast.warning(
            "Sua conta foi temporariamente bloqueada. Redefina a senha ou tente novamente mais tarde."
          );
        } else {
          /* Demais erros */
          toast.error(
            "Ops, algo deu errado! Tente novamente."
          ); /* Exibe um popUp de erro genérico para outros erros de autenticação */
        }
      });
  }

  /* 2️⃣.3️⃣ (✅) Função de CADASTRO assíncrona (pois o cadastro pode demorar um pouco) - novo usuário */
  async function signUp(nome_profissional, email, password) {
    /* Quando o usuário clicar no botão 'Cadastre-se', nós queremos que...
    ...PASSO 01: Passar o 'setloadingAuth' para true.
    OBS: Fazendo isso, nós informamos que agora nós estamos fazendo o cadastro*/
    setloadingAuth(true); /* Para iniciar a anmimação do spinner (carregando) */

    /* PASSO 2: 'await' -> Aguarda a criação do usuário */
    await createUserWithEmailAndPassword(auth, email, password)
      /* '.then' -> Então, faça alguma coisa quando der tudo certo (neste caso, de forma assíncrona, 
        ...vamos abrir uma função anônima,que recebe value ('value' -> São as informações do usuário: 
        ...ID, email...Enfim, tudo o que vem de retorno, quando conclui o cadastro do usuário com sucesso)) */
      .then(async (value) => {
        /* PASSO 3: Acessar o 'db' e Salvar: Nome(uid), Foto de Perfil, etc */
        /* P/ ACESSAR AS INFO. DO USUÁRIO, USE -> let uid = value.user. */
        let uid = value.user.uid; /* Obtém o UID do usuário */

        /* PASSO 4: Cria (no db) uma coleção de users, e dentro cria um documento 'uid' com as informações de cada usuário, ex: "users > user123 > infos user123" */
        await setDoc(doc(db, "users", uid), {
          /* AQUI informamos o que trazer para o banco de dados */
          nome: nome_profissional /* Pega o nome do profissional */,
          avatarUrl:
            null /* Quando cadastra o usuário, ainda não tem foto (por isso, nulo) */,
        })
          /* PASSO 5: Quando cadastrar as informações acima no nosso banco (db), faça... */
          .then(() => {
            /* alert("Cadastrado com sucesso =D"); */
            /* PASSO 6: Criar objeto com as informações do usuário */
            let data = {
              uid: uid,
              nome: nome_profissional,
              email: value.user.email,
              avatarUrl: null,
            };

            /* PASSO 7: Passa as informações armazenadas em data para o 'setUser' ("Configurador de Usuário") */
            setUser(data);

            /* Salva no Local Storage */
            storageUser(data);

            /* O cadastro já terminou? Então... */
            setloadingAuth(
              false
            ); /* PASSO 1: Pausa a animação do spinner (carregando)*/
            navigate(
              "/dashboard"
            ); /* PASSO 2: Define o endpoint para onde o usuário será direcionado após a conclusão do cadastro + Navega o usuário para a pág. '/Dashboard' */

            /* Exibe PopUp de Sucesso (da TostiFy) com o nome do profissional */
            toast.success(`Seja bem-vindo(a), ${nome_profissional}!`, {
              className: "custom-toast-success",
              progressClassName: "custom-toast-progress-bar",
            });
          });
      })
      /* (.catch(error)) CAPTURA O ERRO (caso haja): */
      .catch((error) => {
        console.log(error); /* Mostra qual foi o erro */
        setloadingAuth(false); /* Pausa a animação do spinner (carregando)*/

        if (error.code === "auth/email-already-in-use") {
          toast.error(
            "Este e-mail já está sendo utilizado. Por favor, escolha outro e tente novamente."
          );
          // Outras ações específicas para o erro "auth/email-already-in-use" podem ser adicionadas aqui
        } else if (error.code === "auth/invalid-email") {
          toast.error("E-mail inválido.");
          // Outras ações específicas para o erro "auth/email-already-in-use" podem ser adicionadas aqui
        } else if (error.code === "auth/operation-not-allowed") {
          /* ERRO: Operação não permitida */
          toast.error(
            "Operação não permitida. Entre em contato com o suporte."
          );
        } else if (error.code === "auth/weak-password") {
          /* ERRO: Senha fraca fornecida. */
          toast.error("A senha deve ter no mínimo 6 caracteres.");
        } else {
          toast.error(
            "Ocorreu um erro ao cadastrar o usuário. Por favor, tente novamente."
          );
          // Ações gerais para outros erros podem ser adicionadas aqui
        }
      });

    /* ...PASSO 02: Fazer o cadastro */
  }

  /* 3️⃣ (✅) Função para salvar as informações do usuário em Local Storage (Cookies) */
  function storageUser(data) {
    /* '@ticketsPRO' é o nome da chave que eu escolhi para salvar os dados do usuário */
    localStorage.setItem(
      "@ticketsPRO",
      JSON.stringify(data)
    ); /* No final, passamos o parâmetro 'data', para salvar no LocalStorage */
  }

  /* Função de Logout */
  async function logout() {
    /* Aguarda e desloga o usuário */
    await signOut(auth);

    /* Remove os dados armazenados no LocalStorage (Cookies) */
    localStorage.removeItem("@ticketsPRO");

    /* Limpa a useState User, que armazena as informações do usuário atual  */
    setUser(null);
  }

  return (
    /* Aqui é nosso componente */
    <AuthContext.Provider
      value={{
        signed:
          !!user /* Ao invés de declarar 'false' aqui, colocamos o !!user que converte nossa variavel para boleano,ou seja, ela inicia vazia (como null)... Se tiver alguma coisa nela, ela deixa de ser null e vira true */,
        user,
        signIn /* exporta o método signIn */,
        signUp /* exporta o método signUp */,
        logout /* exporta o método logout */,
        loadingAuth /* exporta o loadingAuth (useSate que estamos controlando) */,
        loading,
        storageUser, /* Exporta a função que salva os dados do usuário em Cookies */
        setUser, /* Exportando a função que permite manipular as informações do usuário */
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* 4️⃣ (✅) Exportando o AuthProvider */
export default AuthProvider;
