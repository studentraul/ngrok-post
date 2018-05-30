const $loadUsers = document.querySelector(".main__actions button");

/* 
Aqui, geramos as linhas da tabela (tbody > tr) dinamicamente usando template literals
Caso você estranhe a sintaxe que eu usei pra pegar os atributos, sugiro procurar por 
"Object destructuring", já tem bastante artigo em português explicando sobre.
*/
const generateUserRow = ({ email, first_name, last_name, photo, id }) => {
  const fullName = `${first_name} ${last_name}`;
  return `<tr>
    <td>
      ${id}
    </td>
    <td>
      <img class="image is-48x48" src="${photo}" alt="${fullName}">
    </td>
    <td>
      ${fullName}
    </td>
    <td>
      <a href="mailto:${email}">${email}</a>
    </td>
  </tr>
  `;
};

// Método apenas para inserir as linhas geradas na tabela
const appendUsersOnTable = arrayOfUserRows => {
  const $tableBody = document.querySelector(".table tbody");
  const arrayToText = arrayOfUserRows.join("");

  $tableBody.innerHTML = arrayToText;
};

// Carregando os dados da nossa api
const loadUsersFromApi = () => {
  const apiUrl = "http://localhost:3000/api/v1/users"; // Local
  // const apiUrl = "https://255aebda.ngrok.io/api/v1/users";

  fetch(apiUrl) //Usamos o Fetch para fazer a chamada http
    .then(res => res.json()) //precisamos dessa linha para pegar o resultado da api em JSON
    .then(users => users.map(generateUserRow)) //Iteramos pelo array de usuários, gerando um array de Rows baseado nos atributos da resposta
    .then(appendUsersOnTable)
    .catch(console.error);
};

$loadUsers.addEventListener("click", loadUsersFromApi);
