import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LayoutComponents } from "../../components/LayoutComponents"

const URL_REGISTRAR_USUARIO = "http://localhost:3333/users"

export const Register = () => {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");

    const navigate = useNavigate();

    async function criaUsuario(event) {
      event.preventDefault();

      if(password !== confirmpassword) {
        alert("Senhas nao batem")
      }
      else{

        const data_to_send = {
            "username": username,
            "password": password
        };

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
          const res = await fetch(URL_REGISTRAR_USUARIO, req);
          
          const dados = await res.json()
          
          console.log(dados)

          if(res.status !== 200) {
            alert(dados.message)
          }
          else {
            alert("Usuario criado com sucesso")

            setTimeout(() => {
              // 👇 Redirects to about page, note the `replace: true`
              navigate('/login', { replace: true });
            }, 10);
          }
        }
        catch(e){
          console.log("Falha ao comunicar com servidor")
        }
      }
    }

    return (
        <LayoutComponents> 
                  <form className="login-form">
        <span className="login-form-title">Criar Conta</span>
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

        <div className="wrap-input">
          <input
            className={confirmpassword !== "" ? "has-val input" : "input"}
            type="password"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Confirm Password"></span>
        </div>

        <div className="container-login-form-btn">
          <button className="login-form-btn" onClick={criaUsuario}>Cadastrar</button>
        </div>

        <div className="text-center">
          <span className="txt1">Ja possui conta?</span>

          <Link className="txt2" to="/login">
            Acessar Com Nome de Usuario e Senha
          </Link>
        </div>
      </form>
        </LayoutComponents>
    )
}