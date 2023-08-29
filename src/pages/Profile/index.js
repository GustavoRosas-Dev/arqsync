import "./profile.css";
import EspacadorVertical from "../../components/EspacadorVertical";
import {
  useContext,
  useState,
} from "react"; /* Passo 1: Importa o useContext do react que permite usar o contexto */
import { AuthContext } from "../../contexts/auth"; /* Passo 2: Importa nosso AuthContext, storageUser, setUser  */
import Title from "../../components/Title";
import avatar from "../../assets/avatar.png"; /* Importa a foto de perfil padrão */
import { FiUpload } from "react-icons/fi"; /* importa o ícone de upload p/ troca de foto */

/* INICIO - IMPORTS NECESSÁRIOS P/ ATUALIZAR DADOS NO FIREBASE */

import {
  db,
  storage,
} from "../../services/firebaseConnection"; /* importa o serviço que faz a conexão do usuário com o Firebase (DB e STORAGE) */
import {
  doc,
  updateDoc,
} from "firebase/firestore"; /* importa o documento atual + o updateDoc do Firebase */

/* FIM - IMPORTS NECESSÁRIOS P/ ATUALIZAR DADOS NO FIREBASE */

/* IMPORTS TOASTIFY (POPUPS) */
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  /* VARIÁVEIS */

  /* Trazendo os dados do usuário atual */
  const { user, storageUser, setUser } = useContext(AuthContext);

  /* ███ INICIO - SALVE TUDO O QUE QUISER DO USUÁRIO AQUI */

  /* Cria uma useState para saber se usa a foto padrão ou a do usuário */
  const [avatarUrl, setAvatarUrl] = useState(
    user && user.avatarUrl
  ); /* Manda a URL */
  const [imageAvatar, setImageAvatar] =
    useState(null); /* Armazena o arquivo p/ enviar pro Firebase*/

  /* Se houver um usuário salvo no nosso contexto, mostra o nome do usuário e coloca dentro dessa useState */
  const [nome, setNome] = useState(user && user.nome);

  /* Se houver um usuário salvo no nosso contexto, mostra o nome do usuário e coloca dentro dessa useState */
  const [email, setEmail] = useState(user && user.email);

  /* ███ FIM - SALVE TUDO O QUE QUISER DO USUÁRIO AQUI */

  /* FUNÇÕES */

  /*Função -> Manipulador da imagem enviada. Toda vez que a gente muda a imagem, ele manda um evento */
  function handleFile(e) {
    /* return console.log(e.target.files);
    return console.log(e.target.files);*/

    if (e.target.files[0]) {
      const image =
        e.target
          .files[0]; /* Cria uma variável (image) que armazena a primeira foto que o usuário enviar */

      /* Verificar SE o formato da imagem enviado pelo usuário é aceita */
      if (
        image.type.includes("jpeg") ||
        image.type.includes("jpg") ||
        image.type.includes("png")
      ) {
        /* Se a imagem for do tipo aceitável, defina-a como a foto do perfil e envie-a para o Firebase */
        setImageAvatar(image); /* Define a image com a fdoto do perfil */
        setAvatarUrl(
          URL.createObjectURL(image)
        ); /* Cria uma URL a partir da foto para salvar no Firebase */
      } else {
        /* Exibe popup de erro */
        alert("Envie uma imagem PNG, JPEG ou JPG.");
        setImageAvatar(null);
        return;
      }
    }
  }

  /* Função assíncrona -> Manipuladora do evento de enviar formulário, responsável por capturar as informações preenchidas no formulário e, ao clicar em 'Salvar', enviar/atualizar as informações no Firebase */
  async function handleSubmit(e) {
    e.preventDefault(); /* Usado para prevenir o comportamento padrão do evento, que é recarregar a página quando o formulário é enviado. */

    /* Se o usuário NÂO enviou uma foto, a variavel 'imageAvatar' está nula. Sabendo disso, podemos fazer a verificação abaixo... 
    
    ...CENÁRIO 01 - NÃO enviou foto + nome FOI preenchido*/
    if (imageAvatar === null && nome !== "") {
      /* Então, atualize apenas o nome... */
      const docRef = doc(
        db,
        "users",
        user.uid
      ); /* A variável 'docRef' acessa o documento com as informações do usuário atual, através da 'uid' do usuário, no Cloud Firestore 'users' */

      /* ...Então, Chama a função 'updateDoc' para atualizar o documento 'docRef', que se refere às informações do usuário atual... */
      await updateDoc(docRef, {
        /* Aqui informamos o que queremos atualizar... */

        /* No 'CENÁRIO 01', o usuário alterou APENAS O NOME... */
        nome: nome,
      }).then(() => {
        /* QUANDO tudo der certo, queremos, por fim... */

        /* CRIA UM OBJETO DATA */
        let data = {
          ...user /* Pega TODAS AS INFORMAÇÕES do User, do Contexto... */,
          nome: nome /* ...E muda apenas o nome. */,
        };

        /* Atualizar o nome do usuário no bando de dados*/
        setUser(data); /*  */

        /* Atualizar o 'Local Storage' (Application, em DevTools do Chrome) */
        storageUser(data); /*  */

        /* Mudar o auth (contexto do user que está lá dentro) */

        /* Exibe TOASTIFY POPUP de sucesso */
        if (!toast.isActive("success-toast")) {
          // Exibe o popup de sucesso somente SE nenhum popup estiver ativo
          toast.success("Informações atualizadas com sucesso!", {
            toastId: "success-toast", // Identificador único do popup
          });
        }
      });
    }
  }

  /* RETORNO DA FUNÇÃO */
  return (
    <div>
      <Title name="Dados do profissional" className="content" />
      {/* Criando o formulário com as informações do profissional */}
      <div className="container-azul" id="container-azul-form-perfil">
        <form className="container-branco" onSubmit={handleSubmit}>
          {/* Criando label p/ a foto de perfil  */}
          <label className="label-avatar">
            {/* Mascara do input - ÍCONE DE UPLOAD */}
            <span>
              <FiUpload size={24} title="Atualizar" />
            </span>

            {/* FOTO DE PERFIL - NOME DO PROFISSIONAL */}
            <input type="file" accept="image/*" onChange={handleFile} />
            <br />
            {/* verifica SE a variável  'avatarUrl'  é nula e, em seguida, exibe uma imagem padrão ( avatar ) */}
            {avatarUrl === null ? (
              <img src={avatar} alt="Foto de perfil" width={120} height={120} />
            ) : (
              /*  ...Caso NÃO SEJA nula, exiba a imagem correspondente à  avatarUrl. */
              <img
                src={avatarUrl}
                alt="Foto de perfil"
                width={120}
                height={120}
              />
            )}
          </label>

          {/* INICIO - TEXTO + CAMPOS DE INPUT */}
          {/*<label id="titulo">Dados do profissional</label>*/}
          <input
            type="text"
            placeholder="Seu nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input type="email" value={email} disabled={true} />
          <EspacadorVertical />
          <input type="email" value={email} disabled={true} />
          <input type="email" value={email} disabled={true} />
          <input type="email" value={email} disabled={true} />
          <input type="email" value={email} disabled={true} />
          <input type="email" value={email} disabled={true} />
          <input type="email" value={email} disabled={true} />
          <input type="email" value={email} disabled={true} />
          <input type="email" value={email} disabled={true} />
          <input type="email" value={email} disabled={true} />
          <input type="email" value={email} disabled={true} />

          <button type="submit" className="btn-salvar">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
