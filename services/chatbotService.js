require('dotenv').config();
import request from 'request';
import profile from './profileService';

let VERIFY_TOKEN = process.env.VERIFY_TOKEN;

let sendMessageNewUserAPI = sender_psid => {
    return new Promise(async (resolve, reject) => {
        try {
            let profiles = await profile.handleFacebookProfileAPI(sender_psid);
            let response1 = {
                "text": `hi there. Welcome ${profiles} to my Tech shop page`
            };
            let response2 = {
                "attachment":
                {
                    "type": "image",
                    "payload": {
                        "url": "https://bit.ly/imageWelcome"
                    }
                }
            };
            let response3 = {
                "text": "At ant time, use menu below to navigate through the features."
            };
            let response4 = {
                "text": "What can I do to help you today?",
                "quick_replies": [
                    {
                        "content_type": "text",
                        "title": "Categories",
                        "payload": "CATEGORIES",
                    },
                    {
                        "content_type": "text",
                        "title": "Lookup Order",
                        "payload": "LOOKUP_ORDER",
                    },
                    {
                        "content_type": "text",
                        "title": "Talk to an agent",
                        "payload": "TALK_AGENT",
                    },
                ]
            };
            await sendMessageAPI(sender_psid, response1);
            await sendMessageAPI(sender_psid, response2);
            await sendMessageAPI(sender_psid, response3);
            await sendMessageAPI(sender_psid, response4);
            resolve("done");
        }
        catch (e) {
            reject(e);
        }
    });
};

let sendMessageAPI = (sender_psid, response) => {
    return new Promise(async (resolve, reject) => {
        try {
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
                    resolve('message sent!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        }
        catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    sendMessageAPI: sendMessageAPI,
    sendMessageNewUserAPI: sendMessageNewUserAPI,
};