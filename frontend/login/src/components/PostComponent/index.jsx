import './styles.css';

export const PostComponent = (props) => {
    return (
        <div className="container">
                <h1 className='username-text'>{props.username}</h1>
                <text className='post-text'>{props.texto}</text>
            </div>
    )
}