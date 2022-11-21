import express from "express"
import cors from "cors"
import mongoose from "mongoose"


const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/SignMeUpDB",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Database  Connected Successfully !!")
})



// create user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

// model create
const User = new mongoose.model("User", userSchema)



// Routes
// to signing in
app.post("/signin", (req, res)=> {
    // res.send("My API signin")
    const { email, password }=(req.body)

    // email exits of not in the database
    User.findOne({email: email}, (err, user)=>{
        if(user){
            if(password === user.password){
                res.send({message: "Welcome !! You Are Successfully Signed Up !!", user: user})
            }else{
                res.send({message: "Incorrect Password, Try Again !!"})
            }

        }else{
            res.send({message: "New Here !! Kindly Signed Up Before Signing In !!"})
        }

    })
})


// to signing up
app.post("/signup", (req, res)=> {
    // res.send("My API signup")
    const { name, email, password }=(req.body)

    // email exits of not in the database
    User.findOne({email: email}, (err, user)=>{
        if(user){
            res.send({message: "User E-mail ID Already Exists !!"})
        }else{
            const user = new User({
                name,
                email,
                password
            })
            // user data saving
            user.save(err => {
                if(err){
                    res.send(err)
                }else{
                    res.send({message: "User Signed Up Successfully !! Let's Signin !!"})
                } 
            })
        }
    })
})

app.listen(9002,()=>{
    console.log("Started at Port 9002")
})