import React, { Component } from "react";
import axios from "axios";
import "./styles/Sidebar.css";
import MaterialUIPickers from "./MaterialUIPickers";

class Sidebar extends Component {
  // Data
  state = {
    channels: [],
    currentUser: {
      name: "",
      email: "",
      image: "",
      intro: ""
    },
    wallOpen: false
  };
  // Lifecycle
  componentWillMount() {
    //when mounted, get name and email from the local storage
    let user = {
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      image: localStorage.getItem("image"),
      intro: localStorage.getItem("intro")
    };
    this.setState({ currentUser: user });
  }
  componentWillReceiveProps(newProp) {
    //when sidebar receives a new prop (from [] to something) set state variables
    this.setState({ channels: newProp.channels });
  }
  // Methods
  logout = () => {
    localStorage.clear();
    this.props.redirect();
  };
  //operation
  selectChannel = thisId => {
    this.props.changeChannel(thisId);
  };
  openWall = () => {
    this.setState({
      wallOpen: true
    });
  };
  closeWall = () => {
    this.setState({
      wallOpen: false
    });
  };
  // Render
  render() {
    return (
      <div id="sidebar">
        <img
          src="https://res.cloudinary.com/jesskcloud/image/upload/v1586161244/hitmeup_logo_trans_axrm3h.png"
          className="Sidebarlogo"
        />
        <div className="userInfo">
          <div
            className="userImage"
            style={{
              backgroundImage: `url(${this.state.currentUser.image})`
            }}
          ></div>
          <p>Hello!</p>
          <span className="userName">
            {this.state.currentUser.name.charAt(0).toUpperCase() +
              this.state.currentUser.name.slice(1)}
          </span>

          <p id="userEmail">{this.state.currentUser.email}</p>
          <button onClick={this.openWall} id="meetup">
            <span>HITMEUP</span>
          </button>
        </div>
        <ul className="list-unstyled">
          {this.state.channels.map((channel, i) => {
            return (
              <li
                key={channel._id}
                className={channel.active ? "active" : ""}
                onClick={() => this.selectChannel(channel._id)}
              >
                <i className="fas fa-check"></i>
                {channel.name}
              </li>
            );
          })}
        </ul>
        <button onClick={this.logout} id="logoutBtn">
          Logout
        </button>
        <div id="wall" className={this.state.wallOpen ? "open" : ""}>
          <div id="card">
            <i
              id="close"
              className="fas fa-fw fa-times"
              onClick={() => this.closeWall()}
            ></i>
            <h4>What are the details?</h4>
            <MaterialUIPickers />
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
