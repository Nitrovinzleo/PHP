import { Link } from "react-router-dom";
import "../styles/Head.css"
import siteLogo from "../assets/logo-severum.png"

export default function Head () {
    return (
        <div className="head-wrapper">
            <Link to="/" className="logo-link">
                <div className="logo-wrapper">
                    <img src={siteLogo} alt="Severum Logo" />
                </div>
            </Link>
            <div className="title-wrapper">
                <Link to="/" className="title-link">
                    <h1 className="title-homepage">Severum</h1>
                </Link>
            </div>
        </div>
    );
}