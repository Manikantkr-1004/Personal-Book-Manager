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
        const { tags, status, page = 1, limit = 10 } = req.query;

        const filter = { user: req.user._id };
        let skip = 0;
        if (status) filter.status = status;
        if (tags.length) {
            const tagArray = tags.split(',').map(tag =>
                new RegExp(`^${tag.trim()}$`, 'i')
            );
            filter.tags = { $in: tagArray };
        }
        if (page && limit) {
            skip = (+(page) - 1) * +(limit);
        }

        const books = await BookModel.find(filter).skip(skip).limit(+limit);
        const totalBooks = await BookModel.find({ user: req.user._id }).countDocuments();
        const wantReadBooks = await BookModel.find({ ...filter, status: "Want to Read" }).countDocuments();
        const readingBooks = await BookModel.find({ ...filter, status: "Reading" }).countDocuments();
        const completedBooks = await BookModel.find({ ...filter, status: "Completed" }).countDocuments();

        res.status(201).json({
            message: "Book fetched successfully",
            data: books,
            totalPages: Math.ceil(totalBooks / +limit),
            bookStatus: {
                total: totalBooks,
                wantToRead: wantReadBooks,
                reading: readingBooks,
                completed: completedBooks
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

export const updateBook = async (req, res) => {
    try {
        const { title, author, tags, status } = req.body;
        const { bookId } = req.params;
        const bookStatus = ["Want to Read", "Reading", "Completed"];

        if (!bookId) {
            return res.status(400).json({ message: "Book ID is required" });
        }

        const existBook = await BookModel.findById(bookId);
        if (!existBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        if(existBook.user.toString() !== req.user._id.toString()){
            return res.status(403).json({ message: "You are not authorized to update this book" });
        }

        if (status.trim() && !bookStatus.includes(status.trim())) {
            return res.status(400).json({ message: 'Provide correct book status' });
        }

        if (title.trim()) existBook.title = title;
        if (author.trim()) existBook.author = author;
        if (tags.length) existBook.tags = tags;
        if (status.trim()) existBook.status = status;

        await existBook.save();

        res.status(201).json({ message: "Book updated successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

export const deleteBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        if (!bookId) {
            return res.status(400).json({ message: "Book ID is required" });
        }

        const existBook = await BookModel.findById(bookId);
        if (!existBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        if(existBook.user.toString() !== req.user._id.toString()){
            return res.status(403).json({ message: "You are not authorized to delete this book" });
        }

        await BookModel.findByIdAndDelete(bookId);
        res.status(201).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}