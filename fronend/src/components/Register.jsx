import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";


const Register = () => {
    const [fromData, setFromData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [message, setMessage] = useState("")


    const hendelCheges = (e) => {
        setFromData({ ...fromData, [e.target.name]: e.target.value })
    }

    const handledubmit = async (e) => {
        e.preventDefault();
        console.log(fromData);
        try {
            const responce = await axios.post('http://localhost:3001/api/auth/register', fromData);
            setMessage(responce.data.message)
        } catch (error) {
            console.error("Registration failed:", error.response.data.error);
            setMessage(error.response.data.error);
        }
    }

    return (
        <>
            <Form onSubmit={handledubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" name='username' onChange={hendelCheges} />
                </Form.Group>
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
                    Already registered <a href="/login">sign in?</a>
                </p>
            </Form>
            {message && <p>{message}</p>}
        </>
    )
}

export default Register
