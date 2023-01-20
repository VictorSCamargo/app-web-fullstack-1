import React from 'react';
import { AlertMessages } from '../../utils/AlertMessages';
import { PostComponent } from "./PostComponent";

export const PostList = (props) => {

    function criarLinhas() {

        let key_generica = 0;

        function atribuiKeyGenerica() {
            key_generica += 1;
            return key_generica;
        }

        let postsOrdenados = props.posts.slice(0).reverse();

        const linhas_construidas = postsOrdenados.map(postagem => (
            <li key={ postagem.key }>
                <PostComponent username={postagem.username} texto={postagem.texto} titulo={postagem.titulo}></PostComponent>
            </li>
            )
        )

        return linhas_construidas;
    }

    return (
        <>
            <ul className="post-list">
                {props.posts ? (
                    criarLinhas()
                ) : (
                    <li key={"0"}><PostComponent username={"[servidor]"} texto={AlertMessages.nenhumaPostagem}></PostComponent></li>
                )}
            </ul>
        </>
    );
};
