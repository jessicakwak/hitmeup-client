import React, { Component } from "react";
import "./styles/Messages.css";
import "./styles/NewMessage.css";
import axios from "axios";
import moment from "moment";
import Moment from "react-moment";
import MaterialUIPickers from "./MaterialUIPickers";

class Messages extends Component {
  // Data
  state = {
    newMessage: {
      text: "",
      eventDate: moment().format("YYYY-MM-DD"),
      inDateFormat: Date.now(),
      // eventTime: ''
      location: "default",
      hour: 0,
      minuite: 0
    },
    messages: [],
    selected: this.props.selected
  };
  componentDidMount() {
    // this.scroll()
  }
  // Lifecycle
  componentWillReceiveProps(newProps) {
    //when the props inherited from Chat changed from [] to something
    this.setState(
      {
        selected: newProps.selected
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
      }
    );
  }
  // Methods
  // scroll = () => {
  // 	let box = document.querySelector('#content')
  // 	box.scrollTo({
  // 		top: box.scrollHeight
  // 	})
  // }

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

  changeText = e => {
    let newMessage = this.state.newMessage;
    newMessage.text = e.target.value;
    this.setState({ newMessage });
  };

  changeDate = e => {
    let newMessage = this.state.newMessage;
    newMessage.eventDate = e.target.value;
    var parts = e.target.value.split("-");
    var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
    newMessage.inDateFormat = mydate;
    this.setState({ newMessage });
  };
  changeTime = e => {
    // console.log(e.target.id);
    let newMsg = this.state.newMessage;
    newMsg[e.target.id] = e.target.value;
    this.setState({ newMessage: newMsg });
  };

  changeLocation = e => {
    let newMsg = this.state.newMessage;
    newMsg.location = e.target.value;
    this.setState({ newMessage: newMsg });
  };

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
                    <Moment date={message.date} format="dddd, MMM Do YYYY" />
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

// <div id="new-message">
// 	<MaterialUIPickers />
// </div>

// <form
// 	onSubmit={e => {
// 		this.createMessage(e);
// 	}}
// >
// 	<div className="dateTimePlace">
// 		<label>When do you want to meet?</label>
// 		<input
// 			type="date"
// 			value={this.state.newMessage.eventDate}
// 			onChange={this.changeDate}
// 		/>
// 		<input
// 			type="number"
// 			id="hour"
// 			onChange={this.changeTime}
// 			min="1"
// 			max="12"
// 		/>
// 		<span>:</span>
// 		<input
// 			type="number"
// 			id="minuite"
// 			onChange={this.changeTime}
// 			min="1"
// 			max="59"
// 		/>
// 		<select>
// 			<option>AM</option>
// 			<option>PM</option>
// 		</select>
// 		<input
// 			type="text"
// 			id="location"
// 			placeholder="Where?"
// 			onChange={this.changeLocation}
// 		></input>
// 	</div>
// 	<div className="textContent">
// 		<textarea
// 			placeholder="Enter a message"
// 			onChange={this.changeText}
// 		></textarea>
// 	</div>
// 	<div className="submitButton">
// 		<button type="submit" className="positive">
// 			Send
// 		</button>
// 	</div>
// </form>
