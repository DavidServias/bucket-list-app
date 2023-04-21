//import { Container } from '@mui/system';
import React from 'react';
import { useState } from 'react';
import './css/profile_view.css';
import ProfilePic from './profile_pic.png';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import api from './apiCalls';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import Avatar from '@mui/material/Avatar';
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
import Decorator from './card_decorator.js';
import getIconColor from './getIconColor.js';



//PROPS:
// status
// userIdentifier
// refreshUserData 
// guestView
// viewUserProfile()
function AboutMe(props) {
    function backToMyProfile() {
        props.viewUserProfile();
    };

    return (
        <Decorator>
        <Grid container 
            id="about-me-container" 
            >

            <Grid item xs={12}>
                <div className="heading">Viewing {props.profileName}'s Profile:</div>    
            </Grid>
            <Grid item xs={12}>
                <Container >  
                <Avatar 
                    sx={{bgcolor: getIconColor(props.profileName), 
                    margin: "auto",
                    width: 72, 
                    height: 72     
                }}
                    >{props.profileName[0]}</Avatar>
                    {/* maybe eventually */}
                    {/* <img 
                        alt="Profile Picture" 
                        src={ProfilePic}    
                    /> */}
                 </Container> 
            </Grid>
            <Grid item xs={12}>
                <div className="font-weight-600 mb-3 text-muted mt-n1">
                    <p>Status:</p>
                    <h6>"{props.status}"</h6> 
                </div>
            </Grid>

            {props.guestView ? 
            <Grid item xs={12}>
                <Button variant="outlined" 
                    startIcon={<ArrowBackIcon />}
                    onClick = {backToMyProfile}
                    sx={{backgroundColor: "#577590", color: "#000"}}
                >Back to My Profile
                </Button>
            </Grid>
            :
            <StatusUpdater 
                userIdentifier={props.userIdentifier}
                refreshUserData={props.refreshUserData} />
            }

        </Grid>
        </Decorator>

    );
};



//PROPS
// userIdentifier
// function refreshUserIdentifier
function StatusUpdater(props) {
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [newStatus, setNewStatus] = useState("");

    const handleChange = (e) => {
        setNewStatus(e.target.value);
    };
    
    const toggleUpdatingState = function () {
        setUpdatingStatus(updatingStatus ? false: true);
    };
    
    const updateStatus = function() {
        api.updateStatus(props.userIdentifier, newStatus);
        setUpdatingStatus(false);
        props.refreshUserData(props.userIdentifier);
    };

    const handleClickAway = function () {
        setNewStatus("");
        setUpdatingStatus(updatingStatus ? false: true);
    }


    return (
        <Grid item xs={12}>
        {updatingStatus ? 
            
            <ClickAwayListener onClickAway={handleClickAway}>
                <TextField

                    fullWidth 
                    margin="none"
                    label={"Update Status"}
                    value={newStatus} 
                    placeholder={updateStatus} 
                    onChange={handleChange}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton>
                                <AddIcon onClick = {updateStatus}/>
                            </IconButton>
                        </InputAdornment>
                        ),
                    }}
                />
            </ClickAwayListener>
            : 
            <Button variant="outlined" 
                startIcon={<EditIcon />}
                onClick = {toggleUpdatingState}
                
            sx={{backgroundColor: "#577590", color: "#000"}}
            >Update Status</Button>
        }
        </Grid>
    );

}


export default AboutMe;