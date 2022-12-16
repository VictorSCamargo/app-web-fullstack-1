import { Link } from "react-router-dom";
import { useState } from "react";
import { LayoutComponents } from "../../components/LayoutComponents"


export const Register = () => {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");

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
          const res = await fetch("http://localhost:3333/users", req);
          
          const dados = await res.json()
          console.log(dados)
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
            type="email"
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
          <span className="focus-input" data-placeholder="Comfirm Password"></span>
        </div>

        <div className="container-login-form-btn">
          <button className="login-form-btn" onClick={criaUsuario}>Login</button>
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