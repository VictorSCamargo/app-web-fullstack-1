
const carregarPosts = async () => {

    // comunicação com a API
    const response = await fetch('http://localhost:3333/posts')
    const dados = await response.json()
    console.log(dados)

    // conectar com a div da aplicação front, criar uma cópia do template e adicionar os dados nele
    dados.forEach(item => {

        const containerPostsElement = document.getElementById('container-posts')

        // conectar no elemento template
        const template = document.getElementById('post-template')

        // clonar template
        const postElement = document.importNode(template.contentEditable, true)

        // preencher os dados do template
        const itens_post = postElement.querySelectorAll('span')

        itens_post[0].innerText = item.username
        itens_post[0].innerText = item.titulo
        itens_post[0].innerText = item.texto

        // adiciono o elemento post ao container de filmes
        containerPostsElement.append(postElement)
    });
}

window.onload = () => {
    carregarPosts()
    console.log('Iniciado')
}