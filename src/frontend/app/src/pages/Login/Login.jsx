import { useState, useEffect } from "react";
import { LayoutComponents, CustomWrapper, FormInputLine, PageContainer } from "../../components/LayoutComponents/LayoutComponents";
import { Link, useNavigate } from 'react-router-dom';
import { UserFetchMethods } from "../../components/UserFetchMethods/UserFetchMethods";

const URL_USERS = "http://localhost:3333/users/"

export const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  const userFetchMethods = new UserFetchMethods();

  // async function testarMetodosFetch(event) {
  //   event.preventDefault();

  //   console.log("testarMetodosFetch...")

  //   const data_to_send = {
  //     "username": "TESTE",
  //     "password": "TESTE"
  //   };

  //   console.log("GET")
  //   console.log(await (await UserFetchMethods.get(URL_USERS)).json())

  //   console.log("POST")
  //   console.log(await (await UserFetchMethods.post(URL_USERS, data_to_send)).json())

  //   console.log("DELETE")
  // }

  async function autenticarLogin(event) {
    event.preventDefault();

    console.log("autenticarLogin...")
    
    const data_to_send = {
      "username": username,
      "password": password
    };

    console.log("Dados de login:", data_to_send);

    let response = await UserFetchMethods.post(URL_USERS + "login", data_to_send);

    console.log("Resposta:", response)

    if(response) {
  
      const data_received = await response.json();
      console.log("Dados da resposta:", data_received);

      if (data_received.username) {

        console.log("User logou:", data_received.username);
        console.log("Redirecionando para postagens...");

        setTimeout(() => {
          navigate('/post', { replace: true, state: {"userLogado": data_received.username} });
        }, 500);
      }
      else {
        alert(data_received.message);
      }
    }
  }

  return (
    <>
      <LayoutComponents>
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
          />

          <div className="container-login-form-btn">
            <button className="login-form-btn" type="submit">Login</button>
          </div>

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
      </LayoutComponents>
    </>
  );
};
