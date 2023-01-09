import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Posts } from '../Posts';
import '@testing-library/jest-dom'

describe('Componente Posts', () => {

    describe("Paginas diferentes se o usuario estiver logado", () => {
        test("Acessar pagina sem prop de usuarioLogado mostra alerta de redirecionamento", () => {
            render(<Posts/>, {wrapper: BrowserRouter});
            expect(screen.getByText(/Autentique-se/i)).toBeInTheDocument();
        })
    
        test("Acessar pagina com prop de usuarioLogado mostra a aplicacao normalmente", () => {
            render(<Posts userLogado={"Victor"}/>, {wrapper: BrowserRouter});
            expect(screen.getByText(/Bem vindo/i)).toBeInTheDocument();
        })
    })

    describe("Com a pagina renderizada e usuario logado", () => {

        describe("Deslogar", () => {
            test("Botao de deslogar no documento", () => {
                render(<Posts userLogado={"Victor"}/>, {wrapper: BrowserRouter});
                expect(screen.getByRole("button", {name: "Deslogar"})).toBeInTheDocument();
            })
    
            test("Clicar em deslogar muda para tela de pedir autenticacao", () => {
                render(<Posts userLogado={"Victor"}/>, {wrapper: BrowserRouter});
    
                const botaoDeslogar = screen.getByRole("button", {name: "Deslogar"});
    
                userEvent.click(botaoDeslogar);
                expect(screen.getByText(/Autentique-se/i)).toBeInTheDocument();
            })
        })

        describe("Cracao de postagem", () => {
            test("Input de titulo no documento", () => {
                render(<Posts userLogado={"Victor"}/>, {wrapper: BrowserRouter});
                const inputTitulo = screen.getByPlaceholderText("postagem");
    
                expect(inputTitulo).toBeInTheDocument();
            })
    
            test("Input de texto no documento", () => {
                render(<Posts userLogado={"Victor"}/>, {wrapper: BrowserRouter});
                const inputTexto = screen.getByPlaceholderText("Fale sobre.");
    
                expect(inputTexto).toBeInTheDocument();
            })
    
            test("Botao de enviar no documento", () => {
                render(<Posts userLogado={"Victor"}/>, {wrapper: BrowserRouter});
                const botaoEnviar = screen.getByRole("button", {name: "Enviar"});
    
                expect(botaoEnviar).toBeInTheDocument();
            })

            test("Enviar sem algum campo preenchido gera alerta", () => {
                render(<Posts userLogado={"Victor"}/>, {wrapper: BrowserRouter});

                const inputTitulo = screen.getByPlaceholderText("postagem");
                const inputTexto = screen.getByPlaceholderText("Fale sobre.");
                const botaoEnviar = screen.getByRole("button", {name: "Enviar"});

                userEvent.click(botaoEnviar);
                expect(screen.getByText(/Preencha todos campos/i)).toBeInTheDocument();
        
                userEvent.type(inputTitulo, "Posts.test");
                userEvent.click(botaoEnviar);
                expect(screen.getByText(/Preencha todos campos/i)).toBeInTheDocument();
        
                userEvent.type(inputTitulo, "{selectall}{backspace}");
                userEvent.type(inputTexto, "texto generico");
                userEvent.click(botaoEnviar);
                expect(screen.getByText(/Preencha todos campos/i)).toBeInTheDocument();
        
                userEvent.type(inputTitulo, "{selectall}{backspace}");
                userEvent.type(inputTexto, "{selectall}{backspace}");
                userEvent.click(botaoEnviar);
                expect(screen.getByText(/Preencha todos campos/i)).toBeInTheDocument();
        
                userEvent.type(inputTitulo, "Posts.test");
                userEvent.type(inputTexto, "texto generico");
                userEvent.click(botaoEnviar);
                //query explora a DOM e nao lanca excessao caso nao ache
                expect(screen.queryByText(/Preencha todos campos/i)).toBeNull();
            })
        })
    })
})