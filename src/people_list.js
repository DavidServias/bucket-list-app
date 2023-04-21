import React from 'react';
import { Component } from 'react';
import './css/profile.css';
import api from './apiCalls';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Decorator from './card_decorator.js';
import getIconColor from './getIconColor.js';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';


// PROPS:
// userIdentifier 
// friendsListData 
// refreshUserData 
// profileName
// guestView 
// viewGuestProfile()
export class PeopleList extends Component {
    constructor(props) {
        super(props);
        this.followAccount = this.followAccount.bind(this);
        this.getSuggestedAccounts = this.getSuggestedAccounts.bind(this);
        this.addItemPlaceholderText = "Add an Item to Your Bucket List";
        this.removeAccount = this.removeAccount.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.state = {
          accountsToDisplay: "following",
          newItem: "",
          followedAccounts: [],
          suggestedAccounts: [], };
    }

    async componentDidMount() {  
      // initialize followedAccounts()
      await this.getSuggestedAccounts();  
    }

    async removeAccount(accountIdentifier)  {
      console.log("removeAccount()");
      await api.unfollow(this.props.userIdentifier, accountIdentifier);
      await this.getSuggestedAccounts();
      this.props.refreshUserData(this.props.userIdentifier);
    };
  
    async followAccount (accountSummary)  {
      console.log("followAccount()");
      await api.follow(this.props.userIdentifier, accountSummary);
      await this.getSuggestedAccounts();
      this.props.refreshUserData(this.props.userIdentifier);
    };
  
    async getSuggestedAccounts(){
      console.log("getSuggestedAccounts()");
      let accounts = await api.findFriends(this.props.userIdentifier, this.props.friendsListData);
      console.log("suggestedAccounts");
      console.log(accounts);
      this.setState({
        suggestedAccounts: accounts,
        accountsToDisplay: 0
      });
    }

    handleTabChange = (event, newValue) => {
      this.setState({accountsToDisplay: newValue});
    };

    
    render(){
        return ( 
            <Decorator>
              <div id="people-list-container">
              <div id="people_list">
              <Tabs value={this.state.accountsToDisplay} onChange={this.handleTabChange} centered>
                <Tab label="Following" />
                {this.props.guestView ? null: <Tab label="Suggested" />}
              </Tabs>
              
              {this.state.accountsToDisplay === 0 && 
                  <List style={{maxHeight: 325, overflow: 'auto'}}>
                  <FollowedList 
                    data={this.props.friendsListData}
                    refreshUserdata = {this.props.refreshUserdata}
                    removeAccount = {this.removeAccount}
                    userIdentifier = {this.props.userIdentifier}
                    guestView = {this.props.guestView}
                    viewGuestProfile = {this.props.viewGuestProfile}
                  />
                </List> 
              }

              {this.state.accountsToDisplay === 1 && 
                <SuggestionsList 
                    userIdentifier = {this.props.userIdentifier}
                    refreshUserdata = {this.props.refreshUserdata}
                    followAccount = {this.followAccount}
                    data = {this.state.suggestedAccounts} 
                  />
              
              }
 
              </div>
            </div>
            </Decorator>

        );
    }
}



// PROPS:
// data={this.props.friendsListData}
// refreshUserdata = {this.props.refreshUserdata}
// removeAccount = {this.removeAccount}
// userIdentifier = {this.props.userIdentifier}
// guestView = {this.props.guestView}
// viewGuestProfile = {this.props.viewGuestProfile}
function FollowedList(props) {
  console.log("followedList():");
  console.log(props.data);
  return (
    <List style={{maxHeight: 300, overflow: 'auto'}}>
        {!props.data ? <h1>Loading</h1>:
          props.data.map(function (friend) {
         
          return (
            <AccountSummary 
              following = {true}
              accountSummaryName = {friend['account_summary_name']}
              accountSummaryStatus = {friend['account_summary_status']}
              key = {friend['account_identifier']}
              accountIdentifier = {friend['account_identifier']}
              userIdentifier = {props.userIdentifier}
              refreshUserdata = {props.refreshUserdata}
              removeAccount = {props.removeAccount}
              friendsListData = {props.friendsListData}
              guestView = {props.guestView}
              viewGuestProfile = {props.viewGuestProfile}
            />

          );
        })}
      </List>
    );
};


function SuggestionsList(props) {
  return (
    <div>
     
     <List style={{maxHeight: 300, overflow: 'auto'}}>
      { !props.data ? <h1>Loading</h1>:
          props.data.map(function (friend) {
          return (
            <AccountSummary 
              following = {false}
              accountSummaryName = {friend['account_summary_name']}
              accountSummaryStatus = {friend['account_summary_status']}
              key = {friend['account_identifier']}
              accountIdentifier = {friend['account_identifier']}
              refreshUserdata = {props.refreshUserdata}
              followAccount = {props.followAccount}
              userIdentifier = {props.userIdentifier}
            /> 
          
          );
        }) 
        }
        
      </List>
        
      </div>
    );
};

 
//PROPS:
// following
// accountSummaryName 
// accountSummaryStatus 
// key 
// accountIdentifier
// userIdentifier 
// refreshUserdata 
// removeAccount 
// friendsListData 
// guestView 
//  visitGuestProfile()
function AccountSummary(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = function() {
    const data = {
      account_summary_name:props.accountSummaryName,
      account_summary_status: props.accountSummaryStatus,
      account_identifier: props.accountIdentifier
    };
    
    props.following ? props.removeAccount(props.accountIdentifier):
      props.followAccount(data);

  };
  
  const visitProfile = function () {
    console.log("visiting " + props.accountIdentifier );
    props.viewGuestProfile(props.accountIdentifier);
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  
  return (
    <div>
    <ListItem alignItems="flex-start" 
        secondaryAction=       
            {props.guestView ? "": <IconButton 
                                      edge="end" 
                                      aria-label="person_remove"
                                      onClick={handleClick}
                                    >
                                    {props.following ? <PersonRemoveIcon/>: 
                                      <PersonAddIcon/> }
                                    </IconButton>
            }
    >   
    
          <ListItemButton onClick={props.following ? visitProfile : handleOpen}>
              <ListItemAvatar>
                <Avatar sx={{bgcolor: getIconColor(props.accountSummaryName) }} >{props.accountSummaryName[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={props.accountSummaryName}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline'}}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Status: 
                    </Typography>
                    "{props.accountSummaryStatus}"
                  </React.Fragment>
                }
              />
              </ListItemButton>
             
         
     

 <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <ListItemAvatar>
              <Avatar 
                sx={{bgcolor: getIconColor(props.accountSummaryName)}}
              >{props.accountSummaryName[0]}</Avatar>
            </ListItemAvatar>
            {props.accountSummaryName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div>"{props.accountSummaryStatus}"</div>
          <div>Follow {props.accountSummaryName} to see more.</div>
          </Typography>
        </Box> 

      </Modal> 

      </ListItem>

      </div>

  );
}

function AccountSummaryContent(props) {
  return (
      <div>
        <ListItemAvatar>
          <Avatar sx={{bgcolor: getIconColor(props.accountSummaryName) /*deepOrange[500]*/}} >{props.accountSummaryName[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={props.accountSummaryName}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline'}}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Status: 
                  </Typography>
                  "{props.accountSummaryStatus}"
                </React.Fragment>
              }
            />
      </div>
      
  );
};

export default PeopleList;