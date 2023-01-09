import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FormInputLine, PageContainer, CustomWrapper } from "../../components/layout_components/LayoutComponents"
import { FetchMethods } from "../../hooks/FetchMethods/FetchMethods";
import { BackendPaths } from "../../hooks/BackendPaths/BackendPaths";

export const Register = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const [alertMessage, setAlertMessage] = useState("");
  const [sucessMessage, setSucessMessage] = useState("");

  const navigate = useNavigate();

  async function criaUsuario(event) {
    event.preventDefault();

    console.log("criaUsuario...");

    if( (username === "") || (password === "") || (confirmpassword === "") ) {
      console.log("Preencha todos campos");
      setAlertMessage("Preencha todos campos");
      return;
    }
    if(password !== confirmpassword) {
      console.log("Senhas não batem");
      setAlertMessage("Senhas não batem");
      return;
    }

    setAlertMessage("");
    setSucessMessage("");

    const data_to_send = {
        "username": username,
        "password": password
    };
    console.log("Dados de envio:", data_to_send);

    const caminho = BackendPaths.usersUrl;
    console.log("Caminho:", caminho);

    const response = await FetchMethods.post(caminho, data_to_send);
    console.log("Resposta:", response);

    if(response) {
      const dados = await response.json();
      console.log("Dados da resposta:", dados);

      if( response.status !== 201 ) {
        console.log("Status da resposta diferente de 200:", dados.message);
        setAlertMessage(dados.message);
      }
      else {
        console.log("Sucesso. Redirecionando para login...")
        setSucessMessage("Criado com sucesso. Redirecionando para login...")

        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000);
      }
    }
  }

  return (
    <PageContainer>
      <CustomWrapper>
        <form className="login-form" onSubmit={criaUsuario}>
          <span className="login-form-title">Criar Conta</span>

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

          <FormInputLine
            inputLabel="Confirm password"
            variableName="confirmpasswordInput"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            type="password"
          />

          <div className="container-login-form-btn">
            <button className="login-form-btn" type="submit">Cadastrar</button>
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
            <span className="txt1">Ja possui conta?</span>

            <Link className="txt2" to="/login">
              Acessar Com Nome de Usuario e Senha
            </Link>
          </div>
        </form>
      </CustomWrapper>
    </PageContainer>
  )
}