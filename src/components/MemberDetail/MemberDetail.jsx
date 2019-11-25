import React from "react";
import classes from "./MemberDetail.module.css";

const memberDetail = props => {
  const addDefaultSrc = ev =>
    (ev.target.src = "http://localhost:5000/defaultUserImage.png");

  return (
    <div key={props.id} className={classes.MemberDetail}>
      <div className={classes.imgContainer}>
        <img
          src={props.image}
          alt={`${props.name} profile`}
          onError={addDefaultSrc}
        />
      </div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
      <p>Biography: {props.bio}</p>
      <button onClick={props.clicked}>Go back</button>
    </div>
  );
};
export default memberDetail;
