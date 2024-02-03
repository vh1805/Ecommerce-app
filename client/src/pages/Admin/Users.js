import React from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/layout/Adminmenu";

const Users = () => {
    return (
        <Layout>
            <div className="row m-3 p-3">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9 p-3">
                    <h1>Users</h1>
                </div>
            </div>
        </Layout>
    )
}

export default Users;