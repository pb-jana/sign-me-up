import express from "express"
import cors from "cors"
import mongoose from 'mongoose'

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

const userDB = 'mongodb+srv://pbj-21:BGw7NZvfutw3QKU@pbj-cluster-1.mrn3sos.mongodb.net/userDB?retryWrites=true&w=majority';

mongoose.connect('userDB',{
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
},() => {
    console.log("Database Connected !!")
});
// .catch((err) => console.log("Connection Failed !!"));


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

app.post("/signin", (req, res) => {
    // res.send("My SignIn Page")
    const { email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        if(user){
            if (password === user.password) {
                res.send({ message: "Successfully Signed In !!", user: user})
            } else {
                res.send({ message: "Incorrect Password !!"})
            }
        } else {
            res.send({ message: "User Not Registered !! Create Account Now !!"})
        }
    })
})

app.post("/signup", (req, res) => {
    // res.send("My SignUp Page")
    const { name, email, password} = req.body

    // if user signed up before
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "E-mail Already Signed Up !!"})
        }else{
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err){
                    res.send(err)
                }else{
                    res.send({ message: "Successfully Signed Up !!"})
                }
            })
        }
    })
})


app.listen(9002, () => {
    console.log("Be Started at Port 9002")
})

