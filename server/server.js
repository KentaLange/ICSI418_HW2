const express = require('express');
const cors = require('cors');
const app = express();
const User = require('./UserSchema');
app.use(express.urlencoded())

app.use(express.json());
app.use(cors())
app.listen(9000, ()=> {
    console.log('Server Started at ${9000}')
})

const mongoose = require('mongoose');
const mongoString = "mongodb+srv://Kenta_Lange:Kenta1210@cluster0.5cr93.mongodb.net/"
mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error', (error) => console.log(error))

database.once('connected', () => console.log('Databased Connected'))

app.post('/createUser', async (req, res) => {
    console.log(`SERVER: CREATE USER REQ BODY: ${req.body.username} ${req.body.firstName} ${req.body.lastName}`)
    const un = req.body.username
    try {
        //Check if username already exists in database
        User.exists({username: un}).then(result => {
            if(Object.is(result, null)) {
                const user = new User(req.body);
                user.save()
                console.log(`User created! ${user}`)
                res.send(user)
            }
            else {
                console.log("Username already exists")
                res.status(500).send("Username already exists")
            }
        })
    }
    catch (error){
        res.status(500).send(error)
    }
})
