let userInput = document.getElementById('user-input');
let chatContainer = document.getElementById('chat-area');
let menus = document.querySelectorAll('.menu');


menus.forEach(function (menu) {
  menu.addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
      sendMessage(event.target.innerText);
    } else {
      console.log("ERRO")
    }
  });
});

userInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    // Impede a quebra de linha padrão
    event.preventDefault();

    // Chama a função para enviar a mensagem para o chat
    sendMessage(userInput.value);

    // Limpa o conteúdo do textarea
    userInput.value = '';

    // Role para o final do chat para mostrar a última mensagem
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
});

function toggleOptions(h3) {
  let menu = h3.nextElementSibling;
  let isOpen = menu.classList.contains('open');

  menus.forEach(function (otherMenu) {
    otherMenu.classList.remove('open');
  });

  if (!isOpen) {
    menu.classList.add('open');
  }
}

function sendMessage(message = null) {
  let userMessage = userInput.value.trim();
  if (message) {
    userMessage = message.trim();
  }

  if (userMessage !== "") {
    let newMessage = document.createElement('div');
    newMessage.className = 'chat-balloon right';
    newMessage.innerHTML = '<p>' + userMessage + '</p>';

    chatContainer.appendChild(newMessage);
    userInput.value = '';
    chatContainer.scrollTop = chatContainer.scrollHeight;

    sendToApi(userMessage);
  }
}

function sendToApi(text) {
  // https://github.com/public-apis/public-apis#animals
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({ text }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })

    .then(response => response.json())
    .then(data => {
      let apiResponse = data.title || 'API response';
      let apiMessage = document.createElement('div');

      apiMessage.className = 'chat-balloon left';
      apiMessage.innerHTML = '<p>' + apiResponse + '</p>';

      chatContainer.appendChild(apiMessage);

      chatContainer.scrollTop = chatContainer.scrollHeight;
    })
    .catch(error => console.error('Erro ao chamar a API:', error));
}