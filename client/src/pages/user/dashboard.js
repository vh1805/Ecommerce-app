import React from "react";
import Layout from "../../components/layout/layout";
import { UserMenu } from "../../components/layout/UserMenu";
import { useAuth } from "../../context/auth";

export const Dashboard = () => {
    const [auth, setAuth] = useAuth();
    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu/>
                    </div>
                    <div className="col-md-9">
                        <div className="card w-75 p-3">
                            <h3>USER NAME : {auth?.user?.name}</h3>
                            <h3>USER EMAIL : {auth?.user?.email}</h3>
                            <h3>USER PHONE : {auth?.user?.phone}</h3>
                            <h3>USER ADDRESS : {auth?.user?.address}</h3>
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    )
}