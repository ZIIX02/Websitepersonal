import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./HOME.css";

const App = () => {
  const navigate = useNavigate();

  const handleMenemukanClick = () => {
    navigate("/MENEMUKAN")
  };

  const handlDapatClick = () => {
    navigate("/Mencari")
  };

  return (
    <div className="App">
      <div className="nav">
        <b>
          <a href="/home">Home</a>
          <a className="login" href="#">
            Login
          </a>
        </b>
      </div>

      <div>
        <button className="menemukan" onClick={handleMenemukanClick}>
          MENEMUKAN
        </button>
        <div>
          <button className="dapat" onClick={handlDapatClick}>MENCARI</button>
        </div>
      </div>
    </div>
  );
};

export default App;