import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { PostList }  from "./postList";
import { FetchMethods } from "../../components/FetchMethods/FetchMethods";
import { BackendPaths } from "../../components/BackendPaths/BackendPaths"; 
import "./styles.css"

const postagensExemplo = [
  {"username": "Victor", "titulo": "Ola!", "texto": "texto da postagem..."},
  {"username": "Victor", "titulo": "Ola!", "texto": "texto da postagem..."},
  {"username": "Victor", "titulo": "Ola!", "texto": "texto da postagem..."},
  {"username": "Victor", "titulo": "Ola!", "texto": "texto da postagem..."},
  {"username": "Victor", "titulo": "Ola!", "texto": "texto da postagem..."},
  {"username": "Victor", "titulo": "Ola!", "texto": "texto da postagem..."}
]

export const Posts = (props) => {
    const [text, setText] = useState("");
    const [userLogado, setUserLogado] = useState(null);
    const [postagens, setPostagens] = useState(null);

    const location = useLocation()
    const navigate = useNavigate()

    const deslogarUsuario = useCallback(() => {
      setUserLogado(null)

      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2000);
    }, [navigate])

    const verificaUserLogado = useCallback(() => {
      let logado = null;

      if(props.userLogado){
        logado = props.userLogado;
      }
      else {
        try {
          if(location.state.userLogado){
            logado = location.state.userLogado;
          }
        }
        catch(e){
          console.log("Nenhum usuario detectado.")
        }
      }

      if (logado) {
        setUserLogado(logado);
        getPostagensDoServidor();
      }
      else{
        deslogarUsuario();
      }

    }, [deslogarUsuario, location.state, props.userLogado])

    useEffect(() => {
      verificaUserLogado()
    }, [verificaUserLogado]);

    async function criarPostagem(event) {
      event.preventDefault();

      console.log("criarPostagem...")

      const data_to_send = {
        "username": userLogado,
        "titulo": `Postagem`,
        "texto": text
      };
      console.log("Dados de envio:", data_to_send);

      const caminho = BackendPaths.postsUrl;
      console.log("Caminho:", caminho);
  
      const response = await FetchMethods.post(caminho, data_to_send);

      console.log("Resposta:", response)
  
      if(!response) {
        alert("Comunicação com backend falhou.")
      }
      else {        
        const dados = await response.json()
        console.log("Dados da resposta:", dados);

        getPostagensDoServidor()
      }
    }

    async function getPostagensDoServidor() {

      console.log("getPostagensDoServidor...")

      const response = await FetchMethods.get(BackendPaths.postsUrl);
      console.log("Resposta:", response);

      if(response) {
        const dados = await response.json()
        console.log("Dados da resposta:", dados);

        if(dados.posts) {
          setPostagens(dados.posts);
        }
        else {
          setPostagens(dados);
        }
        
      }
      else {
        alert("Comunicacao com servidor falhou: aplicando postagens genéricas.");
        setPostagens(postagensExemplo);
      }
    }

    return (
      <>
        {userLogado === null ? (
          <div className="post-page-wrapper">
            <h1 className="post-user-title">Autentique-se para ver as postagens!</h1>
          </div>
        ) : (
          <div className="post-page-wrapper">

            <div className="post-wrapper">
              <div className="bemvindo-wrapper">
                <h1 className="post-user-title">Bem vindo, {userLogado}!</h1>
                <button className="post-logout-btn" onClick={deslogarUsuario}>Deslogar</button>
              </div>
            </div>

            <div className="post-wrapper">
              <div className="post-input">
                <span className="login-form-title">Faça Uma Postagem!</span>
                <textarea className="text-send" onChange={(e) => setText(e.target.value)}></textarea>

                <div className="container-post-send-btn">
                  <button className="post-send-btn" onClick={criarPostagem}>Enviar</button>
                </div>

              </div>

              <PostList posts={postagens}/>

            </div>
          </div>
        )}
      </> 
  );
};
