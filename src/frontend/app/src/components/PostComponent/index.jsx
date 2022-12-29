import './styles.css';

export const PostComponent = (props) => {
    return (
        <div>
            <h1 className='username-text'>
                {(props.username) ? props.username : "[User nao informado]"} postou "{(props.titulo ? props.titulo : "[titulo nao informado]")}":
            </h1>
            <p className='post-text'>
                {props.texto ? props.texto : "[vazio]"}
            </p>
        </div>
    )
}