import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

export default function BookForm({ initial, onSubmit, onClose, loading }) {
    const [formData, setFormData] = useState(initial);
    const isEdit = !!initial?._id;

    const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { ...formData, tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean) };
        onSubmit(payload);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-wrap items-center gap-2 p-4 rounded-xl shadow-lg bg-white border border-gray-100">
            <div className="w-full flex justify-between items-center gap-4 mb-1">
                <h2 className="text-lg font-bold text-gray-800">{isEdit ? 'Edit Book' : 'Add New Book'}</h2>
                <button type="button" onClick={onClose} className="cursor-pointer text-gray-400 hover:text-gray-700 transition-colors">
                    <IoIosCloseCircle size={22} />
                </button>
            </div>

            <input
                className="w-full border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                type="text" name="title" autoFocus value={formData.title} onChange={handleChange}
                placeholder="Book Title" minLength={5} required
            />
            <input
                className="w-full border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                type="text" name="author" value={formData.author} onChange={handleChange}
                placeholder="Author Name" minLength={2} required
            />
            <input
                className="w-full border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                type="text" name="tags" value={formData.tags} onChange={handleChange}
                placeholder="Tags: Fiction, Sci-Fi, Mystery (comma separated)"
            />
            <select
                className="w-full border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                name="status" value={formData.status} onChange={handleChange} required
            >
                <option value="">Select Status</option>
                <option value="Want to Read">Want to Read</option>
                <option value="Reading">Reading</option>
                <option value="Completed">Completed</option>
            </select>

            <button
                disabled={loading}
                className="w-full p-2 rounded-lg bg-gray-800 text-white text-sm font-semibold cursor-pointer hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
            >
                {loading ? 'Saving...' : isEdit ? 'Update Book' : 'Add Book'}
            </button>
        </form>
    );
}