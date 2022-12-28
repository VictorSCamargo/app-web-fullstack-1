import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { PostList }  from "./postList";
import { FetchMethods } from "../../components/FetchMethods/FetchMethods";

const URL_POSTAGENS = "http://localhost:3333/posts"

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
  
      const response = await FetchMethods.post(URL_POSTAGENS, data_to_send);

      console.log("Resposta:", response)
  
      if(response) { 
        const dados = await response.json()
        console.log("Dados da resposta:", dados);

        getPostagensDoServidor()
      }
    }

    async function getPostagensDoServidor() {

      console.log("getPostagensDoServidor...")

      const response = await FetchMethods.get(URL_POSTAGENS)

      if(response) {
        const dados = await response.json()

        setPostagens(dados.posts);
      }
    }

    return (
      <>
        {userLogado === null ? (
          <div className="post-wrapper">
            <h1 className="login-form-title">Autentique-se para ver as postagens!</h1>
          </div>
        ) : (
          <div className="post-wrapper">

            <div className="bemvindo-wrapper">
              <h1 className="login-form-title">Bem vindo, {userLogado}!</h1>
              <button className="post-logout-btn" onClick={deslogarUsuario}>Deslogar</button>
            </div>

            <div className="post-input">
              <span className="login-form-title">Faça Uma Postagem!</span>
              <textarea className="text-send" onChange={(e) => setText(e.target.value)}></textarea>

              <div className="container-post-send-btn">
                <button className="post-send-btn" onClick={criarPostagem}>Enviar</button>
              </div>

            </div>

            <PostList posts={postagens}/>

          </div>
        )}
      </> 
  );
};
