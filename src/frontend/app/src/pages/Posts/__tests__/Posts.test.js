import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Posts } from '../Posts';
import { AlertMessages } from '../../../utils/AlertMessages';
import { FetchMethods } from '../../../hooks/FetchMethods/FetchMethods';
import '@testing-library/jest-dom'

describe('Componente Posts', () => {

    describe("Paginas diferentes se o usuario estiver logado", () => {

        test("Acessar pagina sem prop de usuarioLogado mostra alerta de redirecionamento", () => {
            render(<Posts/>, {wrapper: BrowserRouter});
            expect(screen.getByText(AlertMessages.autentiqueseParaVer, {exact: false})).toBeInTheDocument();
        })
    
        test("Acessar pagina com prop usuarioLogado mostra a aplicacao normalmente", () => {
            render(<Posts userLogado={"Victor"}/>, {wrapper: BrowserRouter});
            expect(screen.getByText(/Bem vindo/i)).toBeInTheDocument();
        })
    })

    describe("Com a pagina renderizada e usuário logado", () => {

        describe("Componentes no documento", () => {

            test("Botao de deslogar no documento", () => {
                render(<Posts userLogado={"Victor"}/>, {wrapper: BrowserRouter});
                expect(screen.getByRole("button", {name: "Deslogar"})).toBeInTheDocument();
            })

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
        });

        describe("Deslogar", () => {

            test("Clicar em deslogar muda para tela de pedir autenticacao", () => {
                render(<Posts userLogado={"Victor"}/>, {wrapper: BrowserRouter});
    
                const botaoDeslogar = screen.getByRole("button", {name: "Deslogar"});
    
                userEvent.click(botaoDeslogar);
                expect(screen.getByText(AlertMessages.autentiqueseParaVer, {exact: false})).toBeInTheDocument();
            })
        })

        describe("Simulação de backend não funcional", () => {

            beforeEach(() => {
                jest.spyOn(FetchMethods, 'get')
                    .mockImplementation((url) => {
                        return new Promise((res) => {
                            return setTimeout(() => {
                                const response = null;
                                    return res(response);
                            }, 200)
                        })
                    });
                
                jest.spyOn(FetchMethods, 'post')
                .mockImplementation((url) => {
                    return new Promise((res) => {
                        return setTimeout(() => {
                            const response = null;
                                return res(response);
                        }, 200)
                    })
                });
            });
    
            afterEach(() => {
                FetchMethods.post.mockRestore();
                FetchMethods.get.mockRestore();
            });

            test("Alerta ao enviar e servidor não estar funcional", async() => {
                render(<Posts userLogado={"Victor"}/>, {wrapper: BrowserRouter});

                const inputTitulo = screen.getByPlaceholderText("postagem");
                const inputTexto = screen.getByPlaceholderText("Fale sobre.");
                const botaoEnviar = screen.getByRole("button", {name: "Enviar"});

                userEvent.type(inputTitulo, "Exemplo");
                userEvent.type(inputTexto, "texto da postagem...");
                userEvent.click(botaoEnviar);

                await waitFor(() => expect(
                        screen.getByText(AlertMessages.comunicacaoFalhou, {exact: false})
                    ).toBeInTheDocument());
            });
        });

        describe("Simulação de backend funcional com postagens", () => {

            const novaPostagemGenerica = {"username": "Victor", "titulo": "Exemplo", "texto": "texto da postagem..."};

            let postagensExemplo;

            beforeEach(() => {

                postagensExemplo = [
                    {"username": "Victor", "titulo": "Postagem1", "texto": "texto da postagem..."},
                    {"username": "Victor", "titulo": "Postagem2", "texto": "texto da postagem..."},
                    {"username": "Victor", "titulo": "Postagem3", "texto": "texto da postagem..."}
                ];

                jest.spyOn(FetchMethods, 'get')
                    .mockImplementation((url) => {
                        return new Promise((res) => {
                            return setTimeout(() => {
                                const response = {
                                        "ok": true,
                                        "status": 200,
                                        "json": () => Promise.resolve(postagensExemplo)
                                    }
                                    return res(response);
                            }, 200)
                        })
                    });
                
                jest.spyOn(FetchMethods, 'post')
                .mockImplementation((url) => {
                    return new Promise((res) => {
                        return setTimeout(() => {
                            const response = {
                                    "ok": true,
                                    "status": 200,
                                    "json": () => Promise.resolve(novaPostagemGenerica)
                                }
                                postagensExemplo.push(novaPostagemGenerica);
                                return res(response);
                        }, 200)
                    })
                });
            });
    
            afterEach(() => {
                FetchMethods.post.mockRestore();
                FetchMethods.get.mockRestore();
            });

            test("Enviar sem algum campo preenchido gera alerta", () => {
                render(<Posts userLogado={"Victor"}/>, {wrapper: BrowserRouter});

                const inputTitulo = screen.getByPlaceholderText("postagem");
                const inputTexto = screen.getByPlaceholderText("Fale sobre.");
                const botaoEnviar = screen.getByRole("button", {name: "Enviar"});

                userEvent.click(botaoEnviar);
                expect(screen.getByText(AlertMessages.preenchaTodosOsCampos, {exact: false})).toBeInTheDocument();
        
                userEvent.type(inputTitulo, "Posts.test");
                userEvent.click(botaoEnviar);
                expect(screen.getByText(AlertMessages.preenchaTodosOsCampos, {exact: false})).toBeInTheDocument();
        
                userEvent.type(inputTitulo, "{selectall}{backspace}");
                userEvent.type(inputTexto, "texto generico");
                userEvent.click(botaoEnviar);
                expect(screen.getByText(AlertMessages.preenchaTodosOsCampos, {exact: false})).toBeInTheDocument();
        
                userEvent.type(inputTitulo, "{selectall}{backspace}");
                userEvent.type(inputTexto, "{selectall}{backspace}");
                userEvent.click(botaoEnviar);
                expect(screen.getByText(AlertMessages.preenchaTodosOsCampos, {exact: false})).toBeInTheDocument();
        
                userEvent.type(inputTitulo, "Posts.test");
                userEvent.type(inputTexto, "texto generico");
                userEvent.click(botaoEnviar);
                //query explora a DOM e nao lanca excessao caso nao ache
                expect(screen.queryByText(AlertMessages.preenchaTodosOsCampos, {exact: false})).toBeNull();
            })

            test("Pagina ao renderizar carrega postagens do servidor", async() => {
                render(<Posts userLogado={"Victor"}/>, {wrapper: BrowserRouter});

                function timeout(ms) {
                    return new Promise(resolve => setTimeout(resolve, ms));
                }
                
                //espera comunicacao inicial da pagina com o servidor
                await timeout(500);

                expect(screen.getByText(/Postagem1/i)).toBeInTheDocument();
                expect(screen.getByText(/Postagem2/i)).toBeInTheDocument();
                expect(screen.getByText(/Postagem3/i)).toBeInTheDocument();
            });

            test("Postagem criada com sucesso carrega postagens do servidor e a ultima criada", async() => {
                render(<Posts userLogado={"Victor"}/>, {wrapper: BrowserRouter});

                const inputTitulo = screen.getByPlaceholderText("postagem");
                const inputTexto = screen.getByPlaceholderText("Fale sobre.");
                const botaoEnviar = screen.getByRole("button", {name: "Enviar"});

                userEvent.type(inputTitulo, "Exemplo");
                userEvent.type(inputTexto, "texto da postagem...");
                userEvent.click(botaoEnviar);

                await waitFor(() => expect(
                    screen.getByText(/Victor postou "Exemplo"/i)
                ).toBeInTheDocument());
                expect(screen.getByText(/Postagem1/i)).toBeInTheDocument();
                expect(screen.getByText(/Postagem2/i)).toBeInTheDocument();
                expect(screen.getByText(/Postagem3/i)).toBeInTheDocument();
            });
        })
    })
})