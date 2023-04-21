  import * as React from 'react';
  import TextField from '@mui/material/TextField';
  import Button from '@mui/material/Button';
  import "./css/login.css";
  import AnimatedBackground from './animated_background';
  import api from './apiCalls';


  export class CreateProfileForm extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        status: "",
        profileName: "",
        //googleVerified: false,
        password: ""
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleCreateProfile = this.handleCreateProfile.bind(this);
      this.createProfile = this.createProfile.bind(this);
      //this.generateIdentifier = this.generateIdentifier.bind(this);
    }
    
  async createProfile(newUserData) {//includes "identifier" and "google_verified"
    let userData = newUserData;
    console.log("userData:" + userData);
    userData['profile_name'] = this.state.profileName;
    userData['status'] = this.state.status;
    userData['password'] = this.state.password;
    // userData['bucket_list'] = [];
    // userData['deep_thoughts'] = [];
    //test
    console.log("user data sent to create new profile:");
    console.log(userData);
    var newProfile = await api.createUser(JSON.stringify(userData));

    return newProfile;
  }


  handleChange(e) {
    this.setState({ [e.currentTarget.id]: e.currentTarget.value });
  };
  
  async handleCreateProfile() {
    var newProfile = await this.createProfile(this.props.newUserData)
    this.props.showProfileView(newProfile); 
  }

  render() {
    return (
      <div>   
        <AnimatedBackground />
          <form className='form'>    
            <TextField
              fullWidth
              className="textField"
              label="Choose a Profile Name"
              id="profileName"
              placeholder={"Choose a Profile Name"}   
              onChange={this.handleChange}
              type="text"
            />

            {!this.props.newUserData.google_verified ?
            <TextField
              fullWidth
              className="textField"
              label="Choose a Password"
              id="password"
              placeholder={"Choose a Password"}     
              onChange={this.handleChange}
              type="text"
            />: null}

            <TextField
              fullWidth
              className="textField"
              label="Current Status"
              id="status"
              placeholder={"Current Status"}     
              onChange={this.handleChange}
              type="text"
            />

            <Button   
              type="button"
              className="form__custom-button"
              onClick={this.handleCreateProfile}
            >Create Profile</Button>
            
          </form>
      </div>
    );
  }
  
}

export default CreateProfileForm;
