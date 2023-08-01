import React from 'react';
import '../styles/profile_view.module.css';
import MyAppBar from '../components/app_bar.js';
import BucketList from '../components/bucket_list';
import PeopleList from '../components/people_list';
import AboutMe from '../components/about_me';
import Box from '@mui/material/Box';
import DeepThoughts from '../components/deep_thoughts';
import Grid from '@mui/material/Grid';

//PROPS:
// profileName
// status
// bucketListData 
// deepThoughts
// friendsListData
// userIdentifier
// lookUpUser
// refreshUserData
// setUserToNull
// Boolean: guestView 
// viewUserProfile()
// viewGuestProfile()

// visitProfile()
class ProfileView extends React.Component {
    constructor(props){
        super(props);
        this.backgroundColor = '#577590';
    }
    render(){  
        return (
            <Box  sx={{ width: '100%', backgroundColor: 'transparent' }}>
                    <MyAppBar setUserToNull = {this.props.setUserToNull}/>
                    <Grid container 
                        spacing={3}                 
                        justifyContent="space-around"
                        alignItems="center"
                    >
                        <Grid item xs={12} sm={3} >
                        <AboutMe 
                            status = {this.props.data.status}
                            profileName = {this.props.data.profile_name}
                            userIdentifier = {this.props.data.user_identifier}
                            refreshUserData = {this.props.refreshUserData}
                            guestView = {this.props.guestView}
                            viewUserProfile = {this.props.viewUserProfile}
                        />  
                        </Grid>
                        <Grid item 
                            xs={12} 
                            sm={(this.props.guestView) ? 3: 9}   
                        >
                        <BucketList 
                            userIdentifier = {this.props.data.user_identifier}
                            bucketList = {this.props.data.bucket_list}
                            refreshUserData = {this.props.refreshUserData}
                            profileName = {this.props.data.profile_name}
                            guestView = {this.props.guestView}
                        />  
                        </Grid>
                        <Grid item 
                            xs={12} 
                            sm={this.props.guestView ? 3: 7}   
                        >
                        <DeepThoughts 
                            userIdentifier = {this.props.data.user_identifier}
                            deepThoughts = {this.props.data.deep_thoughts}
                            refreshUserData = {this.props.refreshUserData}
                            profileName = {this.props.data.profile_name}
                            guestView = {this.props.guestView}
                        
                        />
                        </Grid>
                        <Grid item 
                            sm={this.props.guestView ? 3: 5}   
                            xs={12}
                        >
                        <PeopleList 
                            userIdentifier = {this.props.data.user_identifier}
                            friendsListData = {this.props.data.friends_list}
                            refreshUserData = {this.props.refreshUserData}
                            profileName = {this.props.data.profile_name}
                            guestView = {this.props.guestView}
                            viewGuestProfile = {this.props.viewGuestProfile}
                        />  
                        </Grid>
                    </Grid>
            </Box>
        );
    }
    
}

export default ProfileView;