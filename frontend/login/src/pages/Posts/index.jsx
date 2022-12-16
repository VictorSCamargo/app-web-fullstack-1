import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { LayoutComponents } from "../../components/LayoutComponents";
import { PostComponent } from "../../components/PostComponent";
import { PostList}  from "./postList";

const URL_POSTAGENS = "http://localhost:3333/posts"

export const Posts = (props) => {
    const [text, setText] = useState("");
    const [userLogado, setUserLogado] = useState(verificaUserLogado());
    const [postagens, setPostagens] = useState(null);

    const dataExemplo = [
      { username: "victor", titulo: "Postagem", texto: "Postagem 1" },
      { username: "joao", titulo: "Postagem", texto: "Postagem 2" },
      { username: "Ola", titulo: "Postagem", texto: "Postagem 3" }
    ];

    useEffect(() => {
      getPostagensDoServidor()
    }, []);

    function verificaUserLogado() {
      if(props.userLogado){
        return props.userLogado
      }
      else{
        return null
      }
    }

    function handleTextChange(event) {
      setText(event.target.value)
    }

    async function criarPostagem(event) {
      event.preventDefault();

      if(userLogado === null) {
        alert("Realize login antes de fazer postagens!")
        return
      }

      const data_to_send = {
        "username": userLogado,
        "titulo": `Postagem`,
        "texto": text
      };

      console.log(data_to_send)
  
      //ToDo ver como faremos para verificar o login
      const req = {
          method: "POST",
          mode: 'cors',
          cache: "default",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data_to_send)
      };
  
      try {
        const res = await fetch(URL_POSTAGENS, req);
        
        const dados = await res.json()
        console.log(dados)
        getPostagensDoServidor()
      }
      catch(e){
        console.log("Falha ao comunicar com servidor")
      }
    }

    async function getPostagensDoServidor() {
      try {
        const res = await fetch(URL_POSTAGENS)
        const dados = await res.json()

        console.log(dados.posts)

        setPostagens(dados.posts);
      }
      catch(e){
        console.log("Falha ao comunicar com servidor")
      }
    }

    return (
      <div className="post-wrapper">
        <div className="post-input">
        <span className="login-form-title">Faca Um Review!</span>
        <textarea className="text-send" onChange={handleTextChange}></textarea>
        <div className="container-post-send-btn">
          <button className="post-send-btn" onClick={criarPostagem}>Enviar</button>
        </div>
        </div>
          <PostList posts={postagens}/>
        </div>
  );
};

//transformar lista em componente 
//
//    <ul>
//{Movies.map(data => (
//  <li key={data.id}> {data.name}</li>
//))}
//</ul>