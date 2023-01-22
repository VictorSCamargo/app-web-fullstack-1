import React from 'react';
import { AlertMessages } from '../../utils/AlertMessages';
import { PostComponent } from "./PostComponent";

type PostListProps = {
    posts: {
        id?: number,
        username: string,
        titulo: string,
        texto: string
    }[]
}

export const PostList = (props: PostListProps) => {

    function criarLinhas() {

        let key_generica = 0;

        function atribuiKeyGenerica() {
            key_generica += 1;
            return key_generica;
        }

        let postsOrdenados = props.posts.slice(0).reverse();

        const linhas_construidas = postsOrdenados.map(postagem => (
            <li key={ postagem.id ? postagem.id : atribuiKeyGenerica() }>
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
                    <li key={"0"}>
                        <PostComponent 
                            username={"[servidor]"}
                            texto={AlertMessages.nenhumaPostagem}
                            titulo={"Mensagem"}
                        />
                    </li>
                )}
            </ul>
        </>
    );
};
