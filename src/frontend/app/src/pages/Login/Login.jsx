import { useState, useEffect } from "react";
import { LayoutComponents } from "../../components/LayoutComponents";
import { Link, useNavigate } from 'react-router-dom';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Posts } from '../Posts/Posts'
import { UserFetchMethods } from "../../components/UserFetchMethods/UserFetchMethods";

const URL_CHECAR_LOGIN = "http://localhost:3333/users/login"

export const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  const userFetchMethods = new UserFetchMethods();

  async function autenticarLogin(event) {
    event.preventDefault();

    console.log("autenticarLogin...")
    
    const data_to_send = {
      "username": username,
      "password": password
    };

    console.log("Dados de login:", data_to_send);

    let response = await userFetchMethods.validateLogin(data_to_send);

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
        <form className="login-form">
          <span className="login-form-title">Bem Vindo!</span>
          <div className="wrap-input">
            <input
              className={username !== "" ? "has-val input" : "input"}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span className="focus-input" data-placeholder="Username"></span>
          </div>

          <div className="wrap-input">
            <input
              className={password !== "" ? "has-val input" : "input"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="focus-input" data-placeholder="Password"></span>
          </div>

          <div className="container-login-form-btn">
            <button className="login-form-btn" onClick={autenticarLogin}>Login</button>
          </div>

          <div className="text-center">
            <span className="txt1">Não possui conta?</span>

            <Link className="txt2" to="/register">
              Criar conta.
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
