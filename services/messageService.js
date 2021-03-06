require('dotenv').config();
import request from 'request';
import profile from './profileService';

let VERIFY_TOKEN = process.env.VERIFY_TOKEN;

let handleTokenAPI = (mode, token, challenge, res) => {
    if (mode && token) {
        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            // Responds with the challenge token from the request
            res.status(200).send(challenge);
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
}

let handleMessageAPI = (sender_psid, received_message) => {
    let response;
    // Check if the message contains text
    if (received_message.text) {
        // Create the payload for a basic text message
        response = {
            "text": `You sent the message: "${received_message.text}". Now send me an image!`
        }
    } else if (received_message.attachments) {
        // Get the URL of the message attachment
        let attachment_url = received_message.attachments[0].payload.url;
        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Is this the right picture?",
                        "subtitle": "Tap a button to answer.",
                        "image_url": attachment_url,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Yes!",
                                "payload": "yes",
                            },
                            {
                                "type": "postback",
                                "title": "No!",
                                "payload": "no",
                            }
                        ],
                    }]
                }
            }
        }
    }
    // Sends the response message
    callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
let handlePostbackAPI = async (sender_psid, received_postback) => {
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    switch (payload) {
        case "yes":
            response = { "text": "Thanks!" };
            break;
        case "no":
            response = { "text": "Oops, try sending another image." };
            break;
        case "GET_STARTED":
            let profiles = await profile.handleFacebookProfileAPI(sender_psid);
            response = { "text": `hi there. Welcome ${profiles} to my Tech shop page` };
            break;
        default:
            console.log("run default switch case");
            break;
    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
};

// Sends response messages via the Send API
let callSendAPI = async (sender_psid, response) => {
    await profile.handleMessageReadAPI(sender_psid);
    await profile.handleTypingOnAPI(sender_psid);
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }
    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": VERIFY_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
};

module.exports = {
    handleTokenAPI: handleTokenAPI,
    handleMessageAPI: handleMessageAPI,
    handlePostbackAPI: handlePostbackAPI
};