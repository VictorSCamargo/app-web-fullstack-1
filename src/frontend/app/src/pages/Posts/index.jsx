import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LayoutComponents } from "../../components/LayoutComponents";
import { PostList}  from "./postList";

const URL_POSTAGENS = "http://localhost:3333/posts"
//const URL_POSTAGENS = "http://backendweb.victor.sc.vms.ufsc.br:3333/posts"

export const Posts = (props) => {
    const [text, setText] = useState("");
    const [userLogado, setUserLogado] = useState(null);
    const [postagens, setPostagens] = useState(null);

    const location = useLocation()
    const navigate = useNavigate()

    const dataExemplo = [
      { username: "victor", titulo: "Postagem", texto: "Postagem 1" },
      { username: "joao", titulo: "Postagem", texto: "Postagem 2" },
      { username: "Ola", titulo: "Postagem", texto: "Postagem 3" }
    ];

    useEffect(() => {
      verificaUserLogado()

      if(userLogado !== null) {
        getPostagensDoServidor()
      }
    }, []);

    useEffect(() => {
      if(userLogado !== null) {
        getPostagensDoServidor()
      }
    }, [userLogado]);

    function verificaUserLogado() {
      let logado = null

      if(props.userLogado){
        logado = props.userLogado
      }
      try {
        if(location.state.userLogado){
          logado = location.state.userLogado
        }
      }
      catch(e){}

      //essa funcao nao eh instantanea
      setUserLogado(logado)

      if(logado === null) {
        deslogarUsuario()
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

    function deslogarUsuario() {
      setUserLogado(null)
      setTimeout(() => {
        // 👇 Redirects to about page, note the `replace: true`
        navigate('/login', { replace: true });
      }, 3000);
    }

    function geraPaginaSeUserEstiverLogado() {
      if(userLogado !== null) {
        return (
          <div className="post-wrapper">
            <div className="bemvindo-wrapper">
            <h1 className="login-form-title">Bem vindo, {userLogado}!</h1>
            <button className="post-logout-btn" onClick={deslogarUsuario}>Deslogar</button>
            </div>
            <div className="post-input">
              <span className="login-form-title">Faca Uma Postagem!</span>
              <textarea className="text-send" onChange={handleTextChange}></textarea>
              <div className="container-post-send-btn">
                <button className="post-send-btn" onClick={criarPostagem}>Enviar</button>
              </div>
            </div>
            <PostList posts={postagens}/>
          </div>
        );
      }
      else {
        return (
          <div className="post-wrapper">
            <h1 className="login-form-title">Autentique-se!</h1>
          </div>
        )
      }
    }

    return (
      <>
        {geraPaginaSeUserEstiverLogado()}
      </> 
  );
};

//transformar lista em componente 
//
//    <ul>
//{Movies.map(data => (
//  <li key={data.id}> {data.name}</li>
//))}
//</ul>