import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppRouter } from './routes/AppRouter';
import '@testing-library/jest-dom'

// //esboço: melhor nao utilizar.
// describe("Teste geral de autenticacao no sistema com backend verdadeiro", () => {

//     test("Pagina inicial é a de login", () => {
//         render(<AppRouter/>);

//         expect(screen.getByText(/Bem Vindo!/i)).toBeInTheDocument();
//     })

//     test("Criar conta funcional", () => {
//         render(<AppRouter/>);

//         const linkCriarConta = screen.getByRole("link", { name: "Criar conta" });

//         userEvent.click(linkCriarConta);

//         expect(screen.getByText(/Criar Conta/i)).toBeInTheDocument();

//         const usernameInput = screen.getByTestId("usernameInput");
//         const passwordInput = screen.getByTestId("passwordInput");
//         const confirmpasswordInput = screen.getByTestId("confirmpasswordInput");
//         const botaoEnviar = screen.getByRole("button");
        
//         userEvent.type(usernameInput, "ADMIN");
//         userEvent.type(passwordInput, "ADMIN");
//         userEvent.type(confirmpasswordInput, "ADMIN")

//         userEvent.click(botaoEnviar);

//         //aguarda o fetch
//         setTimeout( () => {
//             const mensagemDeSucesso = screen.queryByText(/Criado com sucesso/i);
//             const alertaUsuarioJaExiste = screen.queryByText(/Usuario com esse nome ja existe/i)
            
//             let sucesso = false;
    
//             if(mensagemDeSucesso || alertaUsuarioJaExiste){
//                 sucesso = true;
//             }
    
//             console.log(mensagemDeSucesso);
//             console.log(alertaUsuarioJaExiste);
    
//             expect(sucesso).toBeTruthy()

//         }, 2000);
//     })
// })
