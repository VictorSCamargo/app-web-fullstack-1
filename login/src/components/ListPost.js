import React from 'react'
import axios from 'axios'

export default class ListPosts extends React.Component{
    
    state={
        users: []
    }
    
    componentDidMount(){
        axios.get('http://localhost:3333/posts')
            .then(res=>{
                const dadosPost=res.data
                this.setState({users:dadosPost})
            })
    }

    render(){
        return(
            <div>
                {this.state.posts.map(
                    post=> <div key={post.id}>{post.username} - {post.titulo} - {post.texto}</div>
                )}
            </div>
        )
    }
}