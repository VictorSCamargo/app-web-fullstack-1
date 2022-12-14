import React,{useState, useEffect} from 'react'

export default function ListUsers(){
    
    const [users, setUsers]=useState([])

    useEffect(()=>{
        fetch('http://localhost:3333/users')
            .then((res)=>res.json())
            .then(
                (res)=>{
                    setUsers(res)
                }
            )
        }
    )   

    return(
        <div>
            {users.map(
                user=> <div key={user.id}>{user.username}</div>
            )}
        </div>
    )
}