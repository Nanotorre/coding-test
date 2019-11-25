import React, { Component } from "react";
import MediasmartService from "./services/MediasmartService";
import Layout from "./hoc/Layout/Layout";
import Members from "./containers/Members/Members";
import MemberDetail from "./components/MemberDetail/MemberDetail";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      page: 0,
      selectedPage: 0,
      size: 6,
      viewMember: false,
      lastPage: false
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
    if(nextPage === this.state.members.length) {
      this.setState({
        lastPage: true
      });
      return;
    }
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
        selectedPage: prevPage,
        lastPage: false
      });
    }
  };

  displayMemberHandler = id => {
    let memberSelected = this.state.members
      .flat()
      .filter(member => member.id === id)[0];

    this.setState({
      viewMember: true,
      selectedMember: memberSelected
    });
  };

  closeMemberHandler = () => {
    this.setState({
      viewMember: false
    });
  };

  homeHandler = () => {
    this.setState({
      selectedPage: 0
    });
  }

  
  render() {
    let members = <div className="spinner"></div>;

    if (this.state.members[this.state.selectedPage]) {
      const membersPage = this.state.members[this.state.selectedPage];
      members = (
        <React.Fragment>
          {this.state.viewMember && (
            <div
            className={
                this.state.viewMember
                  ? "modal is-active fade-in-bck"
                  : "modal fade-out "
              }
              onClick={this.closeMemberHandler}
            >
              <div className="modal-background"></div>
              <div className="modal-content">
                <MemberDetail
                  id={this.state.selectedMember.id}
                  name={this.state.selectedMember.name}
                  age={this.state.selectedMember.age}
                  image={this.state.selectedMember.image}
                  bio={this.state.selectedMember.bio}
                  clicked={this.closeMemberHandler}
                />
              </div>
            </div>
          )}
          <Members members={membersPage} clicked={this.displayMemberHandler} />
        </React.Fragment>
      );
    }

    return (
      <div className="App">
        <Layout
          clickPrev={this.prevPageHandler}
          clickNext={this.nextPageHandler}
          page={this.state.selectedPage}
          lastPage={this.state.lastPage}
          clicked={this.homeHandler}
        >
          <React.Fragment>{members}</React.Fragment>
        </Layout>
      </div>
    );
  }
}

export default App;
