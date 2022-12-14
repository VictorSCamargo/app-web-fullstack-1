import React,{useState, useEffect} from 'react'

export default function ListPosts(){
    
    const [posts, setPosts]=useState([])

    useEffect(()=>{
        fetch('http://localhost:3333/posts')
            .then((res)=>res.json())
            .then(
                (res)=>{
                    setPosts(res)
                }
            )
        }
    )   

    return(
        <div>
            {posts.map(
                post=> <div key={post.id}>{post.username} - {post.titulo} - {post.texto}</div>
            )}
        </div>
    )
}