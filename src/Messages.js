import React, { Component } from "react";
import "./styles/Messages.css";
import "./styles/NewMessage.css";
import axios from "axios";
import Moment from "react-moment";

class Messages extends Component {
  // Data
  state = {
    messages: [],
    selected: this.props.selected,
    wallOpen: false
  };
  componentDidMount() {
    this.setState(
      {
        selected: this.props.selected,
        wallOpen: this.props.wallOpen
      }, //async function, so do stuffs after this happened
      () => {
        let config = {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        axios
          .get(
            `${process.env.REACT_APP_API}/messages?channel=${this.state.selected}`,
            config
          )
          .then(res => {
            res.data.reverse();
            this.setState({ messages: res.data });
          })
          .catch(err => console.log(err));
        this.forceUpdate();
      }
    );
  }

  // Lifecycle
  componentWillReceiveProps(newProps) {
    //when the props inherited from Chat changed from [] to something
    this.setState(
      {
        selected: newProps.selected,
        wallOpen: newProps.wallOpen
      }, //async function, so do stuffs after this happened
      () => {
        let config = {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        axios
          .get(
            `${process.env.REACT_APP_API}/messages?channel=${this.state.selected}`,
            config
          )
          .then(res => {
            res.data.reverse();
            this.setState({ messages: res.data });
          })
          .catch(err => console.log(err));
        this.forceUpdate();
      }
    );
  }

  // Render
  render() {
    return (
      <div id="messages">
        <div id="content">
          {this.state.messages.map(message => {
            return (
              <div className="message" key={message._id}>
                <div
                  className="userImageMessage"
                  style={{
                    backgroundImage: `url(${message.user.image})`
                  }}
                ></div>
                <div className="usrInfo">
                  <span className="user">{message.user.name}</span>
                  <span className="summaryText first">
                    {" "}
                    wants to meet up at{" "}
                  </span>
                  <span className="location">{message.location}</span>
                  <span className="summaryText"> on </span>
                  <span className="eventDate">
                    <Moment date={message.date} format="ll" />{" "}
                  </span>
                  <span> at </span>
                  <span className="eventTime">
                    <Moment date={message.date} format="LT" />
                  </span>
                </div>
                <div className="body">{message.text}</div>
                <span className="date">
                  <Moment
                    date={message.createDate}
                    format="MMMM Do YYYY, h:mm:ss a"
                  />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Messages;
