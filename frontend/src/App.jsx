import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./pages/user/HomePage"
import AuthPage from "./pages/auth/AuthPage";
import Admin from "./pages/admin/Admin";
import BookEdit from "./pages/admin/Book/BookEdit";
import BookCreate from "./pages/admin/Book/BookCreate";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/admin/book" element={<Admin />} />
          <Route path="/admin/book/edit/:id" element={<BookEdit />} />
          <Route path="/admin/book/create" element={<BookCreate />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
