import React, { Component } from "react";
import styles from "../styles/login.module.css";
import AnimatedBackground from './animated_background';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import api from "../src/apiCalls";
//require('dotenv').config();
//const jwt  = require('jsonwebtoken');


//PROPS
// user
// showLogin
// showProfile
// showCreateAccount
// guestView
export default class LoginScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
          }; 
        this.handleCreateAccount = this.handleCreateAccount.bind(this);    
        this.handleGoogleResponse = this.handleGoogleResponse.bind(this);
        this.generateIdentifier = this.generateIdentifier.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    async componentDidMount() {
        /* global google*/
       await google.accounts.id.initialize({
         client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
         callback: this.handleGoogleResponse
       });
   
       await google.accounts.id.renderButton(
         document.getElementById("signInDiv"), 
         {  theme: 'outline', 
            size: 'large', 
            width: '290px'   
        }
       );
     }

     // Called when "Create Profile" button is clicked
     handleCreateAccount() {
        let newUserData = {
            "google_verified": false,//maybe backend doesn't need this?
            "user_identifier" : this.generateIdentifier(),
            
        };
        this.props.showCreateProfile(newUserData);
     }

    async handleGoogleResponse(response) {
        // console.log("handleGoogleResponse()");
        // // decode google response and save to userGoogleData
        // var googleData = jwt.decode(response.credential);
        // console.log("google data:" + googleData);
        // // check to see if google user already has a profile:
        // let profileData = await this.props.lookUpUser(googleData['sub']);
        // console.log("profile data: " + profileData);
        // // if googleUser is does not have a BucketList profile,
        // // show create account form.
        // if (profileData.message === "no profile matching that user_identifier") {
        //     console.log("no profile data");
        //     let newUserData = {
        //         "google_verified": true,//maybe backend doesn't need this?
        //         "user_identifier" : googleData['sub']
        //     };
        //     this.props.showCreateProfile(newUserData);
        // // If google user has a profile already, set user in state to
        // // this user, and show profile view.
        // } else {
        //     console.log("profile data found");
        //     this.props.showProfileView(profileData, false);
        //     // change true to false after guestview is working
        // }
    }
 
    handleChange(e) {
        this.setState({ [e.currentTarget.id]: e.currentTarget.value });
    };

    generateIdentifier() {
        var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var userIdentifierLength = 12;
        var userIdentifier = "";
        for (var i = 0; i <= userIdentifierLength; i++) {
          var randomNumber = Math.floor(Math.random() * chars.length);
          userIdentifier += chars.substring(randomNumber, randomNumber +1);
         }
    
        return userIdentifier;
    }

    async handleLogin() {
        console.log("handleLogin()");
        console.log("handleLogin()");
        let body = '{"profile_name": "' + this.state.username + '",';
        body += '"password" : "' + this.state.password + '"}';
        console.log("body:" + body);
        //let body = '{ "profile_name": "Sleepy","password": "password"}';
        let options = {
            method: 'POST',
            headers: {'Content-Type':'application/json;charset=utf-8'},
            body: body
        };
        let profileData = await api.loginWithPassword(body, options);
        if (profileData.message === "no profile matching that user_identifier") {
            console.log("error");
        // If google user has a profile already, set user in state to
        // this user, and show praofile view.
        } else {
            console.log("profile data found");
            this.props.showProfileView(profileData, false);
            // change true to false after guestview is working
        }
    }
    

  render() {
    return (
        <div >
           <AnimatedBackground/>
            <div className={styles.login_button}>
                <form className={styles.form}>
                    <TextField
                        fullWidth
                        className={styles.textField}
                        label="Username"
                        id="username"
                        placeholder="username"
                        onChange={this.handleChange}
                        type="text"
                    />
                    <TextField
                        fullWidth
                        className={styles.textField}
                        label="Password"
                        id="password"
                        onChange={this.handleChange}
                        type="password"
                    />

                    <Button   
                        type="button"
                        className={styles.form_custom_button}
                        onClick={this.handleLogin}
                    >Log in</Button>

                    <Button   
                        type="button"
                        className={styles.form_custom_button}
                        onClick={this.handleCreateAccount}
                    >Create Account</Button>
                    {/* <div id="signInDiv"></div> */}
                </form>

            </div>
        </div>
    );
  }
}
