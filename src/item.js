import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactSVG } from 'react-svg';
import './css/profile.css';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBox from '@mui/material/Checkbox';
import api from './apiCalls';


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
                <CheckBox {...label} 
                    checked={this.props.completed}
                    onChange={this.updateStatus}/>
                <CheckBox {...label} 
                    checked={this.props.complete}
                    icon={<DeleteIcon />}
                    onChange={this.remove}
                    checkedIcon={<DeleteIcon />}
                    /> 
            </ListItem>
           
        );
    };
}


export default Item;