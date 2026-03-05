import { formateIndiaTime } from "@/app/lib/formateTime";
import { useState } from "react";
import { FaEdit, FaTrash, FaTags, FaUser, FaClock } from "react-icons/fa";

const STATUS_STYLES = {
    'Want to Read': 'bg-blue-100 text-blue-700',
    'Reading': 'bg-yellow-100 text-yellow-700',
    'Completed': 'bg-green-100 text-green-700',
};

export default function BookCard({ book, onEdit, onDelete }) {

    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm('Delete this book?')) return;
        setLoading(true);
        try {
            await onDelete(book._id);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white self-start rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col gap-3">
            <div className="flex flex-col justify-between items-start gap-2">
                <h3 className="font-bold text-gray-800 text-base leading-tight">{book.title}</h3>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${STATUS_STYLES[book.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {book.status}
                </span>
            </div>

            <p className="text-sm text-gray-500 flex items-center gap-1.5">
                <FaUser size={11} /> {book.author}
            </p>

            {book.tags?.length > 0 && (
                <div className="flex items-center gap-1 flex-wrap">
                    <FaTags size={11} className="text-gray-400" />
                    {book.tags.map((tag, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                </div>
            )}

            <div className="flex flex-col gap-0.5 text-xs text-gray-400 mt-auto">
                <span className="flex items-center gap-1"><FaClock size={10} /> Added: {formateIndiaTime(book.createdAt)}</span>
                <span className="flex items-center gap-1"><FaClock size={10} /> Updated: {formateIndiaTime(book.updatedAt)}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1 border-t border-gray-100">
                <button
                    onClick={() => onEdit(book)}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-(--blue-color) hover:bg-blue-50 py-1.5 rounded-lg transition-colors cursor-pointer disabled::opacity-50"
                >
                    <FaEdit size={11} /> Edit
                </button>
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-(--red-color) hover:bg-red-50 py-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                >
                    <FaTrash size={11} /> {loading ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
    );
}