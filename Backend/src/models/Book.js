import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, },
    author: { type: String, required: true },
    tags: [{ type: String }],
    status: {
        type: String,
        enum: ["Want to Read", "Reading", "Completed"],
        default: "Want to Read"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { versionKey: false, timestamps: true });

export const BookModel = mongoose.model('Book', bookSchema);