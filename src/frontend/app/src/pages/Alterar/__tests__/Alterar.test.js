import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Alterar } from '../Alterar';
import '@testing-library/jest-dom'

describe('Componente Alterar', () => {

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
        expect(screen.queryByText(/Senhas não batem/i)).toBeInTheDocument();
    })

    test("Alerta ao enviar com algum campo vazio", async() => {
        render(<Alterar/>, {wrapper: BrowserRouter});

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

        userEvent.type(usernameInput, "victorr");
        userEvent.type(passwordInput, "12345");
        userEvent.type(confirmpasswordInput, "12345");
        userEvent.click(button);
        //query explora a DOM e nao lanca excessao caso nao ache
        expect(screen.queryByText(/Preencha todos campos/i)).toBeNull();
    })
});