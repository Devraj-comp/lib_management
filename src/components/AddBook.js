import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import BookDataService from "../services/BookServics";
import { useUserAuth } from "../context/UserAuthContext";


const AddBook = ({ id, setBookId }) => {
  const[title, setTitle] = useState("");
  const[author, setAuthor] = useState("");
  const[status, setStatus] = useState("Available");
  const[flag, setFlag] = useState(true);
  const[message, setMessage] = useState({error:false, msg: ""})
  const {user, logOut} = useUserAuth();
  const handleLogout = async () => {
    try{
      await logOut();
    }catch(err){
      console.log(err.message);
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setMessage("");
    if (title === "" || author === ""){
      setMessage({error: true, msg: "Please fill all the fields!!"})
    }
    const newBook = {
      title, author, status
    }
    console.log(newBook);
    try{
      if(id !== undefined && id !== ""){
        await BookDataService.updateBook(id, newBook);  
        setBookId("");
        setMessage({error: false, msg:"Updated Successfully!!"});
      }else{
        await BookDataService.addBooks(newBook);  
        setMessage({error: false, msg:"New Book added!!"});
      }
      
    }catch(err){
      setMessage({error: true, msg: err.message});
    }
    setTitle("");
    setAuthor("");
  };

  const editHandler = async() => {
    setMessage("");
    try{
      const docTemp = await BookDataService.getBook(id);
      console.log("the previous data is:", docTemp.data());
      setTitle(docTemp.data().title);
      setAuthor(docTemp.data().author);
      setStatus(docTemp.data().status);
    }catch(err){
      setMessage({error: true, msg: err.message});
    }
  };

  useEffect(() => {
    console.log("The book id is:", id);
    if(id !== undefined && id!== ""){
      editHandler();
    }
  },[id]);
 
  return (
    <>
    <div className="p-4 box">
      {message?.msg && (<Alert variant={message?.error? "danger":"success"} dismissible onClose={() => setMessage("")}>{message?.msg}</Alert>)}
      
      
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBookTitle">
            <InputGroup>
              <InputGroup.Text id="formBookTitle">B</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Book Title"
                value = {title}
                onChange = {(e) => setTitle(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              <InputGroup.Text id="formBookAuthor">A</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Book Author"
                value = {author}
                onChange = {(e) => setAuthor(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button
              disabled={flag}
              variant="success"
              onClick={(e) => {
                setStatus("Available");
                setFlag(false);
              }}
            >
              Available
            </Button>
            <Button
              variant="danger"
              disabled={!flag}
              onClick={(e) => {
                setStatus("Not Available");
                setFlag(false);
              }}
            >
              Not Available
            </Button>
          </ButtonGroup>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Add/ Update
            </Button>
          </div>
          <div className="g-btn">
            <Button variant="primary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddBook;
