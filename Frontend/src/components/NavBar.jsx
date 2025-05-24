import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import Logo from "../images/logo.png";
import { useState } from "react";
export default function NavBar() {
  const [showSmallNav ,setShowSmallNav] = useState(false);
  const handleOnClick = () => {
    setShowSmallNav(true);
  }
  return (
    <>
      <div className="nav-bar">
        <Link to="/" className="left">
          <img src={Logo} alt="Logo" width="60px"/>
          <div>MakeMe</div>
        </Link>
        <div className="right">
          <Link to="/" className="home btn btn-info">Home</Link>
          <Link to="/tasks" className="tasks btn btn-info">Tasks</Link>
          <Link to="/about" className="about btn btn-info">About</Link>
          <Link to="/help" className="help btn btn-info">Help</Link>
        </div>
      </div>
    </>
  )
}