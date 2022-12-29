import React from 'react';
import { PostComponent } from "../../components/PostComponent";

export const PostList = (props) => {

    function criarLinhas() {

        let postsOrdenados = props.posts.slice(0).reverse();

        const linhas_construidas = postsOrdenados.map(postagem => (
            <li key={postagem._id}>
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
                    <li key={"0"}><PostComponent username={"[servidor]"} texto={"Nenhuma postagem encontrada!"}></PostComponent></li>
                )}
            </ul>
        </>
    );
};
