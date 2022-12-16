import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LayoutComponents } from "../../components/LayoutComponents";
import { useNavigate } from 'react-router-dom';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Posts } from '../Posts/index'

const URL_CHECAR_LOGIN = "http://localhost:3333/users/login"
//const URL_CHECAR_LOGIN = "http://backendweb.victor.sc.vms.ufsc.br:3333/users"

export const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  async function autenticarLogin(event) {
    event.preventDefault();

    let userLogado = null
    
    const data_to_send = {
      "username": username,
      "password": password
    };

    //Faz a requisição para ver se o usuario existe
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
      const res = await fetch(URL_CHECAR_LOGIN, req);

      const dados = await res.json()
      // conferir se dados não é null

      console.log(dados)

      if (dados.username) {
        userLogado = dados.username
        console.log(userLogado)
  
        setTimeout(() => {
          // 👇 Redirects to about page, note the `replace: true`
          navigate('/post', { replace: true, state: {"userLogado": userLogado} });
        }, 1000);
      }
      else {
        alert("Usuario nao encontrado")
      }
    }
    catch(e){
      console.log("Falha ao comunicar com servidor")
    }
  }

  return (
    <>
      <Routes>
          <Route path='/post' element={<Posts userLogado={"Vitao"}/>} />
      </Routes>

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
