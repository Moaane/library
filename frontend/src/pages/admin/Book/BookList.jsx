import React, { useEffect, useState } from 'react'
import { findAllBooksApi, deleteBookApi } from '../../../api/BookApi' // Pastikan Anda memiliki fungsi deleteBookApi yang sesuai dengan API Anda
import '../../../styles/book/BookList.css'

const BookList = () => {
    const [books, setBooks] = useState([])

    const fetchBooks = async () => {
        try {
            const result = await findAllBooksApi();
            setBooks(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (bookId) => {
        try {
            // Konfirmasi penghapusan dengan alert
            const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus buku ini?');

            if (confirmDelete) {
                // Panggil fungsi untuk menghapus buku berdasarkan ID
                await deleteBookApi(bookId);

                // Hapus buku dari daftar setelah berhasil dihapus
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    return (
        <div className='body-book-list'>
            <div className="container-book">
                <table className="table table-hover">
                    <thead className='table-primary'>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Title</th>
                            <th scope="col">Author</th>
                            <th scope="col">Synopsis</th>
                            <th scope="col">ISBN</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Publisher</th>
                            <th scope="col">Publication</th>
                            <th scope="col span-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((item, index) => (
                            <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.title}</td>
                                <td>{item.author}</td>
                                <td>{item.synopsis}</td>
                                <td>{item.isbn}</td>
                                <td>{item.stock}</td>
                                <td>{item.publisher}</td>
                                <td>{item.publicationYear}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className='btn btn-danger'
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BookList
