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

let sendCategoriesAPI = sender_psid => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "Welcome 1!",
                                "image_url": "https://petersfancybrownhats.com/company_image.png",
                                "subtitle": "We have the right hat for everyone.",
                                "default_action": {
                                    "type": "web_url",
                                    "url": "https://petersfancybrownhats.com/view?item=103",
                                    "messenger_extensions": false,
                                    "webview_height_ratio": "tall",
                                    "fallback_url": "https://petersfancybrownhats.com/"
                                },
                                "buttons": [
                                    {
                                        "type": "web_url",
                                        "url": "https://petersfancybrownhats.com",
                                        "title": "View Website"
                                    }, {
                                        "type": "postback",
                                        "title": "Start Chatting",
                                        "payload": "DEVELOPER_DEFINED_PAYLOAD"
                                    }
                                ]
                            },
                            {
                                "title": "Welcome 2!",
                                "image_url": "https://petersfancybrownhats.com/company_image.png",
                                "subtitle": "We have the right hat for everyone.",
                                "default_action": {
                                    "type": "web_url",
                                    "url": "https://petersfancybrownhats.com/view?item=103",
                                    "messenger_extensions": false,
                                    "webview_height_ratio": "tall",
                                    "fallback_url": "https://petersfancybrownhats.com/"
                                },
                                "buttons": [
                                    {
                                        "type": "web_url",
                                        "url": "https://petersfancybrownhats.com",
                                        "title": "View Website"
                                    }, {
                                        "type": "postback",
                                        "title": "Start Chatting",
                                        "payload": "DEVELOPER_DEFINED_PAYLOAD"
                                    }
                                ]
                            },
                            {
                                "title": "Welcome 3!",
                                "image_url": "https://petersfancybrownhats.com/company_image.png",
                                "subtitle": "We have the right hat for everyone.",
                                "default_action": {
                                    "type": "web_url",
                                    "url": "https://petersfancybrownhats.com/view?item=103",
                                    "messenger_extensions": false,
                                    "webview_height_ratio": "tall",
                                    "fallback_url": "https://petersfancybrownhats.com/"
                                },
                                "buttons": [
                                    {
                                        "type": "web_url",
                                        "url": "https://petersfancybrownhats.com",
                                        "title": "View Website"
                                    }, {
                                        "type": "postback",
                                        "title": "Start Chatting",
                                        "payload": "DEVELOPER_DEFINED_PAYLOAD"
                                    }
                                ]
                            }
                        ]
                    }
                }
            };
            await sendMessageAPI(sender_psid, response);
            resolve("done");
        }
        catch (e) {
            reject(e);
        }
    });
};

let sendLookupOrderAPI = sender_psid => {
    return new Promise(async (resolve, reject) => {
        try {
            /*let response = {};
            await sendMessageAPI(sender_psid, response);*/
            resolve("done");
        }
        catch (e) {
            reject(e);
        }
    });
};

let requestTalkToAgentAPI = sender_psid => {
    return new Promise(async (resolve, reject) => {
        try {
            /*let response = {};
            await sendMessageAPI(sender_psid, response);*/
            resolve("done");
        }
        catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    sendMessageNewUserAPI: sendMessageNewUserAPI,
    sendMessageAPI: sendMessageAPI,
    sendCategoriesAPI: sendCategoriesAPI,
    sendLookupOrderAPI: sendLookupOrderAPI,
    requestTalkToAgentAPI: requestTalkToAgentAPI,
};