import React from "react";
import Layout from "../components/layout/layout";
import {useAuth} from '../context/auth'
const Home = () => {
    const [auth, setAuth] = useAuth();
    
    return (
        <Layout>
            <h1>Home Page</h1>
        </Layout>
    );
}

export default Home;