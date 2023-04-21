import React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { ReactSVG } from 'react-svg';
import './css/profile.css';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBox from '@mui/material/Checkbox';
import api from './apiCalls';
import Decorator from './card_decorator';


// const Decorator = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#a7ce3b',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));

// PROPS:
// userIdentifier = {this.props.data.user_identifier}
// bucketList = {this.props.data.bucket_list}
// refreshUserData = {this.props.refreshUserData}
// profileName = {this.props.data.profile_name}
// guestView = {this.props.guestView}
export class BucketList extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
        this.state = {newItem: ""};
        this.addItemPlaceholderText = "Add an Item to Your BucketList";
    }

    handleChange(event) {
        this.setState({newItem: event.target.value});
    }

    async addNewItem(){
        console.log("addNewItem()")
        await api.addBucketListItem(this.props.userIdentifier, this.state.newItem);
        this.setState({newItem: ""});
        this.props.refreshUserData(this.props.userIdentifier);
    }

    // onSubmit() {
    //     console.log("onSubmit()");
    // }

    render() {
        return (
            <Decorator>
            <div id="bucket-list-container">
            <div className="heading">{this.props.profileName}'s BucketList</div>
            <Divider />
            <nav aria-label="secondary mailbox folders">
                <List style={{height: 300, overflow: 'auto'}}>
                {this.props.bucketList.length === 0 && 
                <div className='heading2'>Add some items to your BucketList.</div>
                }
                {this.props.bucketList.map(function (item) {
                    return (
                        <Item item_text={item['text']}
                            completed={item['completed']} 
                            userIdentifier={this.props.userIdentifier}
                            item_id={item['_id']}
                            key = {item['_id']}
                            refreshUserData= {this.props.refreshUserData}
                            guestView = {this.props.guestView}
                            />
                    );
                // reminder for me: the "this" argument has to be included
                // at the end so that the call back has access to the outer
                // "this".
                }, this)}
                </List>
              
                {this.props.guestView ? null:
                // render field for more items, if user
                // is viewing their own profile.
                <TextField
                    fullWidth 
                    margin="none"
                    label={this.addItemPlaceholderText}
                    value={this.state.newItem} 
                    placeholder={this.addItemPlaceholderText} 
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton className="AddBtn" onClick={this.addNewItem}>
					            <AddIcon />
				            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      
                    onChange={this.handleChange}
                />}
              
            </nav>
            </div>
            </Decorator>
        );
    }
}


// item_text
// completed 
// userIdentifier
// item_id
// key
// refreshUserData
// guestView
export class Item extends React.Component {
    constructor(props) {
        super(props);
        this.remove = this.remove.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
    };

    async remove() {
        console.log("remove");
        await api.removeBucketListItem(this.props.userIdentifier, this.props.item_id);
        this.props.refreshUserData(this.props.userIdentifier);
    };

    async updateStatus() {
        console.log("updateStatus()");
        await api.updateItemStatus(
            this.props.userIdentifier, 
            this.props.item_id, 
            this.props.completed
        );
        this.props.refreshUserData(this.props.userIdentifier);
    };

    handleCheck() {
        console.log("handleCheck");
    };

    render() {
        let textStyleOveride = this.props.completed===true ? 
            'line-through' : ''; 
        const label = { inputProps: { "aria-label": "Checkbox demo" } };
        return (
            <ListItem disablePadding>
                <ReactSVG className="bucket-icon" 
                    src="bucket-fill.svg" />
                <ListItemButton component="a" href="#">
                    <ListItemText primary = {this.props.item_text}
                        sx={{textDecoration:textStyleOveride}} />
                </ListItemButton>
                
                {this.props.guestView ? null:
                    // Show the checkboxes if not in guestView mode.
                    <div>
                        <CheckBox {...label} 
                            checked={this.props.completed}
                            onChange={this.updateStatus}
                        />
                        <CheckBox {...label} 
                            checked={this.props.complete}
                            icon={<DeleteIcon />}
                            onChange={this.remove}
                            checkedIcon={<DeleteIcon />}
                        /> 
                    </div>
                }
                
            </ListItem>     
        );
    };
}

export default BucketList;