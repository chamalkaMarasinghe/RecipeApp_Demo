//importing several modules and configuring them
const express = require('express')
const { mongoose } = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
dotenv.config()
const app = express()
app.use(cors())
app.use(morgan("common"))

//inherit the .env properties
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

//data parsing configuration
app.use(express.json({extended : true}))
app.use(express.urlencoded({extended : true}))
// app.use(forms.array()); 
app.use(bodyParser.json({limit : '30mb', extended : true}))
app.use(bodyParser.urlencoded({limit : '30mb', extended : true}))

//importing routes
const usersRoute = require('./routes/user.js')
app.use('/auth', usersRoute)

//establishing connection with mongo DB
mongoose.set('strictQuery', true)
mongoose
.connect(MONGO_URI)
.then(() => {
    app.listen(PORT, () => {console.log(`Server listning on port ${PORT}`)})
})
.catch((err) => {console.log(`Error occured - ${err}`);})
