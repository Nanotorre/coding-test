import React from "react";
import classes from "./NavBar.module.css";
import logo from "../../../assets/images/logo-mediasmart.png";
import backgroundDots from "../../../assets/images/bck-dots.png";
import NavButtons from '../NavButtons/NavButtons'

const navBar = props => {
  return (
    <nav
      className={classes.NavBar}
      style={{ backgroundImage: `url(${backgroundDots})` }}
    >
      <div className={classes.logoContainer}>
        <img src={logo} alt="Mediasmart logo"></img>
      </div>
      <h1>MEMBERS</h1>
      <NavButtons
            clickPrev={props.clickPrev}
            clickNext={props.clickNext}
            page={props.page}
          />
    </nav>
  );
};

export default navBar;