import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer">
            <h4 className="text-center">
                All Right Reserved &copy; vanshjain
            </h4>
            <p className="text-center mt-3">
                <Link to="/about" className="p-2 text-decoration-none text-light">
                    About |
                </Link>
                <Link to="/contact" className="p-2 text-decoration-none text-light">
                    Contact |
                </Link>
                <Link to="/policy" className="p-2 text-decoration-none text-light">
                    Privacy Policy
                </Link>
            </p>
        </div>
    )
}

export default Footer;