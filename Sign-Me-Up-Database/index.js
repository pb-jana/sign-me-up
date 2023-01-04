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


// for contactus
// create user schema
const dataSchema = new mongoose.Schema({
    country: String,
    student: String,
    employee: String,
    messages: String
})

// model create
const Data = new mongoose.model("Data", dataSchema)



// Routes
// to signing in
app.post("/signin", (req, res)=> {
    // res.send("My API signin")
    const { email, password }=(req.body)

    // email exits of not in the database
    User.findOne({email: email}, (err, user)=>{
        if(user){
            if(password === user.password){
                res.send({message: "Welcome !! You Are Successfully Signed In !!", user: user})
            }else{
                res.send({message: "Incorrect E-mail or Password, Try Again !!"})
            }

        }else{
            res.send({message: "Empty Field !! Kindly Fill All Before Signing In !!"})
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


// contactus
// to submit data and redirect to VIRCUR app
app.post("http://localhost:3001", (req, res)=> {
    // res.send("My API signup")
    const { country, student, employee, messages }=(req.body)


    
    const data = new Data({
        country,
        student,
        employee,
        messages
    })
    // user data saving
    data.save(err => {
        if(err){
            res.send(err)
        }else{
            res.send({message: "User Data Successfully Stored !! Let's Signin !!"})
        } 
    })
})



app.listen(9002,()=>{
    console.log("DB Started at Port 9002")
})