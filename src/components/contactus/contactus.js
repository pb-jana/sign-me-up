import React from "react"
import "./contactus.css"

const Contactus = () => {
    return (
        <div className = "contactus">

            <h1>Contact Us</h1>
            <input type="text"  placeholder="Enter Your Name" ></input>
            <input type="number" placeholder="Enter Phone Number" ></input>
            <input type="text"  placeholder="Enter E-mail" ></input>
            <input type="text"  placeholder="Describe Your Query / Problem" ></input>

            <div className="button">SUBMIT</div>
        </div>
    )
}

export default Contactus