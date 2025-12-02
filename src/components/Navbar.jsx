import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="simple-navbar">
      {/* Left Logo */}
      <div className="simple-navbar-logo">
        <img
          src="/img/logo.png"
          alt="Logo"
          onClick={() => navigate("/")}   // 👈 HOME
        />
      </div>

      {/* Right Help Button */}
      <button className="simple-help-btn" onClick={() => navigate("/help")}>
        Help
      </button>
    </header>
  );
};

export default Navbar;
