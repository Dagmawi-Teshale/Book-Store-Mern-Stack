import express from 'express'
import { Book } from '../models/bookModel.js'

const router = express.Router()

// Route to post book in database
router.post('/', async (request,response) => {
    try {
        if (!request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: 'Send all required fields: title, author, publisher year'
            })
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        }

        const book = await Book.create(newBook)

        return response.status(400).send(book)
    } catch (error) {
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

// Route for get all books from the database
router.get('/', async (requset,response) => {
    try {
        const books = await Book.find({})
        return response.status(200).json({
            count : books.length,
            data : books
        })
    } catch (error) {
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

// Route for get a single book from the database
router.get('/:id', async (request,response) => {
    try {

        const {id} = request.params

        const book = await Book.findById(id)
        return response.status(200).json(book)
    } catch (error) {
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

// Route for updating book in database
router.put('/:id', async (request,response) => {
    try {
        if (!request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: 'Send all required fields: title, author, publisher year'
            })
        }
        const {id} = request.params
        const result = await Book.findByIdAndUpdate(id, request.body)

        if (!result)
            return response.status(404).send({message : error.message})
        
        return response.status(200).send({message : 'Book updated successfully'})
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message})
    }
})

// Route for get deleting a book from the database
router.delete('/:id', async (request,response) => {
    try {

        const {id} = request.params
        const result = await Book.findByIdAndDelete(id, request.body)

        if (!result)
            return response.status(404).send({message : 'Book not found'})
        
        return response.status(200).send({message : 'Book deleted successfully'})
    } catch (error) {
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

export default router