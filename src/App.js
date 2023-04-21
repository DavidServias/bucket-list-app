import React from 'react';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileView from './profile_view';
import api from './apiCalls';
import LoginScreen from './login';
import CreateProfileForm from './createProfileForm';
import AnimatedBackground from './animated_background';
require('dotenv').config();


class App extends React.Component  {    
  constructor(props) {
    super(props);
    this.state= {
      user: null,
      profileBeingVisited: null,
      guestView: false,
      showLogin: true,
      showProfile: false,
      showCreateAccount: false,
    };
    this.lookUpUser = this.lookUpUser.bind(this);
    this.refreshUserData = this.refreshUserData.bind(this);
    this.setUserToNull = this.setUserToNull.bind(this);
    this.showCreateProfile = this.showCreateProfile.bind(this);
    this.showLoginPage = this.showLoginPage.bind(this);
    this.showProfileView = this.showProfileView.bind(this);
    this.viewUserProfile = this.viewUserProfile.bind(this);
    this.viewGuestProfile = this.viewGuestProfile.bind(this);

  }

  showCreateProfile(newUserProfileData) {
    this.setState({
      showLogin:false,
      showProfile: false,
      showCreateAccount: true,
      user: newUserProfileData
    });
  }

  showLoginPage() {
    this.setState({
      user: null,
      showLogin:true,
      showProfile: false,
      showCreateAccount: false,
      guestView: false
    });
  }

  showProfileView(userProfileData, guestView) {
    console.log(userProfileData);
    this.setState({
      user: userProfileData,
      showLogin:false,
      showProfile: true,
      showCreateAccount: false,
      guestView: guestView
    });
  }
 
  async lookUpUser(userIdentifier) {
    let dataFromUser = await api.getUserByIdentifier(userIdentifier);
    console.log("data:" + dataFromUser);
    return dataFromUser;
  }

  async refreshUserData(userIdentifier) {
    console.log("refreshUserData()");
    console.log(userIdentifier);
    let latestUserData = await api.getUserByIdentifier(userIdentifier);
    this.showProfileView(latestUserData);
  }

  async visitProfile(userIdentifier) {
    console.log("visitProfile()");
    let profileDataToVisit = await api.getUserByIdentifier(userIdentifier);    
    this.showProfileView(profileDataToVisit);
    this.setState({
      profileBeingVisited: profileDataToVisit,
      guestView: true
    });
  }

  setUserToNull() {
    console.log("handleSignOut()");
    this.setState({user: null});
    this.showLoginPage();
  }

  viewUserProfile() {
    let stateUpdate = {guestView: false};
    this.setState(stateUpdate);
  }

  async viewGuestProfile(userIdentifier) {
      console.log("viewGuesProfile called from APP");
      console.log("userIdentifier: " + userIdentifier);
      let profileData = await api.getUserByIdentifier(userIdentifier);
      console.log(profileData); 
      this.setState({ 
          guestView: true,
          profileBeingVisited: profileData, 
          showLogin:false,
          showProfile: true,
          showCreateAccount: false
      });
  }

  render() {
    return (
      <div className="App">
          <AnimatedBackground/>
        { (this.state.showLogin) ?
          (<LoginScreen 
            lookUpUser = {this.lookUpUser}
            showProfileView = {this.showProfileView}
            showCreateProfile = {this.showCreateProfile}
          />) 
          : null}

        {(this.state.showProfile) ?
          <ProfileView 
            
            data = {(this.state.guestView) ? this.state.profileBeingVisited : 
                this.state.user}
            // profileName = {this.state.user['profile_name']}
            // status = {this.state.user['status']}
            // bucketListData ={this.state.user['bucket_list']} 
            // deepThoughts = {this.state.user['deep_thoughts']}
            // friendsListData = {this.state.user['friends_list']}
            // userIdentifier = {this.state.user['user_identifier']}
            
            guestView = {this.state.guestView}
            test = {this.state.test}
            viewUserProfile = {this.viewUserProfile}
            lookUpUser = {this.lookUpUser}
            refreshUserData = {this.refreshUserData}
            setUserToNull = {this.setUserToNull}
            viewGuestProfile = {this.viewGuestProfile}
            // visitProfile = {this.visitProfile}
          /> 
          : null
        }

        {(this.state.showCreateAccount) ? 
          <CreateProfileForm
            newUserData={this.state.user}
            showProfileView={this.showProfileView}
          /> : null
        }

      </div>    
    );
  }
}


export default App;
