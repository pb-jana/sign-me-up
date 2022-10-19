import React, { useState } from "react"
import "./signin.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: "",
    })


    const handleChange = e => {
        // console.log(e.target)
        const { name, value } =e.target
        setUser({
            ...user, 
            [name]: value
        })
    }

    const signin = () => {
        axios.post("http://localhost:9002/signin", user)
        .then (res => alert(res.data.message))
    }


    return (
        <div className = "signin">
            {console.log(user)}
            <h1>Sign In</h1>
            <input type="text" name= "email" value={user.email} placeholder="Enter Your E-mail" onChange={ handleChange }></input>
            <input type="password" name= "password" value={user.password} placeholder="Enter Your Password" onChange={ handleChange }></input>
            <div className="button" onClick ={signin}>SignIn</div>
            <div>New Here ! Create Account Below 👇🏽</div>
            <div className="button" onClick = {() => navigate('/signup')}>SignUp</div>
        </div>
    )
}

export default Signin
