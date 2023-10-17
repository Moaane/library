import React, { useState } from 'react';
import { createBook } from '../../../api/BookApi';

const BookCreate = () => {
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        synopsis: '',
        isbn: '',
        stock: '',
        publisher: '',
        publicationYear: '',
        filename: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Panggil fungsi createBookApi untuk mengirim data buku baru ke backend
            await bookApi(createBook);
            alert('Buku baru berhasil ditambahkan!');
            // Reset formulir setelah berhasil membuat buku baru
            setNewBook({
                title: '',
                author: '',
                synopsis: '',
                isbn: '',
                stock: '',
                publisher: '',
                publicationYear: '',
            });
        } catch (error) {
            console.error(error);
            alert('Gagal menambahkan buku baru.');
        }
    };

    return (
        <>
            
        </>
    );
}

export default BookCreate
