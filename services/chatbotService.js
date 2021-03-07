require('dotenv').config();
import request from 'request';
import profile from './profileService';
import template from './templateMessage';

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
            let response = template.sendCategoriesTemplate();
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
            let response = template.sendLookupOrderTemplate();
            await sendMessageAPI(sender_psid, response);
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
            let response = {
                "text": "Ok. Someone real will be with you in a few minutes ^^"
            };
            await sendMessageAPI(sender_psid, response);
            let app = "page_inbox"
            await passThreadControlAPI(sender_psid, app);
            resolve("done");
        }
        catch (e) {
            reject(e);
        }
    });
};

let passThreadControlAPI = (sender_psid, app) => {
    return new Promise(async (resolve, reject) => {
        try {
            let target_app_id = "";
            let metadata = "";

            if (app === "page_inbox") {
                target_app_id = SECONDARY_RECEIVER_ID;
                metadata = "Pass thread control to inbox chat";
            }
            if (app === "primary") {
                target_app_id = PRIMARY_RECEIVER_ID;
                metadata = "Pass thread control to the bot, primary app";
            }
            // Construct the message body
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "target_app_id": target_app_id,
                "metadata": metadata
            };

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v6.0/me/pass_thread_control",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                console.log(body)
                if (!err) {
                    resolve('message sent!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

let showHeadphonesAPI = sender_psid => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = template.sendHeadphonesTemplate();
            await sendMessageAPI(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let showTVsAPI = sender_psid => {
    return new Promise((resolve, reject) => {
        try {
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let showPlaystationAPI = sender_psid => {
    return new Promise((resolve, reject) => {
        try {
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let backToCategoriesAPI = sender_psid => {
    sendCategoriesAPI(sender_psid);
}

let backToMainMenuAPI = sender_psid => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = template.backToMainMenuTemplate();
            await sendMessageAPI(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let takeControlConversationAPI = sender_psid => {
    return new Promise((resolve, reject) => {
        try {
            // Construct the message body
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "metadata": "Pass this conversation from page inbox to the bot - primary app"
            };

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v6.0/me/take_thread_control",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, async (err, res, body) => {
                if (!err) {
                    //send messages
                    await sendMessageAPI(sender_psid, { "text": "The super bot came back !!!" });
                    await backToMainMenu(sender_psid);
                    resolve('message sent!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};


module.exports = {
    sendMessageAPI: sendMessageAPI,
    sendCategoriesAPI: sendCategoriesAPI,
    sendLookupOrderAPI: sendLookupOrderAPI,
    sendMessageNewUserAPI: sendMessageNewUserAPI,
    requestTalkToAgentAPI: requestTalkToAgentAPI,
    showHeadphonesAPI: showHeadphonesAPI,
    showTVsAPI: showTVsAPI,
    showPlaystationAPI: showPlaystationAPI,
    backToCategoriesAPI: backToCategoriesAPI,
    backToMainMenuAPI: backToMainMenuAPI,
    takeControlConversationAPI: takeControlConversationAPI,
};