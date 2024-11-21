import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "../Assets/Vector.svg";

const SideBar = () => {
  return (
    <div className="flex flex-col items-center pt-2 bg-gray-50 h-screen">
      <Link to="/">
        <img src={HomeIcon} alt="Home" className="cursor-pointer" />
      </Link>

      <Link to="/home">
        <img
          src={HomeIcon}
          alt="FloorManagment"
          className="mt-8 cursor-pointer"
        />
      </Link>
    </div>
  );
};

export default SideBar;
