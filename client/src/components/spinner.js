import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = ({path = "login"}) => {
    const [cnt, setCnt] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCnt((prevValue) => --prevValue)
        },1000)
        cnt === 0 &&  navigate(`/${path}`, {
            state : location.pathname
        });
        return () => clearInterval(interval);
    }, [cnt, navigate, location, path])
    return (
        <>
          <div className="d-flex flex-column justify-content-center align-items-center"
          style={{
            height : "100vh"
          }}>
            <h1 className="text-center">Redirecting to you in {cnt} second to Login Page</h1>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            </div>
        </>
    )
}

export default Spinner;