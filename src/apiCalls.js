
const API_URL_BASE = process.env.REACT_APP_API_URL_BASE;


/*******************************************************
**Function Name: createUser
**Description: creates user on the db. 
**Params: data about the user. 
identifier: assigned automatically when through google.
If the user didn't sign in through google, identifier can be
a random string of letters. Google users numbers. 
Sample:
{
    "profile_name": "Big Bird",
    "status": "I'm a big yellow bird",
    "identifier": "asdlfkjasdwerweravaasdfkj"
}
**Pre-Conditions: na
**Post-Conditions:New User is created on the db
**TODO:
1. Handle errors.
********************************************************/
async function createUser(data) {
    
    let url = API_URL_BASE +'/users/';
    let reqBody = data;
    let options = {
        method: 'POST',
        headers: {'Content-Type':'application/json;charset=utf-8'},
        body: reqBody
    };
    var response = await fetch(url,options);
    response = response.json();   

    return response;
};


/*******************************************************
**Function Name: loginWithPassword
**Description: checks args
**Params: both command line args
**Pre-Conditions: na
**Post-Conditions:Returns an array of account_summaries
**TODO:
1. Handle errors.
********************************************************/
// ROUTE:
// router.delete('/:user_identifier/:thought_id/remove-thought', removeThought);
// FUNCTION CALL: 
//  await api.removeThought(this.props.userIdentifier, this.props.thought_id);
async function loginWithPassword(requestBody) {
    console.log("loginWithPassword()");
    console.log("test:" + API_URL_BASE);
    let url = API_URL_BASE + '/login/password'
    console.log("body:" + requestBody);
    console.log(url);
    let options = {
        method: 'POST',
        headers: {'Content-Type':'application/json;charset=utf-8'},
        body: requestBody
    };

    var response= await fetch(url, options);
    //response = response.json();
    return await response.json();

};











// const updateStatus = async (req, res) => {
    //     try {
    //         const userId = req.params.id;
    //         const updatedData = req.body;
    //         const options = {new: true};
    //         const result = await User.findByIdAndUpdate(
    //         userId, updatedData, options);
    //         res.send(result)
    //     }
    //     catch (error) {
    //         res.status(400).json({ message: error.message })
    //     }
    // };
    //router.patch('/:user_identifier/update_status', userController.updateStatus);
/*******************************************************
**Function Name: updateStatus(newStatus)
**Description: checks args
**Params: both command line args
**Pre-Conditions: na
**Post-Conditions:na
**TODO:
1. Handle errors.
********************************************************/
async function updateStatus(userIdentifier, newStatus) {
    console.log("updateStatus()");
    let url = API_URL_BASE + '/users/' + userIdentifier + '/update_status';
    let options = {
        method: 'PATCH',
        headers: {'Content-Type':'application/json;charset=utf-8'},
        body: '{"status": "' + newStatus + '"}'
    };
    var response = await fetch(url,options);
    return response;
};


/*******************************************************
**Function Name: getUserByIdentifier(identifier)
**Description: checks args
**Params: both command line args
**Pre-Conditions: na
**Post-Conditions:na
**TODO:
1. Handle errors.
********************************************************/
async function getUserByIdentifier(userIdentifier) {
    let url = API_URL_BASE + '/users/login';
    let reqBody = JSON.stringify({"user_identifier": userIdentifier});
    let options = {
        method: 'POST',
        headers: {'Content-Type':'application/json;charset=utf-8'},
        body: reqBody
    };
    var response = await fetch(url,options);
    response = response.json();   
    
    return response;
}

/*******************************************************
**Function Name: args_are_valid
**Description: checks args
**Params: both command line args
**Pre-Conditions: na
**Post-Conditions:na
**TODO:
1. Handle errors.
********************************************************/
async function removeBucketListItem(userIdentifier, itemId) {
    console.log("removeBucketListItem()");
    let url = API_URL_BASE + "/bucket_list/";
    url += userIdentifier + "/" + itemId + "/remove-item";
    let options = {
        method: 'DELETE',
        headers: {'Content-Type':'application/json;charset=utf-8'},
    };
    await fetch(url, options)
        .then(response => response.json())
        .then(data => console.log(data));
}


/*******************************************************
**Function Name: args_are_valid
**Description: checks args
**Params: both command line args
**Pre-Conditions: na
**Post-Conditions:na
**TODO:
1. Handle errors.
********************************************************/
async function addBucketListItem(userIdentifier, newItem) {
    console.log("addBucketListItem()");
    let url = API_URL_BASE + "/bucket_list/";
    url += userIdentifier + "/add-item";
    let reqBody = JSON.stringify({"text": newItem});
    let options = {
        method: 'PATCH',
        headers: {'Content-Type':'application/json;charset=utf-8'},
        body: reqBody
    };
    console.log("url: " + url);
    console.log("request body " + reqBody);
    var response= await fetch(url, options);
    var data = await response.json();
    
   
}


/*******************************************************
**Function Name: args_are_valid
**Description: checks args
**Params: both command line args
**Pre-Conditions: na
**Post-Conditions:na
**TODO:
1. Handle errors.
********************************************************/
async function updateItemStatus(userIdentifier, itemId, completed) {
    console.log("updateItemStatus()");
    let url = API_URL_BASE + "/bucket_list/";
    url += userIdentifier + "/" + itemId + "/item-status";
    let status = completed ? false:true ;
    const reqBody = JSON.stringify({"completed": status});
    let options = {
        method: 'PATCH',
        headers: {'Content-Type':'application/json;charset=utf-8'},
        body: reqBody
    };
    
    await fetch(url, options)
        .then(response => response.json())
        .then(data => console.log(data));
};



/*******************************************************
**Function Name: addThought
**Description: checks args
**Params: both command line args
**Pre-Conditions: na
**Post-Conditions:Returns an array of account_summaries
**TODO:
1. Handle errors.
********************************************************/
//ROUTE: 
//http://localhost:8080/thoughts/{{DavidIdentifier}}/add_thought
//Sample Request: 
// {
//     "text": "The love you take is equal to the love you make."
// }
//Function Call:
//await api.addThought(this.props.userIdentifier, this.state.newThought);
async function addThought(userIdentifier, newThought) {
    console.log("addThought()");
    let url = API_URL_BASE + "/thoughts/";
    url += userIdentifier + "/add_thought";
    let reqBody = JSON.stringify({"text": newThought});
    let options = {
        method: 'PATCH',
        headers: {'Content-Type':'application/json;charset=utf-8'},
        body: reqBody
    };
    var response= await fetch(url, options);
    var data = await response.json();
      
}


/*******************************************************
**Function Name: removeThought
**Description: checks args
**Params: both command line args
**Pre-Conditions: na
**Post-Conditions:Returns an array of account_summaries
**TODO:
1. Handle errors.
********************************************************/
// ROUTE:
// router.delete('/:user_identifier/:thought_id/remove-thought', removeThought);
// FUNCTION CALL: 
//  await api.removeThought(this.props.userIdentifier, this.props.thought_id);
async function removeThought(userIdentifier, thoughtId) {
    console.log("removeThought()");
        let url = API_URL_BASE + "/thoughts/";
        url += userIdentifier + "/" + thoughtId +  "/remove_thought";
        let options = {
            method: 'DELETE',
            headers: {'Content-Type':'application/json;charset=utf-8'},
        };
        var response= await fetch(url, options);
        //var data = await response.json();
        return response;

};


/*******************************************************
**Function Name: args_are_valid
**Description: checks args
**Params: both command line args
**Pre-Conditions: na
**Post-Conditions:Returns an array of account_summaries
**TODO:
1. Handle errors.
********************************************************/
// router.get('/:user_identifier/find_friends', userController.findFriends);
async function findFriends(userIdentifier) {
    console.log("findFriends()");
    let url = API_URL_BASE + '/users/' + userIdentifier + '/find_friends';
    let options = {
        method: 'GET',
        headers: {'Content-Type':'application/json;charset=utf-8'}
    };
    var response = await fetch(url,options);
    response = await response.json();
    let responseArr = [];
    let nextSuggestion = {};
    for (let i=0; i< response.length; i+= 1) {
        nextSuggestion = {};
        nextSuggestion.account_summary_name = response[i].profile_name;
        nextSuggestion['account_summary_status'] = response[i].status;
        nextSuggestion['account_identifier'] = response[i].user_identifier;
        responseArr.push(nextSuggestion);
    }
    return responseArr;
}


// const AccountSummarySchema = new Schema({
//     name: {type: String, required: true},
//     status: {type: String, required: true},
//     userIdentifier: {type: String, required: true}
//   })

// router.patch('/:user_identifier/follow', userController.follow);
// sample accountSummary 
// {    "name":"David",
//      "status": "happy",
//      "userIdentifier": "asldkfadjf"
//  }
/*******************************************************
**Function Name: args_are_valid
**Description: checks args
**Params: both command line args
**Pre-Conditions: na
**Post-Conditions:na
**TODO:
1. Handle errors.
********************************************************/
async function follow(userIdentifier, accountSummary) {
    console.log("follow()");
    let url = API_URL_BASE + "/users/";
    url += userIdentifier + "/follow";
    let reqBody = JSON.stringify(accountSummary);
    console.log("from controller: " + reqBody)
    let options = {
        method: 'PATCH',
        headers: {'Content-Type':'application/json;charset=utf-8'},
        body: reqBody
    };
    var response= await fetch(url, options);
    var data = await response.json();
    
}


/*******************************************************
**Function Name: args_are_valid
**Description: checks args
**Params: both command line args
**Pre-Conditions: na
**Post-Conditions:na
**TODO:
1. Handle errors.
********************************************************/
async function unfollow(userIdentifier, accountToUnfollow) {
    console.log("unfollow()");
    let url = API_URL_BASE + "/users/";
    url += userIdentifier + "/unfollow";
    let reqBody = '{"accountToUnfollow": "'+accountToUnfollow+'"}';
    let options = {
        method: 'DELETE',
        headers: {'Content-Type':'application/json;charset=utf-8'},
        body: reqBody
    };
    var response= await fetch(url, options);
    var data = await response.json();
    
}


export default {
    createUser,
    getUserByIdentifier,
    removeBucketListItem,
    updateItemStatus,
    addBucketListItem,
    findFriends,
    follow,
    unfollow,
    updateStatus, 
    addThought,
    removeThought,
    loginWithPassword

}