import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Login } from '../Login';
import '@testing-library/jest-dom'

describe('Componente Login', () => {

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

    test("Alerta ao enviar com algum campo vazio", async() => {
        render(<Login/>, {wrapper: BrowserRouter});

        const usernameInput = screen.getByTestId("usernameInput");
        const passwordInput = screen.getByTestId("passwordInput");
        const button = screen.getByRole("button");

        userEvent.click(button);
        expect(screen.getByText(/Preencha todos campos/i)).toBeInTheDocument();

        userEvent.type(usernameInput, "Victor");
        userEvent.click(button);
        expect(screen.getByText(/Preencha todos campos/i)).toBeInTheDocument();

        userEvent.type(usernameInput, "{selectall}{backspace}");
        userEvent.type(passwordInput, "123");
        userEvent.click(button);
        expect(screen.getByText(/Preencha todos campos/i)).toBeInTheDocument();

        userEvent.type(usernameInput, "{selectall}{backspace}");
        userEvent.type(passwordInput, "{selectall}{backspace}");
        userEvent.click(button);
        expect(screen.getByText(/Preencha todos campos/i)).toBeInTheDocument();

        userEvent.type(usernameInput, "victorr");
        userEvent.type(passwordInput, "12345");
        userEvent.click(button);
        //query explora a DOM e nao lanca excessao caso nao ache
        expect(screen.queryByText(/Preencha todos campos/i)).toBeNull();
    })
});