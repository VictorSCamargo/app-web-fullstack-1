const UserModel = require('../Models/UserModel.js'); 

const criarUserElement = (item) => {
    // conectar no elemento template
    const template = document.getElementById('user-template')

    // clonar template
    const userElement = document.importNode(template.contentEditable, true)

    // preencher os dados do template
    const itens_user = userElement.querySelectorAll('span')

    itens_user[0].innerText = item.username
    itens_user[1].innerText = item.password

    return userElement
}

const carregarUsers = async () => {

    // comunicação com a API
    const response = await fetch('http://localhost:3333/users')
    const dados = await response.json()
    console.log(dados)

    // conectar com a div da aplicação front, criar uma cópia do template e adicionar os dados nele
    dados.forEach(item => {
        const containerUsersElement = document.getElementById('container-users')

        const userElement = criarUserElement(item)

        // adiciono o elemento user ao container de filmes
        containerUsersElement.append(userElement)
    });
}

// criação de um novo user
const novoUser = async () => {
    // conectar com os elementos HTML
    const userUsernameElement = document.getElementById('user-username')
    const userPasswordElement = document.getElementById('user-password')

    // extraindo as propriedades e criando um user
    const user = {
        username: userUsernameElement.value,
        password: userPasswordElement.value,
    }

    const init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }

    // chamar o POST na API
    const response = await fetch('http://localhost:3333/users', init)
    console.log(response)
    const dados = await response.json()

    // adicionar novo filme a listagem
    const containerUsersElement = document.getElementById('container-users')

    const userElement = criarUserElement(dados)

    // adiciono o elemento post ao container de filmes, em primeira posição
    containerUsersElement.prepend(userElement)
}

// atualização de um user
const putUser = async () => {
    // conectar com os elementos HTML
    const userUsernameElement = document.getElementById('user-username')
    const userPasswordElement = document.getElementById('user-password')

    // extraindo as propriedades e criando um user
    const user = {
        //aqui deve ser passado o username já definido, o user só deve poder escrever a senha
        username: userUsernameElement.value,
        password: userPasswordElement.value,
    }

    const init = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }

    // chamar o POST na API
    const response = await fetch('http://localhost:3333/users', init)
    console.log(response)
}



window.onload = () => {
    carregarUsers()

    const btnNovoUser = document.getElementById('btnNovoUser')

    btnNovoUser.onclick = novoUser

    console.log('Iniciado')
}