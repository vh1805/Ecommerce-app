import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import {useAsyncError, useNavigate} from 'react-router-dom'
import { toast } from "react-hot-toast";
import axios from "axios";

const Register = () => {
    const [name,setName] = useState("");
    const [email,setemail] = useState("");
    const [password,setPassword] = useState("");
    const [phone,setPhone] = useState("");
    const [address,setAddress] = useState("");
    const [question, setQuestion] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/v1/auth/register`, {
                name, email, password, phone, question, address
            })
            if(res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate('/login')
            }
            else {
                toast.error(res.data.message);
            }
        }
        catch (error) {
            console.log(error);
            toast.error('Something Went Wrong');
        }
    }
    return ( 
        <Layout className="register-ecommerce-app">
            <div className="register">
                <h1>Register Page</h1>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} 
                    className="form-control" id="exampleInputName" placeholder="Enter Your Name" required/>
                </div>
                <div className="mb-3">
                    <input type="email" value={email} onChange={(e) => setemail(e.target.value)}
                    className="form-control" id="exampleInputEmail" placeholder="Enter Your Email" required/>
                </div>
                <div className="mb-3">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    className="form-control" id="exampleInputPassword1" placeholder="Enter Your Password" required/>
                </div>
                <div className="mb-3">
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="form-control" id="exampleInputPhone" placeholder="Enter your phone No" required/>
                </div>
                <div className="mb-3">
                    <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)}
                    className="form-control" id="exampleInputQuestion" placeholder="Enter Your pet name" required/>
                </div>
                <div className="mb-3">
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                    className="form-control" id="exampleInputAddress" placeholder="Enter Your Address" required/>
                </div>
                <button type="submit" className="btn btn-primary mx-5">Submit</button>
                </form>
            </div>
        </Layout>
    )
}

export default Register;