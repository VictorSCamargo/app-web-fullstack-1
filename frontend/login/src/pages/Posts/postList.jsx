import React from 'react';
import { PostComponent } from "../../components/PostComponent";

export const PostList = (props) => {

    const data = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Victor Wayne" },
        { id: 3, name: "Jane Doe" },
      ];

    function criarLinhas() {
        let linhas_construidas = <li>[Vazio]</li>

        //<li><PostComponent username={postagem.username} texto={postagem.texto}></PostComponent></li>

        if(props.posts) {
            linhas_construidas = props.posts.map(postagem => (
                <li>teste</li>
                )
            )
        }

        return linhas_construidas;
    }

    return (
        <>
            <ul className="post-list">
                <li>Postagens</li>
                {criarLinhas()}
            </ul>
        </>
    );
};
