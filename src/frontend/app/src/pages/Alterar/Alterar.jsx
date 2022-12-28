import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FormInputLine, PageContainer, CustomWrapper } from "../../components/LayoutComponents/LayoutComponents";
import { FetchMethods } from "../../components/FetchMethods/FetchMethods";

const URL_ALTERAR_SENHA = "http://localhost:3333/users/update-password"

export const Alterar = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const navigate = useNavigate()

  async function requisitarAlteracaoDeSenha(event) {
    event.preventDefault();

    console.log("requisitarAlteracaoDeSenha...")

    if(password !== confirmpassword) {
      console.log("Senhas não batem.")
      alert("Senhas não batem.")
    }
    else{
      const data_to_send = {
          "username": username,
          "password": password
      };

      console.log("Dados de envio:", data_to_send)

      const response = await FetchMethods.post(URL_ALTERAR_SENHA, data_to_send);

      console.log("Resposta:", response)

      if(response){
        const dados = await response.json()
        
        console.log("Dados de resposta:", dados)

        if(response.status !== 200) {
          console.log("Status da resposta diferente de 200:", dados.message)
          alert(dados.message)
        }
        else {
          alert("Senha alterada com sucesso.")

          console.log("Sucesso. Redirecinando para login...")

          navigate('/login', { replace: true });
        }
      }
    }
  }

  return (
    <PageContainer>
      <CustomWrapper>
        <form className="login-form" onSubmit={requisitarAlteracaoDeSenha}>
          <span className="login-form-title">Alterar Senha</span>

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
            <button className="login-form-btn" type="submit">
              Confirmar
            </button>
          </div>

          <div className="text-center">
            <span className="txt1">Ja possui conta?</span>

            <Link className="txt2" to="/login">
              Acessar Com Nome de Usuario e Senha
            </Link>
          </div>
        </form>
      </CustomWrapper>
    </PageContainer>
  );
};
