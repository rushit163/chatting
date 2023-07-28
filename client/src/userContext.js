import { createContext,useState,useEffect } from "react";
import axios from "axios";
import React from "react";
export const userContext = createContext({});
export function UserContextProvider({children}){
    const [username,setUsername] = useState();
    const [id , setId] = useState();
    useEffect(()=>{
        axios.get('/profile').then(
            (response)=>{
                setUsername(response.data.username);
                setId(response.data.id)
            });
    },[])
    return(
        <userContext.Provider value={{username, setUsername, id, setId}}>
            {children}
        </userContext.Provider>
    )
}

