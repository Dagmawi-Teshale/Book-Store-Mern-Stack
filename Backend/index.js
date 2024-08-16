import express from 'express'
import {PORT, mongodbUrl} from './config.js'
import mongoose from 'mongoose'
import { Book } from './models/bookModel.js'
import booksRoute from './routes/bookRoute.js'
import cors from 'cors'

const app = express()

// Middleware for parsing request body
app.use(express.json())

// Middleware for handling CORS policy
// option 1: allow all origins with default of cors(*)
app.use(cors())

// option s: allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methhods: ['GET','POST','PUT','DELETE'],
//         allowedHeaders: ['Content-Type']
//     })
// )
app.get('/',(request,response) => {
    console.log(request);
    return response.status(234).send('Welcome')
})


app.use('/books', booksRoute)

mongoose.connect(mongodbUrl).then(() => {
    console.log('App is connected to database')
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`)
    })
}).catch((error) => {
    console.log(error);
})