import React, { Component } from "react";
import axios from "axios";
import "./styles/Chat.css";
import Sidebar from "./Sidebar";
import Messages from "./Messages";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

//current working v

class Chat extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      channels: [],
      selected: "",
      wHeight: 0,
      nHeight: 0,
      willRerender:false
    };
  }
  
  componentDidMount() {
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };
    //make a get request via axios to get channel list
    axios
      .get(`${process.env.REACT_APP_API}/channels`, config)
      .then(res => {
        //set active state to true for the first channel
        res.data[0].active = true;
        //then save to the state variables
        this.setState({ channels: res.data, selected: res.data[0]._id });
        localStorage.setItem("channel", res.data[0]._id);
      })
      .catch(err => console.log(err));
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  redirect = () => {
    this.props.history.push("/login");
  };

  changeChannel = id => {
    let channelCopy = this.state.channels;
    channelCopy.map(e => (e.active = false));
    channelCopy.find(e => e._id === id).active = true;
    this.setState({ channels: channelCopy, selected: id });
  };

  updateDimensions = () => {
    if (window.innerWidth >= 600) {
      this.setState({
        wHeight: window.innerHeight,
        nHeight: window.innerHeight
      });
    } else {
      this.setState({
        wHeight: window.innerHeight - 180,
        nHeight: 180
      });
    }
  };

  shouldRerender = x=>{
    this.setState({willRerender:x})
    }

  // Render
  render() {
    return (
      <div id="wrap">
        <Grid container justify="center" alignItems="center">
          <Box clone order={{ xs: 2, sm: 1 }}>
            <Grid item xs={12} sm={3} md={3}>
              <div style={{ height: `${this.state.nHeight}px` }} id="nav">
                <Sidebar
                  redirect={this.redirect}
                  changeChannel={this.changeChannel}
                  channels={this.state.channels}
                  shouldRerender={this.shouldRerender}
                />
              </div>
            </Grid>
          </Box>
          <Box clone order={{ xs: 1, sm: 2 }}>
            <Grid item xs={12} sm={9} md={9}>
              <div
                style={{ height: `${this.state.wHeight}px`, overflow: "auto" }}
                id="test"
              >
                <Messages selected={this.state.selected} 
                willRerender={this.state.willRerender}
                shouldRerender={this.shouldRerender}/>
              </div>
            </Grid>
          </Box>
        </Grid>
      </div>
    );
  }
}

export default Chat;

