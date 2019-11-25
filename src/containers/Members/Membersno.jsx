import React, { Component} from "react";
import Member from "../../components/Member/Member";
import { withRouter } from "react-router-dom";
import classes from './Members.module.css';
import Modal from '../../components/UI/Modal/Modal';

class members extends Component {
  state={
    viewMember: false,
  }

  displayMemberHandler = () => {
    this.setState({
      viewMember:true
    })
  };

  closeMemberHandler = () => {
    this.setState({
      viewMember:false
    })
  }

  

  


  render () {
    let displayMembers = this.props.members.map(eachMember => {
      return (
        <Member
          key={eachMember.id}
          id={eachMember.id}
          image={eachMember.image}
          name={eachMember.name}
          age={eachMember.age}
          clicked={this.displayMemberHandler}
        />
      );
    });
    return (
  
  
      <section className={[classes.Members, "fade-in"].join(' ')}>
    
        <Modal show={this.state.viewMember} modalClosed={this.closeMemberHandler}>
          
        </Modal>
        {displayMembers}
        </section>
        
        
        
        );
    

  }
  




};

export default withRouter(members);
