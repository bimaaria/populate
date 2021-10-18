import React, { useState } from 'react'
import { useHistory } from 'react-router'
import '../css/formlogin.css'
import axios from 'axios'

function FormRegister() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState("")
    const [notif, setNotif] = useState("")

    const history = useHistory()

    const registerHandler = async (e) => {
        e.preventDefault()

        const formData = new FormData();

        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)

        await axios.post('http://localhost:8000/api/auth/register', formData)
        .then((response) => {
            setNotif(response.data.message);
            history.push('/login')
        })
        .catch((error) => {
            setValidation(error.response.data)
        })
    }

    return (
        <div className='formWrapper'>
            <form id='form' className="form" onSubmit={registerHandler}>
                <h1 className="formTitle">Register</h1>
                <input type="text" name="name" className="input" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} />
                {
                    validation.name && (
                        <div className="alert alert-danger">
                            {validation.name[0]}
                        </div>
                    )
                }
                <input type="text" name="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {
                    validation.email && (
                        <div className="alert alert-danger">
                            {validation.email[0]}
                        </div>
                    )
                }
                <input type="password" name="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {
                    validation.password && (
                        <div className="alert alert-danger">
                            {validation.password[0]}
                        </div>
                    )
                }
                <div className="actionWrapper">
                    <button type="submit" className="regBtn">Register</button>
                </div>
            </form>
        </div>
    )
}

export default FormRegister
