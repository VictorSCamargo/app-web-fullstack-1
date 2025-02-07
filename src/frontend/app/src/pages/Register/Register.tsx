import { Link } from "react-router-dom";
import { useState } from "react";
import { FormInputLine, PageContainer, CustomWrapper } from "../../components/layout_components/LayoutComponents"
import { FetchMethods } from "../../hooks/FetchMethods/FetchMethods";
import { BackendPaths } from "../../hooks/BackendPaths/BackendPaths";
import { AlertMessages } from "../../utils/AlertMessages";
import { SucessMessages } from "../../utils/SucessMessages";
import React from "react";

export const Register = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const [alertMessage, setAlertMessage] = useState(AlertMessages.vazio);
  const [sucessMessage, setSucessMessage] = useState("");

  async function criaUsuario(event: { preventDefault: () => void; }) {
    event.preventDefault();

    console.log("criaUsuario...");

    if( (username === "") || (password === "") || (confirmpassword === "") ) {
      console.log(AlertMessages.preenchaTodosOsCampos);
      setAlertMessage(AlertMessages.preenchaTodosOsCampos);
      return;
    }
    if(password !== confirmpassword) {
      console.log(AlertMessages.senhasEstaoDiferentes);
      setAlertMessage(AlertMessages.senhasEstaoDiferentes);
      return;
    }

    setAlertMessage(AlertMessages.vazio);
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

    if(!response) {
      setAlertMessage(AlertMessages.comunicacaoFalhou)
    }
    else {
      const dados = await response.json();
      console.log("Dados da resposta:", dados);

      if( response.status !== 201 ) {
        console.log("Status da resposta diferente de 201:", dados.message);

        if(dados.message) {
          setAlertMessage(dados.message);
        }
        else {
          setAlertMessage(AlertMessages.naoEspecificado);
        }
      }
      else {
        console.log(SucessMessages.contaCriada);
        setSucessMessage(SucessMessages.contaCriada);
      }
    }
  }

  return (
    <PageContainer>
      <CustomWrapper>
        <form className="login-form" onSubmit={criaUsuario} data-testid="form-register">
          <span className="login-form-title">Criar Conta</span>

          <FormInputLine
            inputLabel="Username"
            variableName="usernameInput"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          />

          <FormInputLine
            inputLabel="Password"
            variableName="passwordInput"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            type="password"
          />

          <FormInputLine
            inputLabel="Confirm password"
            variableName="confirmpasswordInput"
            value={confirmpassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmpassword(e.target.value)}
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
              <span className="txt-sucess">Sucesso: {sucessMessage}</span>
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