import React from 'react'

export default function Header(props) {



    const handleLogOut = ()=>{
        props.handleLogOut()
    }

    return (
        <header id="header">
            <h1>Bopify</h1>

            {props.user.token ? 
            <p>Welcome, {props.user.username} | <a href="#header" onClick={handleLogOut}>Logout</a></p>
            :
            <p><a href="/signup">Signup</a> | <a href="/login">Login</a></p>
            
            }
            
        </header>
    )
}
