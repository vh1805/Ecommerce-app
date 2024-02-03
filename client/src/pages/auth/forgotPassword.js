import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const[question, setQuestion] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/v1/auth/forgotPassword`, {
                email, question, newPassword
            })
            if(res.data && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login")
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
            <h1 className="text-center">Password Reset Page</h1>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="form-control" id="exampleInputEmail" placeholder="Enter Your Email" required/>
            </div>
            <div className="mb-3">
                <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)}
                className="form-control" id="exampleInputQuestion" placeholder="Enter Your pet Name" required/>
            </div>
            <div className="mb-3">
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                className="form-control" id="exampleInputPassword1" placeholder="Enter Your New Password" required/>
            </div>
            <button type="submit" className="btn btn-primary mx-5">Submit</button>
            </form>
        </div>
    </Layout>
    )
}

export default ForgotPassword;