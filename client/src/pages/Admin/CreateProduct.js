import React from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/layout/Adminmenu";

const CreateProduct = () => {
    return (
        <Layout>
            <div className="row m-3 p-3">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9">
                    <h1>create Product</h1>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct;