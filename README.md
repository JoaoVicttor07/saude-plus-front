<h1 align="center" style="font-weight: bold;">Saúde Plus Frontend 💻</h1>

<p align="center">
 <a href="layout">Layout</a> • 
 <a href="#descricao">Descrição</a> • 
 <a href="#funcionalidades">Funcionalidades</a> • 
 <a href="#instalacao">Instalação</a> • 
  <a href="#colab">Colaboradores</a>
</p>

<p align="center">
    <b>Aplicação frontend em React para agendamento e gerenciamento de consultas médicas.</b>
</p>

<p align="center">
     <a href="https://github.com/JoaoVicttor07/saude-plus-front">📱 Visite o Projeto</a>
</p>

<h2 id="layout">🎨 Layout</h2>

<p align="center">
    <img src="./public/imgForm.png" alt="Image Non" width="400px">
    <img src="./public/imgLogin.webp" alt="Image Non" width="400px">
    <img src="./public/imgRg.webp" alt="Image Non" width="400px">
</p>

<h2 id="descricao">📄 Descrição</h2>

Este projeto implementa o frontend do sistema Saúde+, permitindo que pacientes, médicos e gerentes interajam com a API para agendamento, visualização, cancelamento de consultas. O Saúde+ é um sistema que moderniza o agendamento de consultas, eliminando a dependência de filas, telefonemas e anotações manuais.

A plataforma permite que pacientes marquem e cancelem atendimentos de forma rápida, com confirmação imediata por e-mail.

Para os médicos, o sistema centraliza todo o histórico de agendamentos em um painel único, simplificando a gestão da agenda e a comunicação com os pacientes.

Gerentes possuem uma visão completa das operações da clínica, podendo gerenciar usuários e acompanhar o desempenho.

Este projeto foi desenvolvido como parte do trabalho da A3, utilizando React para criar uma interface moderna, responsiva e intuitiva que complementa o backend robusto.

<h2 id="funcionalidades">💻 Funcionalidades</h2>

- Cadastro e Atualização de Perfil: Permite o cadastro de novos pacientes. 
- Autenticação de Usuário: Permite que usuários, médicos e gerente realizem login com e-mail e senha. 
- Agendamento de Consultas: Possibilita o agendamento de consultas por pacientes e administradores, com validação para evitar agendamentos duplicados no mesmo dia para o mesmo médico e paciente. 
- Cancelamento de Consultas: Permite a desmarcação de consultas por usuários e médicos, com notificações por e-mail. 
- Recursos do Gerente: Acesso a relatórios de uso do sistema, gerenciamento de pacientes e médicos vinculados à clínica e controle de remoção de médicos com consultas pendentes. 

<h2 id=instalacao>🚀 Instalação</h2>

Para clonar o repositório e instalar as dependências:

<h3>Pré-requisitos</h3>

- Node.js
- npm ou yarn
- Visual Studio Code (Opcional)
- bash, zsh, fish ou um shell de terminal de sua escolha

<h3>Passo a Passo</h3>

1. Clone o repositório:
   ```bash
   git clone https://github.com/JoaoVicttor07/saude-plus-front
   ```
2. Acesse o projeto e instale as dependências:
   ```bash
   cd Form-Processing-Front
   npm install dos seguintes pacotes
   axios
   date-fns
   dompurify
   form
   jwt-decode
   react
   react-dom
   react-google-recaptcha
   react-hook-form
   react-router-dom
   react-scripts
   recharts
   sockjs-client
   web-vitals
   ```
3. Execute o projeto em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Abra no navegador: O frontend estará disponível em http://localhost:3000.

<h2 id="colab">🤝 Colaboradores</h2>

Os alunos envolvidos em todo o projeto.

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/176524197?v=4" width="100px;" alt="Ryan Pedro Profile Picture"/><br>
        <sub>
          <b>Ryan Pedro</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/157769029?v=4" width="100px;" alt="João Victor Profile Picture"/><br>
        <sub>
          <b>João Victor</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/178051914?v=4" width="100px;" alt="Rafael Souza Profile Picture"/><br>
        <sub>
          <b>Rafael Souza</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/128873783?v=4" width="100px;" alt="Vitorio Profile Picture"/><br>
        <sub>
          <b>Vitorio</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/190994625?v=4" width="100px;" alt="Alexandre Fernandes Profile Picture"/><br>
        <sub>
          <b>Alexandre Fernandes</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

<h2>Licença</h2>
Este projeto está licenciado sob a Licença MIT.
