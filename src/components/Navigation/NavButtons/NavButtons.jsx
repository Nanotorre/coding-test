import React from "react";
import classes from "./NavButtons.module.css";
import Button from "../../UI/Button/Button";

const navButtons = props => {
  return (
    <div className={classes.NavButtons}>
      <Button btnType="navBtn" clicked={props.clickPrev} disable={props.page===0}>
        <span className="icon">
          <i className="fas fa-2x fa-angle-left"></i>
        </span>
      </Button>
      <p>{props.page}</p>
      <Button btnType="navBtn" clicked={props.clickNext} >
        <span className="icon">
          <i className="fas fa-2x fa-angle-right"></i>
        </span>
      </Button>
    </div>
  );
};

export default navButtons;
