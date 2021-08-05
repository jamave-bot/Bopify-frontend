import React from 'react'

export default function Header(props) {



    const handleLogOut = ()=>{
        props.handleLogOut()
    }

    return (
        <header>
            <h1>Bopify</h1>

            {props.user.token ? 
            <p>Welcome, {props.user.username} | <a href="#" onClick={handleLogOut}>Logout</a></p>
            :
            <p><a href="/signup">Signup</a> | <a href="/login">Login</a></p>
            
            }
            
        </header>
    )
}
