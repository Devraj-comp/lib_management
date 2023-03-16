import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import BookDataService from "../services/BookServics";




const BooksList = ({getBookId}) => {
  const [message, setMessage] = useState({error:false, msg: ""});
  const[books, setBooks] = useState([]);
  const {user} = useUserAuth();
  console.log(user);
  useEffect(()=>{
    getBooks();
  },[]);
  
  const getBooks = async()=>{
    const data = await BookDataService.getAllBooks();
    console.log(data.docs);
    setBooks(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
  };


  const deleteHandler = async(id)=> {
    try{
      if(id !== undefined && id !== ""){
        await BookDataService.deleteBook(id);
        console.log("the deleted book id is: ", id);
        getBooks();
        setMessage({error: false, msg: "Deleted Successfully!!"});
      }else{
        getBooks();
        setMessage({error: true, msg: "Deleted Unsuccesful!!"});
      }
      
    }catch(err){
      setMessage({error: true, msg: err.message});
    }
    
  }
  return (
    <>
    <div className="mb-2">
      <Button variant="primary edit" onClick={getBooks}>
        Refresh
      </Button>
    </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Book Title</th>
            <th>Book Author</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((doc, index)=>{
            return(
              <tr key={doc.id}>
                <td>{index+1}</td>
                <td>{doc.title}</td>
                <td>{doc.author}</td>
                <td>{doc.status}</td>
                <td>
                  <Button variant="dark" className="edit" onClick={(e) => getBookId(doc.id)}>Edit</Button>
                  <Button variant="dark" className="delete" onClick={(e) => deleteHandler(doc.id)}>Delete</Button>
                  <Button variant="dark" className="view">View</Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  );
};

export default BooksList;
