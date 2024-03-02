import React, { useState, useEffect } from "react";
import axios from "axios"; //for routing to server
import "../App.css"


function LoadMiniLink() {

    const serverLink = `http://localhost:4000`
    const clientLink = `http://localhost:3000/`

    function load() {
        const path = window.location.pathname;

        axios.get(serverLink+path).then((response) => {
            if(response.data.length !== 0){
                console.log("response")
                console.log(response.data)
                console.log(response.data[0].longURL)
                window.location.href=response.data[0].longURL
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    load()

    return (
        <div className="block">
            
        </div>
    )
}

export default LoadMiniLink;