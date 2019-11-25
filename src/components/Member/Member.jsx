import React from "react";
import classes from "./Member.module.css";

const member = props => {
  const addDefaultSrc = ev =>
    (ev.target.src = "http://localhost:5000/defaultUserImage.png");

  return (
    <div onClick={props.clicked} className={classes.Member}>
      <div className={classes.upperContainer}>
        <div className={classes.profileImg}>
          <img
            src={props.image}
            alt={`${props.name} profile`}
            onError={addDefaultSrc}
          />
        </div>
        <p className={classes.name}>{props.name}</p>
      </div>

      <p className={classes.age}>{props.age} years old</p>
    </div>
  );
};

export default member;
