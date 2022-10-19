import React, { useState }from "react";
import "./signup.css"
import axios from 'axios';

import { useNavigate } from 'react-router-dom';


const Signup = () => {


    const navigate = useNavigate();


    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
    })


    const handleChange = e => {
        // console.log(e.target)
        const { name, value } =e.target
        setUser({
            ...user, 
            [name]: value
        })
    }


    const signup = () => {
        const { name, email, password, reEnterPassword } = user
        if( name && email && password && (password === reEnterPassword)){

            // alert("Posted !!")
            axios.post("http://localhost:9002/signup", user)
            .then( res => alert(res))
        }else{
            alert("Invalid Input !!")
        }
    }


    return (
        <div className = "signup">
            {console.log("User", user)}
            <h1>Sign Up</h1>
            <input type="text" name="name" value={user.name} placeholder="Enter Your Name" onChange={ handleChange }></input>
            <input type="text" name="email" value={user.email} placeholder="Enter Your E-mail" onChange={ handleChange }></input>
            <input type="password" name="password" value={user.password} placeholder="Enter Password" onChange={ handleChange }></input>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></input>
            <div className="button" onClick={signup}>SignUp</div>
            <div>Already Registered ! SignIn Below 👇🏽</div>
            <div className="button" onClick = {() => navigate('/signin')}>SignIn</div>
        </div>
    )
}

export default Signup
 