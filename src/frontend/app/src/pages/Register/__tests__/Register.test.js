import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Register } from '../Register';
import '@testing-library/jest-dom'
import { FetchMethods } from '../../../hooks/FetchMethods/FetchMethods';

describe('Componente Register', () => {

    describe("Elementos no documento", () => {
        test("Link para login no documento", () => {
            render(<Register/>, {wrapper: BrowserRouter});
            expect(
                screen.getByRole("link", {name: "Acessar Com Nome de Usuario e Senha" })
            ).toBeInTheDocument();
        })
    
        test("Input de username no documento", () => {
            render(<Register/>, {wrapper: BrowserRouter});
            const input = screen.getByTestId("usernameInput");
    
            expect(input).toBeInTheDocument();
        })
    
        test("Input de password no documento", () => {
            render(<Register/>, {wrapper: BrowserRouter});
            const input = screen.getByTestId("passwordInput");
    
            expect(input).toBeInTheDocument();
        })
    
        test("Input de confirm password no documento", () => {
            render(<Register/>, {wrapper: BrowserRouter});
            const input = screen.getByTestId("confirmpasswordInput");
    
            expect(input).toBeInTheDocument();
        })
    
        test("Botao no documento", () => {
            render(<Register/>, {wrapper: BrowserRouter});
    
            expect(screen.getByRole("button")).toBeInTheDocument();
        })
    })

    describe("Operações com backend não funcional", () => {

        beforeEach(() => {
            jest.spyOn(FetchMethods, 'post')
                .mockImplementation((url) => {
                    return new Promise((res) => {
                        return setTimeout(() => {
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
            expect(screen.queryByText(/Senhas não batem/i)).toBeInTheDocument();
        })
    
        test("Alerta ao tentar enviar com algum campo vazio", () => {
    
            render(<Register/>, {wrapper: BrowserRouter});
    
            const usernameInput = screen.getByTestId("usernameInput");
            const passwordInput = screen.getByTestId("passwordInput");
            const confirmpasswordInput = screen.getByTestId("confirmpasswordInput");
            const button = screen.getByRole("button");
    
            userEvent.click(button);
            expect(screen.getByText(/Preencha todos campos/i)).toBeInTheDocument();
    
            userEvent.type(usernameInput, "Victor");
            userEvent.click(button);
            expect(screen.getByText(/Preencha todos campos/i)).toBeInTheDocument();
    
            userEvent.type(usernameInput, "{selectall}{backspace}");
            userEvent.type(passwordInput, "123");
            userEvent.type(confirmpasswordInput, "123");
            userEvent.click(button);
            expect(screen.getByText(/Preencha todos campos/i)).toBeInTheDocument();
    
            userEvent.type(usernameInput, "{selectall}{backspace}");
            userEvent.type(passwordInput, "{selectall}{backspace}");
            userEvent.type(confirmpasswordInput, "{selectall}{backspace}");
            userEvent.click(button);
            expect(screen.getByText(/Preencha todos campos/i)).toBeInTheDocument();
        })

        test("Alerta ao falhar a comunicacao com servidor", async() => {
            render(<Register/>, {wrapper: BrowserRouter});

            const mensagem = "Alerta";
    
            const usernameInput = screen.getByTestId("usernameInput");
            const passwordInput = screen.getByTestId("passwordInput");
            const confirmpasswordInput = screen.getByTestId("confirmpasswordInput");
            const button = screen.getByRole("button");
    
            userEvent.type(usernameInput, "Victor");
            userEvent.type(passwordInput, "1234");
            userEvent.type(confirmpasswordInput, "1234");
    
            userEvent.click(button);
            await waitFor(() => expect(screen.queryByText(mensagem, {exact: false})).toBeInTheDocument());
        })
    })

    describe("Simulacoes de fetch e interação com backend funcional", () => {

        const userExemplo = { "username": "ADMIN", "password": "ADMIN" };
        let criouUmaVez = false;

        //simula retorno do metodo 'post'
        beforeEach(() => {
            jest.spyOn(FetchMethods, 'post')
                .mockImplementation((url) => {
                    return new Promise((res) => {
                        return setTimeout(() => {

                            let responseData;

                            //para simular cadastro repetido
                            if(criouUmaVez === false) {
                                criouUmaVez = true;
                                responseData = {
                                    "ok": true,
                                    "status": 201,
                                    "json": () => Promise.resolve(userExemplo)
                                }
                            }
                            else {
                                responseData = {
                                    "ok": true,
                                    "status": 400,
                                    "json": () => Promise.resolve({"message": "ja existe!"})
                                }
                            }

                            return res(responseData);
                        }, 200)
                    })
                });
        });

        afterEach(() => {
            FetchMethods.post.mockRestore();
            criouUmaVez = false;
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

            expect(screen.queryByText(/Preencha todos campos/i)).toBeNull();
            await waitFor( () => expect(screen.queryByText(/Sucesso/i)).toBeInTheDocument());
        })

        test("Enviar dados de usuario ja cadastrado retorna codigo diferente de 201 e imprimir mensagem de alerta", async() => {
            render(<Register/>, {wrapper: BrowserRouter});

            console.log(criouUmaVez)

            const usernameInput = screen.getByTestId("usernameInput");
            const passwordInput = screen.getByTestId("passwordInput");
            const confirmpasswordInput = screen.getByTestId("confirmpasswordInput");
            const button = screen.getByRole("button");

            userEvent.type(usernameInput, "victor");
            userEvent.type(passwordInput, "12345");
            userEvent.type(confirmpasswordInput, "12345");
            userEvent.click(button);

            expect(screen.queryByText(/Preencha todos campos/i)).toBeNull();
            await waitFor( () => expect(screen.queryByText(/Sucesso/i)).toBeInTheDocument());

            //simular envio novamente
            userEvent.click(button);

            expect(screen.queryByText(/Preencha todos campos/i)).toBeNull();
            await waitFor( () => expect(screen.getByText(/Alerta/i)).toBeInTheDocument());
        })
    })
});