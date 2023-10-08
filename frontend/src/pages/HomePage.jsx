import React, { useEffect, useState } from 'react'
import '../styles/HomePage.css'
import Navbar from '../components/Navbar'
import axios from 'axios';


const HomePage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://10.237.62.101:321/book')
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="book-list">
        <h2>List Buku</h2>
        <ul>
          {books.map((book) => (
            <div key={book.id} className='card card-container'>
              <img
                className='card-img-top'
                src={`${book.filename}`} // Change 'image/png' to the actual image format if needed
                alt={book.title}
                style={{ width: '100%', height: '250px' }}
              />
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          ))}

        </ul>
      </div>
    </>
  )
}

export default HomePage
