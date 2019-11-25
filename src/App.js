import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
// import fetch from 'isomorphic-fetch';
//import axios from "axios";
import MediasmartService from "./services/MediasmartService";
import Layout from "./hoc/Layout/Layout";
import Members from "./containers/Members/Members";
import MemberDetail from "./components/MemberDetail/MemberDetail";
import Modal from './components/UI/Modal/Modal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      page: 0,
      selectedPage: 0,
      size: 6,
      viewMember:false
    };
    this.apiService = new MediasmartService();
    this.fetchMembers();
  }

  fetchMembers = (page = 0) => {
    return this.apiService
      .members(page, this.state.size)
      .then(response => {
        const membersUpdated = this.state.members.concat(
          this.paginationArray(response, this.state.size)
        );

        this.setState({
          members: membersUpdated,
          page
        });
      })
      .catch(err => console.log(err));
  };



  paginationArray = (arr, pagination_size) => {
    let paginated = [];
    while (arr.length) {
      paginated.push(arr.splice(0, pagination_size));
    }

    return paginated;
  };

  nextPageHandler = () => {
    const nextPage = this.state.selectedPage + 1;
    if (nextPage === this.state.members.length - 5) {
      const fetchPage = this.state.page + 1;
      this.fetchMembers(fetchPage);
      return;
    }

    this.setState({
      selectedPage: nextPage
    });
  };

  prevPageHandler = () => {
    if (this.state.selectedPage > 0) {
      const prevPage = this.state.selectedPage - 1;
      this.setState({
        selectedPage: prevPage
      });
    }
  };

  displayMemberHandler = (id) => {
    let memberSelected = this.state.members
    .flat()
    .filter(member => member.id === id)[0];

    this.setState({
      viewMember:true,
      selectedMember: memberSelected
    })
  };

  closeMemberHandler = () => {
    this.setState({
      viewMember:false
    })
  }


  render() {
    let members = <p>loading...</p>;

    if (this.state.members[this.state.selectedPage]) {
      const membersPage = this.state.members[this.state.selectedPage];
      members = (
        <React.Fragment>
           {this.state.viewMember && 
          <div class={this.state.viewMember? "modal is-active" : "modal"} onClick={this.closeMemberHandler}>
  <div class="modal-background"></div>
  <div class="modal-content">
  <MemberDetail
              id={this.state.selectedMember.id}
              name={this.state.selectedMember.name}
              age={this.state.selectedMember.age}
              image={this.state.selectedMember.image}
              bio={this.state.selectedMember.bio}
              clicked={this.closeMemberHandler}
            />  
   
  </div>
  <button class="modal-close is-large" aria-label="close" onClick={this.closeMemberHandler}></button>
</div>}
          {/* {this.state.selectedMember && 
            
            <Modal show={this.state.viewMember} modalClosed={this.closeMemberHandler}>
           
              <MemberDetail
              id={this.state.selectedMember.id}
              name={this.state.selectedMember.name}
              age={this.state.selectedMember.age}
              image={this.state.selectedMember.image}
              bio={this.state.selectedMember.bio}
            />  
          </Modal>} */}
          <Members members={membersPage} clicked={this.displayMemberHandler}/>
        </React.Fragment>
      );
    }

    return (
      <div className="App">
        {/* <header className="App-header">
          <div className="App-logo" alt="logo">
            #
          </div>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

          <button onClick={this.prevPageHandler}>Previous members</button>
          <button onClick={this.nextPageHandler}>Next members</button>
          <p>Page {this.state.selectedPage}</p>
        </header> */}
        <Layout
          clickPrev={this.prevPageHandler}
          clickNext={this.nextPageHandler}
          page={this.state.selectedPage}
        >
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return <React.Fragment>{members}</React.Fragment>;
              }}
            />

            <Route
              path="/members/:id"
              render={props => {
                let memberSelected = this.state.members
                  .flat()
                  .filter(member => member.id === props.match.params.id)[0];
            
                return (
                  <MemberDetail
                    id={memberSelected.id}
                    name={memberSelected.name}
                    age={memberSelected.age}
                    image={memberSelected.image}
                    bio={memberSelected.bio}
                  />
                );
              }}
            />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
