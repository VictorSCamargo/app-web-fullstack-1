import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Login } from '../Login';
import '@testing-library/jest-dom'

describe('Tela de login', () => {

    test("Formulario de login no documento", () => {
        render(<Login/>, {wrapper: BrowserRouter});
        const login_form = screen.getByTestId("login-testid")
        expect(login_form).toBeInTheDocument();
    })

    test("Link para criar conta no documento", () => {
        render(<Login/>, {wrapper: BrowserRouter});
        expect(screen.getByText(/Criar conta/i)).toBeInTheDocument();
    })

    test("Link para mudar senha no documento", () => {
        render(<Login/>, {wrapper: BrowserRouter});
        expect(screen.getByText(/Esqueci minha senha/i)).toBeInTheDocument();
    })

    test("Botao no documento", () => {
        render(<Login/>, {wrapper: BrowserRouter});

        expect(screen.getByRole("button")).toBeInTheDocument();
    })

    test("Alerta ao enviar com algum campo vazio", () => {

        const alertMock = jest.spyOn(window,'alert').mockImplementation(); 

        render(<Login/>, {wrapper: BrowserRouter});

        userEvent.click(screen.getByRole("button"));

        expect(alertMock).toHaveBeenCalledTimes(1);
    })
});