import React from 'react'
import NavbarAdmin from '../../../components/NavbarAdmin'
import '../../../styles/book/BookEdit.css'
import { useState } from 'react'
import { findOneBookApi } from '../../../api/BookApi'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { editBookApi } from '../../../api/BookApi'
import { useNavigate } from 'react-router-dom'

const BookEdit = () => {
  const [data, setData] = useState('')
  const [books, setBooks] = useState('')
  const [title, setTitle] = useState('');
  const [publisher, setPublisher] = useState('')
  const [publicationYear, setPublicationYear] = useState('')
  const [author, setAuthor] = useState('')
  const [isbn, setIsbn] = useState('')
  const [synopsis, setSynopsis] = useState('')
  const [stock, setStock] = useState('')
  const [filename, setFilename] = useState('')
const Navigate = useNavigate();
  const { id } = useParams()

  const fetchBooks = async () => {
    try {
      findOneBookApi(id).then((result) => {
        const data = result.data
        setTitle(data.title)
        setPublisher(data.publisher)
        setPublicationYear(data.publicationYear)
        setAuthor(data.author)
        setIsbn(data.isbn)
        setSynopsis(data.synopsis)
        setStock(data.stock)
        setFilename(data.filename)
      })

    } catch (error) {
      console.log(error)
    }
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      editBookApi(id, {title : title}).then((result) => {
        setData(result.data)
        console.log('berhasil')
        Navigate('/admin/book');
      });
    } catch (error) {
      console.log("error update", error);
    }
  };



  useEffect(() => {
    fetchBooks()
  }, [])

  return (
    <>
      <NavbarAdmin />
      <div className="body-book-edit">
        <form onSubmit={handlesubmit}>
          <div className="container-book-edit">
            <div className="row g-3">
              <div className="col">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" placeholder="First name" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="col">
                <label className="form-label">Author</label>
                <input type="text" className="form-control" placeholder="Last name" />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input type="text" className="form-control" placeholder="title" />
            </div>
            <button className='btn btn-primary' type='submit'>update</button>
          </div>
        </form>
      </div>
    </>
  )

}


export default BookEdit;
