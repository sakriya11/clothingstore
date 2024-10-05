import React,{useEffect} from 'react'
import { Component } from 'react'

function Logout() {
    useEffect(()=>{
        localStorage.clear();
        window.location.href = "/male"
    },[])
    return (
        <div>
            
        </div>
    )
    }

export default Logout
