import React from 'react'
import "../CSS/SidebarOption.css"
import { loginUrl } from '../spotify';


function SidebarOption({title, Icon}) {
    if (title === "Login to Spotify"){
        return (
            <div class="sidebarOption">
                {Icon && <Icon className="sidebarOptionIcon"/>}
                {Icon ? <a href={loginUrl} className="loginLink"><h4>{title}</h4></a> : <p>{title}</p> }
            </div>
        )
    }else{
        return (
            <div class="sidebarOption">
                {Icon && <Icon className="sidebarOptionIcon"/>}
                {Icon ? <h4>{title}</h4> : <p>{title}</p> }
            </div>
        )
    }
}

export default SidebarOption
