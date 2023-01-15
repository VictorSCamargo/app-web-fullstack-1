import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Login } from '../Login';
import '@testing-library/jest-dom'
import { AlertMessages } from '../../../utils/AlertMessages';
import { FetchMethods } from '../../../hooks/FetchMethods/FetchMethods';
import { SucessMessages } from '../../../utils/SucessMessages';

describe('Componente Login', () => {

    describe("Elementos no documento", () => {

        test("Formulario no documento", () => {
            render(<Login/>, {wrapper: BrowserRouter});

            expect(screen.getByTestId("form-login")).toBeInTheDocument();
        })

        test("Link para criar conta no documento", () => {
            render(<Login/>, {wrapper: BrowserRouter});
            expect(screen.getByRole("link", { name: "Criar conta" })).toBeInTheDocument();
        })
    
        test("Link para mudar senha no documento", () => {
            render(<Login/>, {wrapper: BrowserRouter});
            expect(screen.getByRole("link", { name: "Esqueci minha senha" })).toBeInTheDocument();
        })
    
        test("Input de username no documento", () => {
            render(<Login/>, {wrapper: BrowserRouter});
            const input = screen.getByTestId("usernameInput");
    
            expect(input).toBeInTheDocument();
        })
    
        test("Input de password no documento", () => {
            render(<Login/>, {wrapper: BrowserRouter});
            const input = screen.getByTestId("passwordInput");
    
            expect(input).toBeInTheDocument();
        })
    
        test("Botao no documento", () => {
            render(<Login/>, {wrapper: BrowserRouter});
    
            expect(screen.getByRole("button")).toBeInTheDocument();
        })
    });

    describe("Operações com backend não funcional", () => {

        //simula retorno do metodo 'post'
        beforeEach(() => {
            jest.spyOn(FetchMethods, 'post')
                .mockImplementation((url) => {
                    return new Promise((res) => {
                        return setTimeout(() => {
                            //falha na comunicação deve retornar null
                            return res(null);
                        }, 200)
                    })
                });
        });

        afterEach(() => {
            FetchMethods.post.mockRestore();
        });

        test("Alerta ao enviar com algum campo vazio", async() => {
            render(<Login/>, {wrapper: BrowserRouter});
    
            const usernameInput = screen.getByTestId("usernameInput");
            const passwordInput = screen.getByTestId("passwordInput");
            const button = screen.getByRole("button");
    
            userEvent.click(button);
            expect(
                screen.getByText(AlertMessages.preenchaTodosOsCampos, {exact: false})
            ).toBeInTheDocument();
    
            userEvent.type(usernameInput, "Victor");
            userEvent.click(button);
            expect(
                screen.getByText(AlertMessages.preenchaTodosOsCampos, {exact: false})
            ).toBeInTheDocument();
    
            userEvent.type(usernameInput, "{selectall}{backspace}");
            userEvent.type(passwordInput, "123");
            userEvent.click(button);
            expect(
                screen.getByText(AlertMessages.preenchaTodosOsCampos, {exact: false})
            ).toBeInTheDocument();
    
            userEvent.type(usernameInput, "{selectall}{backspace}");
            userEvent.type(passwordInput, "{selectall}{backspace}");
            userEvent.click(button);
            expect(
                screen.getByText(AlertMessages.preenchaTodosOsCampos, {exact: false})
            ).toBeInTheDocument();
    
            userEvent.type(usernameInput, "victorr");
            userEvent.type(passwordInput, "12345");
            userEvent.click(button);

            await waitFor(() => expect(
                screen.queryByText(AlertMessages.preenchaTodosOsCampos, {exact: false})
            ).toBeNull());
        })

        test("Alerta ao falhar a comunicacao com servidor", async() => {
            render(<Login/>, {wrapper: BrowserRouter});
    
            const usernameInput = screen.getByTestId("usernameInput");
            const passwordInput = screen.getByTestId("passwordInput");
            const button = screen.getByRole("button");
    
            userEvent.type(usernameInput, "Victor");
            userEvent.type(passwordInput, "1234");
    
            userEvent.click(button);
            await waitFor(() => expect(
                    screen.getByText(AlertMessages.comunicacaoFalhou, {exact: false})
                ).toBeInTheDocument());
        })
    });

    describe("Simulacão de logar com sucesso por meio de fetch com backend simulado", () => {

        const userExemplo = { "username": "GENERICO", "password": "GENERICO" };

        //simula retorno do metodo 'post'
        beforeEach(() => {
            jest.spyOn(FetchMethods, 'post')
                .mockImplementation((url) => {
                    return new Promise((res) => {
                        return setTimeout(() => {
                            const response = {
                                    "ok": true,
                                    "status": 200,
                                    "json": () => Promise.resolve(userExemplo)
                                }
                                return res(response);
                        }, 200)
                    })
                });
        });

        afterEach(() => {
            FetchMethods.post.mockRestore();
        });

        test("Conta validada pelo backend retorna codigo 200 e imprime mensagem de sucesso", async() => {
            render(<Login/>, {wrapper: BrowserRouter});

            const usernameInput = screen.getByTestId("usernameInput");
            const passwordInput = screen.getByTestId("passwordInput");
            const button = screen.getByRole("button");

            userEvent.type(usernameInput, "victor");
            userEvent.type(passwordInput, "12345");
            userEvent.click(button);

            expect(
                screen.queryByText(AlertMessages.preenchaTodosOsCampos, {exact: false})
            ).toBeNull();

            await waitFor( () => expect(screen.queryByText(/Alerta/i)).toBeNull());
            await waitFor( () => expect(
                    screen.getByText(SucessMessages.autenticou, {exact: false})
                ).toBeInTheDocument());
        })
    })

    describe("Simulacão de falha ao autenticar com fetch com backend simulado", () => {

        //simula retorno do metodo 'post'
        beforeEach(() => {
            jest.spyOn(FetchMethods, 'post')
                .mockImplementation((url) => {
                    return new Promise((res) => {
                        return setTimeout(() => {
                            const response = {
                                    "ok": true,
                                    "status": 400,
                                    "json": () => Promise.resolve({message: "senha errada"})
                                }
                                return res(response);
                        }, 200)
                    })
                });
        });

        afterEach(() => {
            FetchMethods.post.mockRestore();
        });

        test("Resposta do backend com codigo diferente de 200 imprime mensagem de alerta", async() => {
            render(<Login/>, {wrapper: BrowserRouter});

            const usernameInput = screen.getByTestId("usernameInput");
            const passwordInput = screen.getByTestId("passwordInput");
            const button = screen.getByRole("button");

            userEvent.type(usernameInput, "victor");
            userEvent.type(passwordInput, "12345");
            userEvent.click(button);

            expect(
                screen.queryByText(AlertMessages.preenchaTodosOsCampos, {exact: false})
            ).toBeNull();

            await waitFor( () => expect(screen.queryByText(/Sucesso/i)).toBeNull());
            await waitFor( () => expect(
                    screen.getByText(/Alerta/i, {exact: false})
                ).toBeInTheDocument());
        })
    })
});