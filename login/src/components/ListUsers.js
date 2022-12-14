import React from 'react'
import axios from 'axios'

export default class ListUsers extends React.Component{
    
    state={
        users: []
    }
    
    componentDidMount(){
        axios.get('http://localhost:3333/users')
            .then(res=>{
                const dadosUser=res.data
                this.setState({users:dadosUser})
            })
    }

    render(){
        return(
            <div>
                {this.state.users.map(
                    user=> <div key={user.id}>{user.username}</div>
                )}
            </div>
        )
    }
}