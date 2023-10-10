import React, { useEffect, useState } from 'react'
import '../../styles/HomePage.css'
import Navbar from '../../components/Navbar'
import axios from 'axios';


const HomePage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.18.105:321/book')
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
      {/* <div className="book-list">
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
      </div> */}
      
      <div className="container-books">
        {books.map((item, index) => (
          <div className="books" key={(index + 1)}>
            <div>
              <img src={`${item.filename}`} alt="" className="book-img" />

            </div>
            <div className="descp">
              <h2 className="book-name">{item.title}</h2>
              <h3 className="author">{item.author}</h3>
              <p className="info">
                {item.synopsis}
              </p>
              <button type="submit">See the Book</button>
            </div>
          </div>
        ))}
      </div>

    </>
  )
}

export default HomePage
