import React from 'react';
import { PostComponent } from "../../components/PostComponent";

export const PostList = (props) => {

    function criarLinhas() {
        let linhas_construidas = <li>[Vazio]</li>

        let key_number = 0;

        function atribuiKeyGenerica() {
            key_number += 1;
            return key_number
        }

        if(props.posts) {

            let postsOrdenados = props.posts.slice(0).reverse();

            linhas_construidas = postsOrdenados.map(postagem => (
                <li key={atribuiKeyGenerica()}><PostComponent username={postagem.username} texto={postagem.texto}></PostComponent></li>
                )
            )
        }

        return linhas_construidas;
    }

    return (
        <>
            <ul className="post-list">
                {criarLinhas()}
            </ul>
        </>
    );
};
