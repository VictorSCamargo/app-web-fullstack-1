
const criarPostElement = (item) => {
    // conectar no elemento template
    const template = document.getElementById('post-template')

    // clonar template
    const postElement = document.importNode(template.contentEditable, true)

    // preencher os dados do template
    const itens_post = postElement.querySelectorAll('span')

    itens_post[0].innerText = item.username
    itens_post[0].innerText = item.titulo
    itens_post[0].innerText = item.texto

    return postElement
}

const carregarPosts = async () => {

    // comunicação com a API
    const response = await fetch('http://localhost:3333/posts')
    const dados = await response.json()
    console.log(dados)

    // conectar com a div da aplicação front, criar uma cópia do template e adicionar os dados nele
    dados.forEach(item => {
        const containerPostsElement = document.getElementById('container-posts')

        const postElement = criarPostElement(item)

        // adiciono o elemento post ao container de filmes
        containerPostsElement.append(postElement)
    });
}

// criação de um novo post
const novoPost = async () => {
    // conectar com os elementos HTML
    const postUsernameElement = document.getElementById('post-username')
    const postTituloElement = document.getElementById('post-titulo')
    const postTextoElement = document.getElementById('post-texto')

    // extraindo as propriedades e criando um post
    const post = {
        username: postUsernameElement.value,
        titulo: postTituloElement.value,
        texto: postTextoElement.value
    }

    const init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }

    // chamar o POST na API
    const response = await fetch('http://localhost:3333/posts', init)
    console.log(response)
    const dados = await response.json()

    // adicionar novo filme a listagem
    const containerPostsElement = document.getElementById('container-posts')

    const postElement = criarPostElement(dados)

    // adiciono o elemento post ao container de filmes, em primeira posição
    containerPostsElement.prepend(postElement)
}


window.onload = () => {
    carregarPosts()

    const btnNovoPost = document.getElementById('btnNovoPost')

    btnNovoPost.onclick = novoPost

    console.log('Iniciado')
}