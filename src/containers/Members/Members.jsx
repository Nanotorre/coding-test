import React from "react";
import Member from "../../components/Member/Member";
import classes from './Members.module.css';


const members = props => {

  let displayMembers = props.members.map(eachMember => {
    return (
      <Member
        key={eachMember.id}
        id={eachMember.id}
        image={eachMember.image}
        name={eachMember.name}
        age={eachMember.age}
        clicked={()=>props.clicked(eachMember.id)}
      />
    );
  });

  return (
  <section className={[classes.Members, "fade-in"].join(' ')}>
    {displayMembers}
    </section>
    );
};

export default members;