import { useState } from "react";
import { CustomWrapper, FormInputLine, PageContainer } from "../../components/layout_components/LayoutComponents";
import { Link, useNavigate } from 'react-router-dom';
import { FetchMethods } from "../../hooks/FetchMethods/FetchMethods";
import { BackendPaths } from "../../hooks/BackendPaths/BackendPaths";

export const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [alertMessage, setAlertMessage] = useState("");
  const [sucessMessage, setSucessMessage] = useState("");

  const navigate = useNavigate();

  async function autenticarLogin(event) {
    event.preventDefault();

    console.log("autenticarLogin...")

    if( (username === "") || (password === "") ){
      setAlertMessage("Preencha todos campos");
      return;
    }
    setAlertMessage("");
    setSucessMessage("");
    
    const data_to_send = {
      "username": username,
      "password": password
    };
    console.log("Dados de envio:", data_to_send);

    const caminho = BackendPaths.verifyUserUrl;
    console.log("Caminho:", caminho);

    let response = await FetchMethods.post(caminho, data_to_send);
    console.log("Resposta:", response)

    if(!response) {
      alert("Falha ao comunicar com backend: logando com usuário genérico para visualização da página de postagens.");
      navigate('/post', { replace: true, state: {"userLogado": "User Generico"} });
    }
    else {
      const data_received = await response.json();
      console.log("Dados da resposta:", data_received);

      if (data_received.username) {

        console.log("User logou:", data_received.username);
        console.log("Redirecionando para postagens...");

        setSucessMessage("Logado com sucesso. Redirecionando...")

        setTimeout(() => {
          navigate('/post', { replace: true, state: {"userLogado": data_received.username} });
        }, 2000);
      }
      else {
        setAlertMessage(data_received.message);
      }
    }
  }

  return (
    <PageContainer>
      <CustomWrapper>
        <form className="login-form" onSubmit={autenticarLogin}>

          <span className="login-form-title">Bem Vindo!</span>

          <FormInputLine
            inputLabel="Username"
            variableName="usernameInput"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <FormInputLine
            inputLabel="Password"
            variableName="passwordInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />

          <div className="container-login-form-btn">
            <button className="login-form-btn" type="submit">Login</button>
          </div>

          {(alertMessage !== "") ? (
            <div className="text-center">
              <span className="txt-alert">Alerta: {alertMessage}</span>
            </div>
          ) : (
            null
          )}

          {(sucessMessage !== "") ? (
            <div className="text-center">
              <span className="txt-sucess">{sucessMessage}</span>
            </div>
          ) : (
            null
          )}

          <div className="text-center">
            <span className="txt1">Não possui conta?</span>
            <Link className="txt2" to="/register">
              Criar conta
            </Link>
          </div>

          <div className="text-center">
            <Link className="txt2" to="/alterar">
              Esqueci minha senha
            </Link>
          </div>

          </form>
      </CustomWrapper>
    </PageContainer>
  );
};
