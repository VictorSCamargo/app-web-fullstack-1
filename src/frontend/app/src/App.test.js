import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';

describe("Componente App: testes de integração", () => {

    test("Pagina inicial é a de login", () => {
        render(
            <MemoryRouter initialEntries={["/login"]}>
                <AppRoutes/>
            </MemoryRouter>
        );

        expect(screen.getByTestId("form-login")).toBeInTheDocument();
    });

    test("Tentar acessar rota nao registrada retorna para pagina de login", () => {
        render(
            <MemoryRouter initialEntries={["/lalalala"]}>
                <AppRoutes/>
            </MemoryRouter>
        );

        expect(screen.getByTestId("form-login")).toBeInTheDocument();
    });

    describe("Na pagina de login", () => {

        test("Clicar no link 'Criar conta' redireciona para componente Register", () => {
            render(
                <MemoryRouter initialEntries={["/login"]}>
                    <AppRoutes/>
                </MemoryRouter>
            );
    
            const linkCriarConta = screen.getByRole("link", { name: "Criar conta" });
            expect(linkCriarConta).toBeInTheDocument();
    
            userEvent.click(linkCriarConta);
    
            expect(screen.getByTestId("form-register")).toBeInTheDocument();
        });
    
        test("Clicar no link 'Esqueci minha senha' redireciona para componente Register", () => {
            render(
                <MemoryRouter initialEntries={["/login"]}>
                    <AppRoutes/>
                </MemoryRouter>
            );
    
            const linkAlterarSenha = screen.getByRole("link", { name: "Esqueci minha senha" });
            expect(linkAlterarSenha).toBeInTheDocument();
    
            userEvent.click(linkAlterarSenha);
    
            expect(screen.getByTestId("form-alterar")).toBeInTheDocument();
        });
    });

    describe("Na pagina de alterar", () => {

        test("Clicar em 'Acessar Com Nome de Usuario e Senha' retorna para pagina de login", () => {
            render(
                <MemoryRouter initialEntries={["/alterar"]}>
                    <AppRoutes/>
                </MemoryRouter>
            );

            const linkParaLogin = screen.getByRole("link", {name: "Acessar Com Nome de Usuario e Senha" });
            userEvent.click(linkParaLogin);
            
            expect(screen.getByTestId("form-login")).toBeInTheDocument();
        });
    });
});