import {React, useState} from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import GoogleButton  from 'react-google-button';
import { Link, useNavigate} from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';



const LoginForm = () => {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const {logIn, googleSignIn} = useUserAuth();
    const navigate = useNavigate();
    const[error, setError] = useState("");
 
    const handleSubmit  = async (e) => {
        e.preventDefault();
        setError("");
        try{
            await logIn(email, password);
            // navigate("/addbook");
        }catch(err){
            setError(err.message);
        }
    };
      
    const handleGoogleSignIn = async (e) =>{
        e.preventDefault();
        try{
            await googleSignIn();
            navigate("/addbook");
        }catch(err){
            setError(err.message);
        }
    };
    return(
        <>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <Button className = "d-btn" variant="primary" type="submit">
                Login
            </Button>
        </Form>
        <div><GoogleButton type="dark" onClick={handleGoogleSignIn}/></div>
        <div className='p-4 box mt-3 text-center'>
            Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
        </>
    )
}
export default LoginForm;