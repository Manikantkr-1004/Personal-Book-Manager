'use client';

import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { FaBook, FaBookOpen, FaCheckCircle, FaLayerGroup } from "react-icons/fa";
import { createBook, getBooks, updateBook, deleteBook } from "@/app/lib/actions/book";
import toast from "react-hot-toast";
import StatusCard from "@/app/ui/user/StatusCard";
import Loader from "@/app/ui/Loader";
import BookCard from "@/app/ui/user/bookCard";
import BookForm from "@/app/ui/user/bookForm";

const initialData = { title: '', author: '', tags: '', status: '' };

export default function UserDashboard() {

  const [books, setBooks] = useState([]);
  const [bookStatus, setBookStatus] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formLoading, setFormLoading] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [query, setQuery] = useState({ status: '', tags: '' });

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await getBooks({ page, limit: 8, ...query });
      setBooks(res.data.data);
      setTotalPages(res.data.totalPages);
      setBookStatus(res.data.bookStatus);
    } catch {
      toast.error('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page]);

  const handleAdd = async (payload) => {
    setFormLoading(true);
    try {
      await createBook(payload);
      toast.success('Book added!');
      setIsOpenForm(false);
      fetchBooks();
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to add book');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (payload) => {
    setFormLoading(true);
    try {
      await updateBook(editBook._id, payload);
      toast.success('Book updated!');
      setEditBook(null);
      fetchBooks();
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to update book');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      toast.success('Book deleted!');
      fetchBooks();
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to delete book');
    }
  };

  const handleEditClick = (book) => {
    setEditBook({ ...book, tags: book.tags?.join(', ') ?? '' });
    setIsOpenForm(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="w-full min-h-screen m-auto flex flex-col gap-5 px-3 md:px-5 lg:px-10 py-18 md:py-24 relative max-w-6xl">

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatusCard icon={FaLayerGroup} label="Total Books" value={bookStatus.total} color="bg-gray-700" />
        <StatusCard icon={FaBook} label="Want to Read" value={bookStatus.wantToRead} color="bg-blue-500" />
        <StatusCard icon={FaBookOpen} label="Reading" value={bookStatus.reading} color="bg-yellow-500" />
        <StatusCard icon={FaCheckCircle} label="Completed" value={bookStatus.completed} color="bg-green-500" />
      </div>

      {/* Filter */}
      {!isOpenForm && !editBook && (
        <div className="flex items-center gap-2 flex-wrap">
          <input
            type="search"
            value={query.tags} onChange={(e) => { setQuery({ ...query, tags: e.target.value }); setPage(1); }} placeholder="Filter by tags (comma separated)"
            className="border border-slate-600 p-1.5 rounded w-full md:w-auto text-sm" />
          <select
            className="border p-1.5 rounded w-1/2 md:w-auto border-slate-600"
            value={query.status} onChange={(e) => { setQuery({ ...query, status: e.target.value }); setPage(1); }}>
            <option value="">All</option>
            <option value="Want to Read">Want to Read</option>
            <option value="Reading">Reading</option>
            <option value="Completed">Completed</option>
          </select>
          <button
            onClick={fetchBooks}
            className="px-3 py-2 text-sm rounded w-1/2 md:w-auto bg-slate-600 text-white cursor-pointer disabled:opacity-50">
            Search
          </button>
        </div>)}

      {/* Add Form */}
      {isOpenForm && (
        <BookForm
          initial={initialData}
          onSubmit={handleAdd}
          onClose={() => setIsOpenForm(false)}
          loading={formLoading}
        />
      )}

      {/* Edit Form */}
      {editBook && (
        <BookForm
          initial={editBook}
          onSubmit={handleUpdate}
          onClose={() => setEditBook(null)}
          loading={formLoading}
        />
      )}

      {loading ? (
        <Loader />
      ) : books.length === 0 ? (
        <div className="text-center text-(--blue-color) font-bold py-20 text-sm">Oops! No books found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {books.map(book => (
            <BookCard key={book._id} book={book} onEdit={handleEditClick} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {!loading && books.length > 0 && (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            ← Prev
          </button>
          <p
            className={`w-8 h-8 text-sm rounded-lg flex justify-center items-center bg-gray-800 text-white border-gray-800`}
          >
            {page}
          </p>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Next →
          </button>
        </div>
      )}

      {!isOpenForm && !editBook && (
        <button
          onClick={() => { setIsOpenForm(true); setEditBook(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          title="Add Book" aria-label="Add Book"
          className="fixed bottom-6 right-6 cursor-pointer text-gray-800 hover:scale-110 transition-transform drop-shadow-lg"
        >
          <IoIosAddCircle size={42} />
        </button>)}

    </main>
  );
}