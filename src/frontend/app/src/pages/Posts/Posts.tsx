import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { PostList }  from "../../components/post_components/PostList";
import { FetchMethods } from "../../hooks/FetchMethods/FetchMethods";
import { BackendPaths } from "../../hooks/BackendPaths/BackendPaths"; 
import { AlertMessages } from "../../utils/AlertMessages";
import "./styles.css"
import React from "react";
import { PostObjectType } from "../../types/PostObjectType";

type PostsType = {
  userLogado?: string
}

const postagensExemplo: PostObjectType[] = [
  {"username": "Victor", "titulo": "Ola!", "texto": "texto da postagem..."},
  {"username": "Victor", "titulo": "Ola!", "texto": "texto da postagem..."},
  {"username": "Victor", "titulo": "Ola!", "texto": "texto da postagem..."},
  {"username": "Victor", "titulo": "Ola!", "texto": "texto da postagem..."},
]

export const Posts = (props: PostsType) => {
    const [userLogado, setUserLogado] = useState("");
    const [text, setText] = useState("");
    const [titulo, setTitulo] = useState("");
    const [postagens, setPostagens] = useState<PostObjectType[]>();
  
    const [alertMessage, setAlertMessage] = useState(AlertMessages.vazio);

    const location = useLocation();
    const navigate = useNavigate();

    const deslogarUsuario = useCallback(() => {
      setUserLogado("");

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

    async function criarPostagem(event: { preventDefault: () => void; }) {
      event.preventDefault();

      console.log("criarPostagem...");

      if( (titulo === "") || (text === "") ) {
        setAlertMessage(AlertMessages.preenchaTodosOsCampos);
        return;
      }
      setAlertMessage(AlertMessages.vazio);

      const data_to_send: PostObjectType = {
        "username": userLogado,
        "titulo": titulo,
        "texto": text
      };
      console.log("Dados de envio:", data_to_send);

      const caminho = BackendPaths.postsUrl;
      console.log("Caminho:", caminho);
  
      const response = await FetchMethods.post(caminho, data_to_send);

      console.log("Resposta:", response)
  
      if(!response) {
        setAlertMessage(AlertMessages.comunicacaoFalhou);
      }
      else {        
        const dados = await response.json();
        console.log("Dados da resposta:", dados);

        setText("");
        setTitulo("");

        getPostagensDoServidor();
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
        alert("Comunicacao com servidor falhou: aplicando postagens genéricas");
        setPostagens(postagensExemplo);
      }
    }

    return (
      <>
        {userLogado === "" ? (
          <div className="post-page-wrapper">
            <h1 className="post-user-title">{AlertMessages.autentiqueseParaVer}</h1>
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

                <div className="post-title-input-div">
                  <label className="post-title-input-label" >Título:</label>
                  <input
                    className="post-title-input" 
                    maxLength={30} 
                    onChange={(e) => setTitulo(e.target.value)} 
                    value={titulo}
                    placeholder="postagem"
                    />
                </div>

                <textarea 
                  className="text-send" 
                  onChange={(e) => setText(e.target.value)} 
                  maxLength={250} value={text}
                  placeholder="Fale sobre."
                  />

                <div className="container-post-send-btn">
                  <button className="post-send-btn" onClick={criarPostagem}>Enviar</button>
                </div>

                {(alertMessage !== "") ? (
                  <div className="text-center">
                    <span className="txt-alert">Alerta: {alertMessage}</span>
                  </div>
                ) : (
                  null
                )}

              </div>

              <PostList posts={postagens}/>

            </div>
          </div>
        )}
      </> 
  );
};
