import React from "react";
import { UserMenu } from "../../components/layout/UserMenu";
import Layout from "../../components/layout/layout";

const Profile = () => {
    return (
        <Layout>
        <div className="row m-3 p-3">
            <div className="col-md-3">
                <UserMenu/>
            </div>
            <div className="col-md-9">
                <h1>Menu</h1>
            </div>
        </div>
    </Layout>
    )
}
export default Profile;