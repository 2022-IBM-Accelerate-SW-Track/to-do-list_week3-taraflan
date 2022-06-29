import React, { Component } from 'react';
import "./About.css";
import pic from "../assets/pic.png"; 
import af_pic from "../assets/af_pic.JPG"; 
import { Box, TextField } from "@mui/material";


export default class About extends Component {
  render() {
    return (
      
      <div>
          <div className="irish">
            
              Let's Go IRISH!!
            
          </div>
        
      
      <div class="split left">
        <div className="centered">
        
          <img 
            className="profile_image"
            // Image goes here
            src = {pic}
            alt="Profile Pic"
            ></img>
            
        </div>
      </div>
      <div className="split right">
        <div className="centered">
          <div className="name_title">Tara Flannery</div>
          <div className="brief_description">
            Hello reader! My name is Tara Flannery and I am a rising junior Computer Science major 
            at the University of Notre Dame. I am a Cadet within Air Force ROTC Detachment 225 
            (pictured below). I am from Northern Virginia-- right outside of D.C. (pictured to the left).
          </div>

          <img
            className="profile_image"
            // Image goes here
            src = {af_pic}
            alt="Air Force Pic"
          ></img>

          

          <div className="down left2">
            <div className="brief_description">
                Let me know if you have any questions!(: 
            </div>
              <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' },}}
                noValidate
                autoComplete="off"
              >
                <TextField 
                label="Type here"
                variant="outlined"
                id="outlined-basic" 
                onChange= { this.handleChange } 
                //value={ this.state.content }
                />
              </Box>
          </div>
        </div>
      </div>
    </div>
    )
  }
}