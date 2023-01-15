import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Alterar } from '../Alterar';
import { FetchMethods } from '../../../hooks/FetchMethods/FetchMethods';
import '@testing-library/jest-dom'
import { AlertMessages } from '../../../utils/AlertMessages';
import { SucessMessages } from '../../../utils/SucessMessages';

describe('Componente Alterar', () => {

    describe("Elementos no documento", () => {
    
        test("Formulario no documento", () => {
            render(<Alterar/>, {wrapper: BrowserRouter});

            expect(screen.getByTestId("form-alterar")).toBeInTheDocument();
        })


        test("Link para login no documento", () => {
            render(<Alterar/>, {wrapper: BrowserRouter});
            expect(
                screen.getByRole("link", {name: "Acessar Com Nome de Usuario e Senha" })
            ).toBeInTheDocument();
        })
    
        test("Input de username no documento", () => {
            render(<Alterar/>, {wrapper: BrowserRouter});
            const input = screen.getByTestId("usernameInput");
    
            expect(input).toBeInTheDocument();
        })
    
        test("Input de password no documento", () => {
            render(<Alterar/>, {wrapper: BrowserRouter});
            const input = screen.getByTestId("passwordInput");
    
            expect(input).toBeInTheDocument();
        })
    
        test("Input de confirm password no documento", () => {
            render(<Alterar/>, {wrapper: BrowserRouter});
            const input = screen.getByTestId("confirmpasswordInput");
    
            expect(input).toBeInTheDocument();
        })
    
        test("Botao no documento", () => {
            render(<Alterar/>, {wrapper: BrowserRouter});
    
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

        test("Alerta de senhas não baterem", () => {
            render(<Alterar/>, {wrapper: BrowserRouter});
    
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
    
        test("Alerta ao enviar com algum campo vazio", async() => {
            render(<Alterar/>, {wrapper: BrowserRouter});
    
            const usernameInput = screen.getByTestId("usernameInput");
            const passwordInput = screen.getByTestId("passwordInput");
            const confirmpasswordInput = screen.getByTestId("confirmpasswordInput");
            const button = screen.getByRole("button");
    
            userEvent.click(button);
            expect(
                screen.getByText(AlertMessages.preenchaTodosOsCampos, { exact: false })
            ).toBeInTheDocument();
    
            userEvent.type(usernameInput, "Victor");
            userEvent.click(button);
            expect(
                screen.getByText(AlertMessages.preenchaTodosOsCampos, { exact: false })
            ).toBeInTheDocument();
    
            userEvent.type(usernameInput, "{selectall}{backspace}");
            userEvent.type(passwordInput, "123");
            userEvent.type(confirmpasswordInput, "123");
            userEvent.click(button);
            expect(
                screen.getByText(AlertMessages.preenchaTodosOsCampos, { exact: false })
            ).toBeInTheDocument();
    
            userEvent.type(usernameInput, "{selectall}{backspace}");
            userEvent.type(passwordInput, "{selectall}{backspace}");
            userEvent.type(confirmpasswordInput, "{selectall}{backspace}");
            userEvent.click(button);
            expect(
                screen.getByText(AlertMessages.preenchaTodosOsCampos, { exact: false })
            ).toBeInTheDocument();
    
            userEvent.type(usernameInput, "victorr");
            userEvent.type(passwordInput, "12345");
            userEvent.type(confirmpasswordInput, "12345");
            userEvent.click(button);
            //query explora a DOM e nao lanca excessao caso nao ache
            expect(
                screen.queryByText(AlertMessages.preenchaTodosOsCampos, { exact: false })
            ).toBeNull();
        })

        test("Alerta ao falhar a comunicacao com servidor", async() => {
            render(<Alterar/>, {wrapper: BrowserRouter});
    
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
    });

    describe("Simulacão de alterar senha com backend simulado e resposta codigo 200", () => {

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

        test("Resposta com codigo 200 imprime mensagem de sucesso", async() => {
            render(<Alterar/>, {wrapper: BrowserRouter});

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
                    screen.getByText(SucessMessages.senhaAlterada, {exact: false})
                ).toBeInTheDocument());
        })
    })

    describe("Simulacão de resposta diferente de 200 com fetch e backend simulados", () => {

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

        test("Resposta do fetch com codigo diferente de 200 imprime mensagem de alerta", async() => {
            render(<Alterar/>, {wrapper: BrowserRouter});

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
                screen.getByText(/Alerta/i)
                ).toBeInTheDocument());
        })
    });
});