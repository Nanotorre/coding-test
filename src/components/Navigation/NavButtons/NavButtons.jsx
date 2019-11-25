import React from "react";
import classes from "./NavButtons.module.css";
import Button from "../../UI/Button/Button";

const navButtons = props => {
  return (
    <div className={classes.NavButtons}>
      <Button btnType="prevBtn" clicked={props.clickPrev} disable={props.page===0}>
        <span class="icon">
          <i class="fas fa-2x fa-angle-left"></i>
        </span>
      </Button>
      <p>{props.page}</p>
      <Button btnType="nextBtn" clicked={props.clickNext} >
        <span class="icon">
          <i class="fas fa-2x fa-angle-right"></i>
        </span>
      </Button>
    </div>
  );
};

export default navButtons;
