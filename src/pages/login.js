import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [formState, setFormState] = useState({
        email: '',
        password: ''
    });

    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        fetch("https://express-t4.onrender.com/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: formState.email,
                password: formState.password
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data && data.message === "Login success!") {
                    setIsLoggedIn(true);
                    navigate('/profile-listing')
                }else{
                    setIsLoggedIn(false);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className="vh-100 d-flex align-items-center justify-content-center">
            <div>
                <form onSubmit={handleSubmitForm}>
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={formState.email} onChange={handleChange} />

                    </div>
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" name='password' className="form-control" id="exampleInputPassword1" placeholder="Password" value={formState.password} onChange={handleChange} />
                    </div>
                    {isLoggedIn ===false?
                        <div>
                            <div className="alert alert-danger" role="alert">
                                invalid emial or password!
                            </div>
                        </div>
                        : ""}
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Login;