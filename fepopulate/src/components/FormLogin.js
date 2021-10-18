import React, { useState } from 'react'
import { useHistory } from 'react-router';
import axios from 'axios'
import '../css/formlogin.css'
import auth from '../app/auth';

function FormLogin() {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState("")
    const [error, setError] = useState("")
    const [user, setUser] = useState({})

    const history = useHistory();

    const loginHandler = async (e) => {
        e.preventDefault()

        const formData = new FormData();

        formData.append('name', name)
        formData.append('password', password)

        await axios.post('http://localhost:8000/api/auth/login', formData)
        .then((response) => {
            setUser(response.data.user)
            localStorage.setItem('token', response.data.access_token);
        })
        .then(() => {
            auth.login(() => {
                history.push('/home')
            })
        })
        .catch((error) => {
            if(error.response.data){
                setError('Username dan password salah')
            }
        })
    }

    return (
        <div className='formWrapper'>
            <form id='form' className="form" onSubmit={loginHandler}>
                <h1 className="formTitle">Sign in</h1>
                <input 
                    type="text" 
                    name="name" 
                    className="input" 
                    placeholder="Username" 
                    value={name} 
                    onChange={(e) => {
                        setName(e.target.value)
                        setValidation("")
                    }}
                    />
                {
                    validation.name && (
                        <div className="alert alert-danger">
                            <p className="dangerValidation">{validation.name[0]}</p>
                        </div>
                    )
                }
                <input 
                    type="password" 
                    name="password" 
                    className="input" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setValidation("")
                    }}
                />
                {
                    validation.password && (
                        <div className="alert alert-danger">
                            <p className="dangerValidation">{validation.password[0]}</p>
                        </div>
                    )
                }
                <div className="actionWrapper">
                    <p className="registerBtn"><a href="/register">Register</a></p>
                    <button type="submit" className="loginBtn">Sign in</button>
                </div>
                {
                    error && (
                        <p className="dangerValidation">Username dan password tidak sesuai</p>
                    )
                }
            </form>
        </div>
    )
}

export default FormLogin
