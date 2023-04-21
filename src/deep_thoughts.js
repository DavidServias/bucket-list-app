import React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import api from './apiCalls';
import { ReactSVG } from 'react-svg';
import './css/profile_view.css';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBox from '@mui/material/Checkbox';
import Decorator from './card_decorator.js';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';


//PROPS
// userIdentifier
// deepThoughts 
// refreshUserData 
// profileName 
// guestView 
export class DeepThoughts extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.addThought = this.addThought.bind(this);
        this.state = {newThought: ""};
        this.addThoughtPlaceholderText = "Add a deep thought.";
    }
    
    handleChange(event) {
        this.setState({newThought: event.target.value});
    }

    async addThought(){
        console.log("addThought");
        await api.addThought(this.props.userIdentifier, this.state.newThought);
        this.setState({newThought: ""});
        this.props.refreshUserData(this.props.userIdentifier);
    }
   
    render(){
        return (
            <Decorator>
            <div id="deep-thought-container">
            <div className="heading">{this.props.profileName}'s Deep Thoughts</div>
            <Divider />
            <List style={{height: 300, overflow: 'auto'}}>
                {this.props.deepThoughts.length === 0 && 
                <div className='heading2'>You don't have any deep thoughts.</div>
                }
                {this.props.deepThoughts.map(function (thought) {
                    return (
                        <Thought 
                            item_text = {thought['text']} 
                            userIdentifier = {this.props.userIdentifier}
                            thought_id = {thought['_id']}
                            key = {thought['_id']}
                            refreshUserData = {this.props.refreshUserData}
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
                    label={this.addThoughtPlaceholderText}
                    value={this.state.newThought} 
                    placeholder={this.addThoughtPlaceholderText} 
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton className="AddBtn" onClick={this.addThought}>
					            <AddIcon />
				            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      
                    onChange={this.handleChange}
                />
                }
              
            </div>

            </Decorator>
            
        );
    }
}

//PROPS
//item_text  
// userIdentifier 
// thought_id
// key 
// refreshUserData 
// guestView
class Thought  extends React.Component {
    constructor(props) {
        super(props);
        this.removeThought = this.removeThought.bind(this);
    };

    async removeThought() {
        console.log("remove");
        await api.removeThought(this.props.userIdentifier, this.props.thought_id);
        this.props.refreshUserData(this.props.userIdentifier);
    };

    render() {
        let textStyleOveride = this.props.completed===true ? 
            'line-through' : ''; 
        const label = { inputProps: { "aria-label": "Checkbox demo" } };
        return (
            <ListItem disablePadding>
                <LightbulbOutlinedIcon color='#577590'/>
                <ListItemButton component="a" >
                    <ListItemText primary = {this.props.item_text}
                        sx={{textDecoration:textStyleOveride,
                            fontStyle: 'italic'}} />
                </ListItemButton>
                
                {this.props.guestView ? null:
                //render delete icon, if user is looking at they're
                // own profile
                <CheckBox {...label} 
                    checked={this.props.complete}
                    icon={<DeleteIcon />}
                    onChange={this.removeThought}
                    checkedIcon={<DeleteIcon />}
                /> 
                } 
            </ListItem>
           
        );
    };
}


export default DeepThoughts;