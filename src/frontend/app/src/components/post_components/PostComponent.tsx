import React from 'react';
import './styles.css';

type PostComponentProps = {
    username: string,
    titulo: string,
    texto: string
};

export const PostComponent = (props: PostComponentProps) => {
    return (
        <div>
            <h1 className="username-text">
                {props.username} postou "{props.titulo}":
            </h1>
            <p className='post-text'>
                {props.texto}
            </p>
        </div>
    )
};