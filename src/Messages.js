import React, { Component } from "react";
import "./styles/Messages.css";
import "./styles/NewMessage.css";
import axios from "axios";
import Moment from "react-moment";

class Messages extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      messages: [],
      willRerender:this.props.willRerender,
      fetchMessages:this.fetchMessages.bind(this),
      shouldRerender:this.props.shouldRerender.bind(this)
    };
  }
  
  static getDerivedStateFromProps(props,state){
    if(props.willRerender !== state.willRerender){
      state.fetchMessages()
      state.shouldRerender(false);
      return null
    }
    return null
  }

  fetchMessages = () => {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };
    axios
      .get(
        `${process.env.REACT_APP_API}/messages?channel=${this.props.selected}`,
        config
      )
      .then(res => {
        res.data.reverse();
        this.setState({ messages: res.data });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.fetchMessages();
  }

  // Lifecycle
  componentDidUpdate(prevProps) {
    const { selected } = this.props;
    // if selected prop changed, refetch data
    if (prevProps.selected !== selected) {
      this.fetchMessages();
    }
  }

  // Render
  render() {
    const {messages}=this.state
    return (
      <div id="messages">
        <div id="content">
          {messages.map(message => {
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
