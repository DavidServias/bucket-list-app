
 //import { decode } from 'jsonwebtoken';
 var jwt = require('jsonwebtoken');

//C:\Users\david\Documents\Bucket_List\bucket_list\node_modules\jsonwebtoken
console.log("test");

function loginCallback (response) {
    console.log("it worked");
    console.log(response);


    const responsePayload = jwt.decode(response.credential);

    response.send(responsePayload);
    // console.log("ID: " + responsePayload.sub);
    // console.log('Full Name: ' + responsePayload.name);
    // console.log('Given Name: ' + responsePayload.given_name);
    // console.log('Family Name: ' + responsePayload.family_name);
    // console.log("Image URL: " + responsePayload.picture);
    // console.log("Email: " + responsePayload.email);


}; 

