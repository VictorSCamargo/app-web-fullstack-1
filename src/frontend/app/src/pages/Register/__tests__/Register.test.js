import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Register } from '../Register';
import '@testing-library/jest-dom'
import { FetchMethods } from '../../../hooks/FetchMethods/FetchMethods';
import { AlertMessages } from '../../../utils/AlertMessages';
import { SucessMessages } from '../../../utils/SucessMessages';

describe('Componente Register', () => {

    describe("Elementos no documento", () => {
        test("Link para login no documento", () => {
            render(<Register/>, {wrapper: BrowserRouter});

            const linkIrParaLogin = screen.getByRole(
                "link", {name: "Acessar Com Nome de Usuario e Senha" }
                );

            expect(linkIrParaLogin).toBeInTheDocument();
        })
    
        test("Input de username no documento", () => {
            render(<Register/>, {wrapper: BrowserRouter});
            const usernameInput = screen.getByTestId("usernameInput");
    
            expect(usernameInput).toBeInTheDocument();
        })
    
        test("Input de password no documento", () => {
            render(<Register/>, {wrapper: BrowserRouter});
            const passwordInput = screen.getByTestId("passwordInput");
    
            expect(passwordInput).toBeInTheDocument();
        })
    
        test("Input de confirm password no documento", () => {
            render(<Register/>, {wrapper: BrowserRouter});
            const confirmpasswordInput = screen.getByTestId("confirmpasswordInput");
    
            expect(confirmpasswordInput).toBeInTheDocument();
        })
    
        test("Botao no documento", () => {
            render(<Register/>, {wrapper: BrowserRouter});
            const enviarButton = screen.getByRole("button");
    
            expect(enviarButton).toBeInTheDocument();
        })
    })

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

        test("Alerta de senhas não baterem", () => {
            render(<Register/>, {wrapper: BrowserRouter});
    
            const usernameInput = screen.getByTestId("usernameInput");
            const passwordInput = screen.getByTestId("passwordInput");
            const confirmpasswordInput = screen.getByTestId("confirmpasswordInput");
            const button = screen.getByRole("button");
    
            userEvent.type(usernameInput, "Victor");
            userEvent.type(passwordInput, "1234");
            userEvent.type(confirmpasswordInput, "1243");
    
            userEvent.click(button);
            expect(
                screen.queryByText(AlertMessages.senhasEstaoDiferentes, {exact: false})
            ).toBeInTheDocument();
        })
    
        test("Alerta ao tentar enviar com algum campo vazio", () => {
            render(<Register/>, {wrapper: BrowserRouter});
    
            const usernameInput = screen.getByTestId("usernameInput");
            const passwordInput = screen.getByTestId("passwordInput");
            const confirmpasswordInput = screen.getByTestId("confirmpasswordInput");
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
            userEvent.type(confirmpasswordInput, "123");
            userEvent.click(button);
            expect(
                screen.getByText(AlertMessages.preenchaTodosOsCampos, {exact: false})
            ).toBeInTheDocument();
    
            userEvent.type(usernameInput, "{selectall}{backspace}");
            userEvent.type(passwordInput, "{selectall}{backspace}");
            userEvent.type(confirmpasswordInput, "{selectall}{backspace}");
            userEvent.click(button);
            expect(
                screen.getByText(AlertMessages.preenchaTodosOsCampos, {exact: false})
            ).toBeInTheDocument();
        })

        test("Alerta ao falhar a comunicacao com servidor", async() => {
            render(<Register/>, {wrapper: BrowserRouter});
    
            const usernameInput = screen.getByTestId("usernameInput");
            const passwordInput = screen.getByTestId("passwordInput");
            const confirmpasswordInput = screen.getByTestId("confirmpasswordInput");
            const button = screen.getByRole("button");
    
            userEvent.type(usernameInput, "Victor");
            userEvent.type(passwordInput, "1234");
            userEvent.type(confirmpasswordInput, "1234");
    
            userEvent.click(button);
            await waitFor(() => expect(
                    screen.getByText(AlertMessages.comunicacaoFalhou, {exact: false})
                ).toBeInTheDocument());
        })
    })

    describe("Simulacão de conta criada com sucesso por meio de fetch", () => {

        const userExemplo = { "username": "GENERICO", "password": "GENERICO" };

        //simula retorno do metodo 'post'
        beforeEach(() => {
            jest.spyOn(FetchMethods, 'post')
                .mockImplementation((url) => {
                    return new Promise((res) => {
                        return setTimeout(() => {
                            const response = {
                                    "ok": true,
                                    "status": 201,
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

        test("Cadastro realizado com sucesso retorna codigo 201 e imprime mensagem de sucesso", async() => {
            render(<Register/>, {wrapper: BrowserRouter});

            const usernameInput = screen.getByTestId("usernameInput");
            const passwordInput = screen.getByTestId("passwordInput");
            const confirmpasswordInput = screen.getByTestId("confirmpasswordInput");
            const button = screen.getByRole("button");

            userEvent.type(usernameInput, "victor");
            userEvent.type(passwordInput, "12345");
            userEvent.type(confirmpasswordInput, "12345");
            userEvent.click(button);

            expect(
                screen.queryByText(AlertMessages.preenchaTodosOsCampos, {exact: false})
            ).toBeNull();

            await waitFor( () => expect(screen.queryByText(/Alerta/i)).toBeNull());
            await waitFor( () => expect(
                    screen.getByText(SucessMessages.contaCriada, {exact: false})
                ).toBeInTheDocument());
        })
    })

    describe("Simulacão de tentar criar conta ja existente por meio de fetch simulado", () => {

        //simula retorno do metodo 'post'
        beforeEach(() => {
            jest.spyOn(FetchMethods, 'post')
                .mockImplementation((url) => {
                    return new Promise((res) => {
                        return setTimeout(() => {
                            const response = {
                                    "ok": true,
                                    "status": 400,
                                    "json": () => Promise.resolve({"message": "mensagem de alerta"})
                                }
                                return res(response);
                        }, 200)
                    })
                });
        });

        afterEach(() => {
            FetchMethods.post.mockRestore();
        });

        test("Enviar dados de usuário já cadastrado retorna codigo diferente de 201 e imprime mensagem de alerta", async() => {
            render(<Register/>, {wrapper: BrowserRouter});

            const usernameInput = screen.getByTestId("usernameInput");
            const passwordInput = screen.getByTestId("passwordInput");
            const confirmpasswordInput = screen.getByTestId("confirmpasswordInput");
            const button = screen.getByRole("button");

            userEvent.type(usernameInput, "victor");
            userEvent.type(passwordInput, "12345");
            userEvent.type(confirmpasswordInput, "12345");
            userEvent.click(button);

            expect(
                screen.queryByText(AlertMessages.preenchaTodosOsCampos, {exact: false})
            ).toBeNull();

            await waitFor( () => expect(screen.queryByText(/Sucesso/i)).toBeNull());
            await waitFor( () => expect(
                screen.getByText(/Alerta/i, {exact: false})
                ).toBeInTheDocument());
        })
    });
});