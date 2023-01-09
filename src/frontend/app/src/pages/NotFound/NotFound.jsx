import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export const NotFound = () => {

    const navigate = useNavigate();

    useEffect(() => {
        console.log("Pagina vazia. Redirecionando para login...")

        navigate('/login', { replace: true });
      }, [navigate]);

    return(
        <>
        </>
    )
}
