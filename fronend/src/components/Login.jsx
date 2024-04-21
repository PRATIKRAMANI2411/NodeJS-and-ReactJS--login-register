import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [fromData, setFromData] = useState({
        email: '',
        password: ''
    });

    const [token, setToken] = useState("")

    const [message, setMessage] = useState("")


    const hendelCheges = (e) => {
        setFromData({ ...fromData, [e.target.name]: e.target.value })
    }

    const handledubmit = async (e) => {
        e.preventDefault();
        console.log(fromData);
        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', fromData);
            setToken(response.data.token);
            localStorage.setItem("token", JSON.stringify(response.data));
            navigate("/dashboard");
        } catch (error) {
            console.error("Authentication failed:", error);
            setToken(null);
            localStorage.removeItem("token");
        }
    }
    return (
        <>
            <Form onSubmit={handledubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name='email' onChange={hendelCheges} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name='password' onChange={hendelCheges} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
                <p className="forgot-password text-right">
                    Already registered <a href="/register">Register?</a>
                </p>
            </Form>
            {message && <p>{message}</p>}
        </>
    )
}

export default Login
