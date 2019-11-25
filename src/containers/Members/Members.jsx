import React from "react";
import Member from "../../components/Member/Member";
import { withRouter } from "react-router-dom";
import classes from './Members.module.css';
import Modal from '../../components/UI/Modal/Modal';

const members = props => {
  const displayMemberHandler = id => {
    props.history.push(`/members/${id}`);
  };

  let displayMembers = props.members.map(eachMember => {
    return (
      <Member
        key={eachMember.id}
        id={eachMember.id}
        image={eachMember.image}
        name={eachMember.name}
        age={eachMember.age}
        // clicked={()=>displayMemberHandler(eachMember.id)}
        clicked={()=>props.clicked(eachMember.id)}
      />
    );
  });

  return (
  
  
  <section className={[classes.Members, "fade-in"].join(' ')}>

    {/* <Modal show={this.state.viewMember} modalClosed={this.purchaseCancelHandler}/> */}
    {displayMembers}
    </section>
    
    
    
    );
};

export default withRouter(members);
