import { useContext } from "react"; /* Passo 1: Importa o useContext do react que permite usar o contexto */
import { AuthContext } from "../../contexts/auth"; /* Passo 2: Importa nosso AuthContext */
import Title from "../../components/Title";

export default function Customers() {
  /* VARIÁVEIS */

  /* RETORNO DA FUNÇÃO */
  return (
    <div>
    <Title name="Clientes" className="content" />
    </div>
  );
}
