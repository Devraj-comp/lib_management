import Button from 'react-bootstrap/Button';
import {Form, Alert} from 'react-bootstrap';
import { Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import { useUserAuth } from '../context/UserAuthContext';

function SignupForm() {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[role, setRole] = useState("Select Your Role");
    const {signUp} = useUserAuth();
    const navigate = useNavigate();
    const[error, setError] = useState("");
    const handleSubmit  = async (e) => {
        e.preventDefault();
        setError("");
        try{
            await signUp(email, password, role);
            console.log(email, password, role);
            navigate("/login");
        }catch(err){
            setError(err.message);
        }
    };
    return (
        <>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" 
            onChange = {(e) => setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" 
            onChange = {(e) => setPassword(e.target.value)}/>
        </Form.Group>
        <Form.Select aria-label="role" value={role} onChange={(e) => setRole(e.target.value)}>
                <option>Select Your Role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
        </Form.Select>
        <Button className="d-btn" variant="primary" type="submit">
            Sign Up
        </Button>
        </Form>
        <div className='p-4 box mt-3 text-center'>
            Already have an account? <Link to="/login">Login</Link>
        </div>
        </>
    );
}

export default SignupForm;