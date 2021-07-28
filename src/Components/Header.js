import React from 'react'
import { useHistory } from 'react-router'

export default function Header(props) {

    const history = useHistory();
    const takeToHome = () =>{
        history.push("/")
    }

    const handleLogOut = ()=>{
        props.handleLogOut()
    }

    return (
        <header>
            <h1 onClick={takeToHome}>Bopify</h1>

            {props.user.token ? 
            <p>Welcome, {props.user.username} | <a href="#" onClick={handleLogOut}>Logout</a></p>
            :
            <p><a href="/signup">Signup</a> | <a href="/login">Login</a></p>
            
            }
            
        </header>
    )
}
