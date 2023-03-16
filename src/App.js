import { useState } from "react";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import {Routes, Route} from "react-router-dom";
import AddBook from "./components/AddBook";
import BooksList from "./components/BooksList";
import LoginForm from "./components/Login";
import "./App.css";
import SignupForm from "./components/Signup";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./components/Admin";
import User from "./components/User";


function App() {


  const [bookId, setBookId] = useState("");


  const getBookIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setBookId(id);
  };
  return (
    <>
      <Navbar bg="primary" variant="dark" className="header">
        <Container>
          <Navbar.Brand href="#home">Library - Management</Navbar.Brand>
        </Container>
      </Navbar>

      <Container style={{ width: "400px" }}>
        <Row>
          <Col>
          <UserAuthContextProvider>
    
            <Routes>
              <Route path="/addbook" element={<ProtectedRoute><AddBook id={bookId} setBookId={setBookId} /></ProtectedRoute>} />
            </Routes>
          </UserAuthContextProvider>
          </Col>
        </Row>
      </Container>  
      <Container>
        <Row>
          <Col>
          <UserAuthContextProvider>
          <Routes>
            <Route path="/" element={<BooksList getBookId={getBookIdHandler} />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/admin" element={<Admin/>} />
            <Route path="/user" element={<User />} />
          </Routes>
          </UserAuthContextProvider>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
