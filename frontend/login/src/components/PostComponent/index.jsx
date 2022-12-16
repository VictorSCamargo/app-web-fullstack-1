import './styles.css';

export const PostComponent = (props) => {
    return (
        <div className="container">
                <h1 className='username-text'>
                    {(props.username) ? props.username : "[User nao informado]"}
                </h1>
                <text className='post-text'>
                    {props.texto ? props.texto : "[vazio]"}
                </text>
            </div>
    )
}