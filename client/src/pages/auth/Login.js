import React, { useState } from "react";
import toast from "react-hot-toast";
import Layout from "../../components/layout/layout";
import {NavLink, useLocation, useNavigate} from 'react-router-dom'
import axios from "axios";
import { useAuth } from "../../context/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/v1/auth/login`, {
                email, password
            })
            console.log(res);
            if(res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user : res.data.userExist,
                    token : res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate(location.state || '/');
            }
            else {
                toast.error(res.data.message);
            }
        }
        catch (error) {
            console.log(error);
            toast.error('Something Went Wrong')
        }
    }
    return (
        <Layout className="register-ecommerce-app">
        <div className="register">
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
            <div className="mt-3">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                className="form-control" id="exampleInputEmail" placeholder="Enter Your Email" required/>
            </div>
            <div className="mt-3">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="form-control" id="exampleInputPassword1" placeholder="Enter Your Password" required/>
            </div>
            <NavLink to="/forgotPassword" className="nav-link mb-3 text-primary text-center">
             Forgot Password ?
          </NavLink>
          
            <div>
            <button type="submit" className="btn btn-primary mx-5">Submit</button>
            </div>
            </form>
        </div>
    </Layout>
    )
}

export default Login;