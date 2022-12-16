import { Link } from "react-router-dom";
import { useState } from "react";
import { LayoutComponents } from "../../components/LayoutComponents"


export const Alterar = () => {
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");

    async function requisitarAlteracaoDeSenha(event) {
      event.preventDefault();

      


    }

    return (
        <LayoutComponents> 
                  <form className="login-form">
        <span className="login-form-title">Alterar Senha</span>
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
          <button className="login-form-btn">Login</button>
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