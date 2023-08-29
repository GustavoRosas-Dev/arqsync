# ArqSync - Automatização de Preenchimento de Documentos de Arquitetura

> Este repositório está atualmente disponibilizado de forma pública para fins de estudo enquanto o projeto ainda está em fase de desenvolvimento. Sinta-se à vontade para fazer o download, criar sua cópia ou clonar o repositório para explorar o seu conteúdo. No entanto, por favor, tenha em mente que o projeto ainda não foi finalizado.

Automatize e agilize o processo de preenchimento de documentos de arquitetura com a aplicação web <b>ArqSync</b>. Uma ferramenta moderna e eficiente para arquitetos e profissionais da construção civil.

## Características Principais

- **Automatização de Processos:** Elimine a necessidade de inserir repetidamente as mesmas informações em diferentes documentos. Com o <b>ArqSync</b>, insira os dados uma vez e deixe o software preencher automaticamente vários tipos de documentos.
- **Interface Intuitiva:** A interface de usuário moderna e intuitiva torna a interação com o <b>ArqSync</b> fácil e eficaz, reduzindo erros e melhorando a produtividade.
- **Integração com o Firebase:** Utilize o Firebase para autenticação de usuários, armazenamento de dados e autenticação. Mantenha seus dados seguros e acessíveis.
- **Armazenamento Flexível:** O <b>ArqSync</b> oferece suporte ao armazenamento local e de sessão, garantindo uma experiência fluida para os usuários.

## Status do Projeto

O projeto <b>ArqSync</b> está atualmente em fase de desenvolvimento e é considerado um protótipo funcional. A interface do usuário foi criada, e a integração com o Firebase foi implementada para autenticação e armazenamento. Espero, em breve, ter tempo e adicionar mais funcionalidades ao projeto.

### GIF Demonstrativo

![GIF Demonstrativo](public/images/ArqSync.gif)

### Protótipo

##### ❇ Dashboard

Link: https://www.figma.com/file/5Xb2uaYKV9FlcJGlC4MtSy/Dashboard-ArqSync?type=design&node-id=0-1&mode=design&t=FtYezkLRBv1KYe3Z-0

| Figma                                          |
| ---------------------------------------------- |
| ![Imagem 1](public/images/FIGMA%20Dashboard.png) |

### Capturas de Tela

##### ❇ Páginas públicas (4 telas)

| Login                                          | Cadastro                                          | Notas                                                 | 404                              |
| ---------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------- | -------------------------------- |
| ![Imagem 1](public/images/Tela%20de%20login.png) | ![Imagem 2](public/images/Tela%20de%20cadastro.png) | ![Imagem 3](public/images/Notas%20de%20lançamento.png) | ![Imagem 4](public/images/404.png) |

##### ❇ Páginas privadas (3 telas)

| Chamados                                            | Clientes                                            | Perfil                                            |
| --------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------- |
| ![Imagem 1](public/images/Chamados%20(dashboard).png) | ![Imagem 2](public/images/Clientes%20(dashboard).png) | ![Imagem 3](public/images/Perfil%20(dashboard).png) |

## Instalação e Uso

Para utilizar o <b>ArqSync</b>, certifique-se de que você tenha o Node.js e o React instalados em sua máquina. Em seguida, siga as instruções abaixo:

1. Clone este repositório:
   ```
   git clone https://github.com/seu-usuario/arqsync.git
   ```
2. Navegue até o diretório do projeto:
   ```
   cd arqsync
   ```
3. Instale as dependências:
   ```
   npm install
   ```
4. Navegue até a pasta `scr/services`, duplique e renomeie o arquivo `firebaseConfigExample.js` para `firebaseConfig.js`. Mantenha-o na mesma pasta.
5. Preencha as informações sensíveis em `firebaseConfig.js` com as suas próprias credenciais do Firebase.
6. Salve o arquivo e pronto! Seu projeto agora está configurado para se conectar ao Firebase.

Certifique-se de NÃO adicionar o arquivo `firebaseConfig.js` ao controle de versão, pois ele contém informações sensíveis.

7. Inicie o servidor de desenvolvimento:
   ```
   npm start
   ```

## Contribuições

Contribuições são bem-vindas! Se você deseja contribuir para o desenvolvimento do <b>ArqSync</b>, siga estas etapas:

1. Faça um fork deste repositório.
2. Crie um novo branch para a sua funcionalidade:
   ```
   git checkout -b feature/nova-funcionalidade
   ```
3. Faça as alterações necessárias e teste-as.
4. Faça o commit das suas alterações:
   ```
   git commit -m "Adicionada nova funcionalidade"
   ```
5. Envie para o seu repositório fork:
   ```
   git push origin feature/nova-funcionalidade
   ```
6. Abra um `Pull Request` no repositório original.

## Licença

Este projeto é distribuído sob a Licença MIT. Consulte o arquivo `LICENSE` para obter mais detalhes.

## Nota

Espero que, em breve, o <b>ArqSync</b> seja uma ferramenta útil para agilizar o fluxo de trabalho de preenchimento de documentos para profissionais de arquitetura e engenharia.

---

Feito com um bule de ☕ por [Gustavo Rosas](https://github.com/GustavoRosas-Dev).
