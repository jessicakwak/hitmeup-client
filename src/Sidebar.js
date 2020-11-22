import React, { Component } from "react";
import axios from "axios";
import "./styles/Sidebar.css";
import MaterialUIPickers from "./MaterialUIPickers";
import Grid from "@material-ui/core/Grid";

class Sidebar extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
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
        location: "",
        eventDate: Date.now()
      }
    };
  }
  
  // Lifecycle
  componentDidMount() {
    //when mounted, get name and email from the local storage
    let user = {
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      image: localStorage.getItem("image"),
      intro: localStorage.getItem("intro")
    };
    this.setState({ currentUser: user });
  }

  static getDerivedStateFromProps(props, state){
    if(props.channels!==state.channels){
      return {
        channels:props.channels
      }
    }
    return null;
  }

  changeText = e => {
    let copy = this.state.newMessage;
    copy.text = e.target.value;
    this.setState({ newMessage: copy });
  };

  changeDate = input => {
    let copy = this.state.newMessage;
    copy.eventDate = input;
    this.setState({ newMessage: copy });
  };

  changeLoc = e => {
    let copy = this.state.newMessage;
    copy.location = e.target.value;
    this.setState({ newMessage: copy });
  };

  createMessage = e => {
    e.preventDefault();
    let dataToSend = {
      user: {
        _id: "",
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email")
      },
      text: this.state.newMessage.text,
      channel: localStorage.getItem("channel"),
      location: this.state.newMessage.location,
      date: this.state.newMessage.eventDate
    };
    console.log(dataToSend);
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };
    axios
      .post(`${process.env.REACT_APP_API}/messages`, dataToSend, config)
      .then(response => {
        // console.log(response);
        if (response) {
          this.closeWall();
          this.props.shouldRerender(true);
        }
      })
      .catch(err => {
        console.log(err);
      });

    // document.getElementById("wall").classList.remove("open");
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
  };
  // Render
  render() {
    const {currentUser, channels} =this.state
    return (
      <div id="sidebar">
        <Grid container>
          <Grid item xs={4} sm={12} md={12}>
            <img
              src="https://res.cloudinary.com/jesskcloud/image/upload/v1586161244/hitmeup_logo_trans_axrm3h.png"
              className="Sidebarlogo"
              alt="Sidebarlogo"
            />
            <div className="userInfo">
              <div
                className="userImage"
                style={{
                  backgroundImage: `url(${currentUser.image})`
                }}
              ></div>
              <p>Hello!</p>
              <span className="userName">
                {currentUser.name.charAt(0).toUpperCase() +
                  currentUser.name.slice(1)}
              </span>
              <p id="userEmail">{currentUser.email}</p>
              <button onClick={this.openWall} id="meetup">
                <span>HITMEUP</span>
              </button>
            </div>
          </Grid>
          <Grid item xs={5} sm={12} md={12}>
            <ul className="list-unstyled">
              {channels.map((channel, i) => {
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
          <Grid item xs={3} sm={12} md={12}>
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
            <MaterialUIPickers
              closeWall={this.closeWall}
              changeText={this.changeText}
              changeDate={this.changeDate}
              changeLoc={this.changeLoc}
              createMessage={this.createMessage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
