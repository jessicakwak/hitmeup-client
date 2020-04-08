import React, { Component } from "react";
import axios from "axios";
import "./styles/Sidebar.css";
import MaterialUIPickers from "./MaterialUIPickers";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import Moment from "react-moment";

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
    wallOpen: false,
    newMessage: {
      text: "",
      eventDate: moment().format("YYYY-MM-DD"),
      inDateFormat: Date.now(),
      // eventTime: ''
      location: "default",
      time: ""
    }
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
  createMessage = e => {
    e.preventDefault();
    let dataToSend = {
      user: {
        _id: "",
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email")
      },
      text: this.state.newMessage.text,
      channel: this.state.selected,
      location: this.state.newMessage.location,
      date: this.state.newMessage.inDateFormat
    };

    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };
    axios
      .post(`${process.env.REACT_APP_API}/messages`, dataToSend, config)
      .then(response => {
        let msgCopy = this.state.messages;
        msgCopy.unshift(response.data);
        this.setState({ messages: msgCopy });
        this.forceUpdate();
      })
      .catch(err => {
        console.log(err);
      });
    let clearedMsg = this.state.newMessage;
    clearedMsg.text = "";
    this.setState({ newMessage: clearedMsg });
  };

  // Methods
  logout = () => {
    localStorage.clear();
    this.props.redirect();
  };
  //operation
  selectChannel = thisId => {
    this.props.changeChannel(thisId);
    localStorage.setItem("channel", thisId);
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
    window.location.reload(false);
  };
  // Render
  render() {
    return (
      <div id="sidebar">
        <Grid container>
          <Grid item xs={3} sm={12} md={12}>
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
            </div>
          </Grid>
          <Grid item xs={3} sm={12} md={12}>
            <button onClick={this.openWall} id="meetup">
              <span>HITMEUP</span>
            </button>
          </Grid>
          <Grid item xs={4} sm={12} md={12}>
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
          </Grid>
          <Grid item xs={2} sm={12} md={12}>
            <button onClick={this.logout} id="logoutBtn">
              Logout
            </button>
          </Grid>
        </Grid>
        <div id="wall" className={this.state.wallOpen ? "open" : ""}>
          <div id="card">
            <i
              id="close"
              className="fas fa-fw fa-times"
              onClick={() => this.closeWall()}
            ></i>
            <h4>What are the details?</h4>
            <MaterialUIPickers closeWall={this.closeWall} />
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
