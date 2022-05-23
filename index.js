require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection

db.on('error',()=>console.error(error))
db.once('open',()=>console.log('Conected to DataBase'))

app.use(express.json())

const subsciberRoutes = require('./routes/subscribers')
app.use('/subscribers',subsciberRoutes)


app.listen(process.env.PORT || 3000,()=>console.log('Server Started'))