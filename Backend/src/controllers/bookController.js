import { BookModel } from "../models/Book.js";

export const createBook = async (req, res) => {
    try {
        const { title, author, tags, status } = req.body;

        if (!title.trim() || !author.trim() || !status.trim() || !tags.length) {
            return res.status(400).json({ message: "Please provide all fields" });
        }

        const newBook = new BookModel({
            title,
            author,
            tags,
            status,
            user: req.user._id
        });
        await newBook.save();

        res.status(201).json({ message: "Book created successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

export const getBook = async (req, res) => {
    try {
        const { tags, status, page=1, limit=10 } = req.query;

        const filter = { user: req.user._id };
        let skip = 0;
        if(tags) filter.tags = { $in: tags.split(',')};
        if(status) filter.status = status;
        
        if(page && limit){
            skip = (+(page) - 1) * +(limit);
        }

        const books = await BookModel.find(filter).skip(skip).limit(+limit);
        
        res.status(201).json({ message: "Book fetched successfully", data: books });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

export const updateBook = async (req, res) => {
    try {
        const { title, author, tags, status } = req.body;
        const { bookId } = req.params;

        if(!bookId){
            return res.status(400).json({ message: "Book ID is required" });
        }

        const existBook = await BookModel.findById(bookId);
        if (!existBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        if(title.trim()) existBook.title = title;
        if(author.trim()) existBook.author = author;
        if(tags.length) existBook.tags = tags;
        if(status.trim()) existBook.status = status;

        await existBook.save();

        res.status(201).json({ message: "Book updated successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

export const deleteBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        if(!bookId){
            return res.status(400).json({ message: "Book ID is required" });
        }

        const existBook = await BookModel.findById(bookId);
        if (!existBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        await BookModel.findByIdAndDelete(bookId);
        res.status(201).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}