// Como configurar este arquivo? Acesse: https://github.com/GustavoRosas-Dev/arqsync

import { initializeApp } from "firebase/app"; /*Importando nosso App + o inicializador*/
import { getAuth } from "firebase/auth"; /* Importando a autenticação */
import { getFirestore } from "firebase/firestore"; /* Importando o banco de dados do firebase + getFirestore para fazer a conexão */
import { getStorage } from "firebase/storage"; /* Importando o storage */

/* 
Configurações do firebase (credenciais de acesso):
- Veja mais aqui (https://console.firebase.google.com/u/0/project/arqsync-firebase/settings/general/web:ODMzN2FhOTctYThkNy00ZTVjLThhNDUtOTFhMGQxNjVmM2Rj?hl=pt-br)
*/
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id",
    measurementId: "your-measurement-id",
  };

/* Inicializando o nosso App */
const firebaseApp = initializeApp(firebaseConfig);

/* Inicializando o Auth */
const auth =
  getAuth(
    firebaseApp
  ); /* E aí, podemos usar o 'auth' para manipular a parte de autenticação */

/* Configuração para ser inicializada com o nosso Firestore */
const db = getFirestore(firebaseApp);

/* Inicializando o Storage */
const storage = getStorage(firebaseApp);

/* Exportar o 'db' p/ conectar com o FireStore  */
export { auth, db, storage };
